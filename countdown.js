function Countdown(options){
    this.options = options || {};
    
    var pathname         = window.location.pathname;
    var countdownIndex   = Countdown.countdownIndex++;
    
    this.startTime       = null;
    this.currentTime     = 0;
    this.countingState   = false;
    this.COUNTDOWN_KEY   = 'countdown_storage_key_' + countdownIndex + '_' + pathname;
    
    this.countdownSecond = this.options.countdownSecond || 60;
    this.onStart         = this.options.onStart         || function(){};
    this.onCounting      = this.options.onCounting      || function(){};
    this.onDone          = this.options.onDone          || function(){};

    var startTime = localStorage.getItem(this.COUNTDOWN_KEY);

    var that = this;
    var checkExpire = function(startTime) {
        var currentTime = that.getCurrentTime();
        var passSecond = parseInt((currentTime - Number(startTime)) / 1000);

        if(passSecond >= that.countdownSecond){
            return false;
        }

        return true
    }

    if(startTime && checkExpire(startTime)){
        this.setStartTime(startTime);
        this.start();
    }
}

Countdown.countdownIndex = 0;

Countdown.prototype.start = function(){
    var that = this;
    if(that.countingState){return;};
    if(!that.startTime){
        that.startTime = that.getCurrentTime();
        localStorage.setItem(that.COUNTDOWN_KEY, that.startTime);
    }
    that.onStart();
    that.countdown();
    that.countingState = true;
};

Countdown.prototype.countdown = function(){
    var that = this;
    var currentTime     = that.getCurrentTime();
    var countdownSecond = that.countdownSecond;
    var passSecond      = parseInt((currentTime - that.startTime) / 1000);
    that.onCounting(countdownSecond - passSecond);
    if(passSecond >= countdownSecond){
        that.reset();
        that.onDone();
    }else{
        setTimeout(function(){
            that.countdown();
        }, 1000);
    }        
};

Countdown.prototype.reset = function(){
    this.startTime     = null;
    this.countingState = false;
    localStorage.removeItem(this.COUNTDOWN_KEY);        
};

Countdown.prototype.setStartTime = function(startTime){
    this.startTime = Number(startTime);
};

Countdown.prototype.getCurrentTime = function(){
    return new Date().getTime();
};