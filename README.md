# countdown

用来获取验证码的倒计时组件 保存实时秒数到本地存储

````
    var cd = new Countdown({
        countdownSecond: 5,
        onStart: function(){
            btn.setAttribute('disabled', 'disabled');
            btn.className = 'btn disable';
        },
        onCounting: function(passSecond){
            btn.innerText = passSecond + ' 秒后获取验证码';
        },
        onDone: function(){
            btn.innerText = '获取验证码';
            btn.removeAttribute('disabled');
            btn.className = 'btn';
        }
    });

    //  获取当前倒计时的开始时间
    var cdStartTime = localStorage.getItem(cd.COUNTDOWN_KEY);

    //  如果能够读取到开始时间，说明当前正在倒计时，我们就用这个时间设置一下，然后启动倒计时
    if(cdStartTime){
        cd.setStartTime(cdStartTime);
        cd.start();
    }

    var btn = document.getElementById('J_get_phone_code');
    btn.addEventListener('click', function(){
        //  启动倒计时
        cd.start();
    });

````

 - [x] 读取本地存储倒计时的代码做到Countdown对象内部
 - [x] 每个实例生成独立的本地存储key
 - [ ] 不同页面会产生同样的localStorage key，目前是在key的生成过程中加上url的pathname来区分