let logBtn = document.querySelector('#login');  // 登录按钮
let box = document.querySelector('.box-login'); // 总体大盒子
let log1 = document.querySelector('.b-login-1'); // 第一个页面
let log2 = document.querySelector('.b-login-2');  // 第二个页面手机登录

// 按钮切换
// 点击显示登录界面
logBtn.addEventListener('click',function() {
    box.style.display = 'block';
})

// 关闭登录界面
let close = document.querySelectorAll('.log-close');
close.forEach(e => {
    e.addEventListener('click', function () {
        log1.style.display = 'block';
        log2.style.display = 'none';
        box.style.display = 'none';
    })
});
    
// 进入手机登录
let numBtn = document.querySelector('#log-num');
numBtn.addEventListener('click',function(){
    let t = getPolicyAgree ();
    if(t){
        log1.style.display = 'none';
        log2.style.display = 'block';
    }else {
        return ;
    }
})

// 同意政策是否被选中
function getPolicyAgree () {
    let logCheck = document.querySelector('#log-agree');
    let agree = document.querySelector('.log-tip');
    if(logCheck.checked){
        return true;
    }else{
        agree.style.display = 'block';
        setTimeout(function(){
            agree.style.display = 'none';
        },2000)
        return false;
    }
}

// 返回登录选项

let method = document.querySelector('.log-2-method');

method.addEventListener('click',function(){
    log1.style.display = 'block';
    log2.style.display = 'none';
})

// 手机登录
function numLog() {
    let numValue = document.querySelector('#phone').value;
    let passValue = document.querySelector('#password').value;
    let err = document.querySelector('.log-2-err');
    let span = document.querySelector('.log-2-err span');   // 提示内容框
    var reg =/^0{0,1}(13[0-9]|15[0-9])[0-9]{8}$/;  // RegExp 对象，正则表达式
    if(!reg.test(numValue)){
        span.innerHTML = '请输入正确的手机号';
        err.style.display = 'block';
        return false; 
    }else if(!passValue){
        span.innerHTML = '密码不能为空';
        err.style.display = 'block';
        return false; 
    } 
    console.log();
    let login = {
        type : 'post',
        url : 'https://autumnfish.cn/login/cellphone',
        date : {
            phone : numValue,
            password : passValue,
        },
        header : {
            'Content-Type' : 'application/json'
        },
        success : function(date){
            box.style.display = 'none';
            alert('登录成功');
        },
        error : function(date){
            span.innerHTML = date.msg;
            err.style.display = 'block';
            console.log(date.code);
        }
    }
    ajax(login);
}
// 点击调用函数numlog
let confirm = document.querySelector('#log-btn'); // 确认登录
confirm.addEventListener('click',function(){
    numLog();
})

// 登录盒子随着鼠标移动
// 获取顶部
// let logTop = document.querySelectorAll('.log-top');
// console.log(logTop);

// logTop.forEach(e =>  {
//     // 监听登录顶部
//     // e.addEventListener('mousedown', function () {
//     //     console.log('click');
//     //    logMove(box);
//     // })
//     e.onmousedown = logMove;

// })


function logMove(ev) {
    // 把鼠标的起始位置和盒子的起始位置存为自定义属性
    this.pageX = ev.pageX;
    this.pageY = ev.pageY;
    this.left = this.offsetLeft;
    this.top = this.offsetTop;
    // 接下来再给盒子绑定MOVE和UP方法：只有鼠标按下的时候才去绑定移动和抬起
    // 谷歌的绑定方法：鼠标在document中操作，注意this的处理
    document.onmousemove = move.bind(this);
    document.onmouseup = up.bind(this);
}

function move(ev) {
    console.log(this,ev);
    let curT = ev.pageY - this.pageY + this.top,
        curL = ev.pageX - this.pageX + this.left;
    // 边界处理
    let minL = 0,
        maxL = document.documentElement.clientWidth - this.offsetWidth,
        minT = 0,
        maxT = document.documentElement.clientHeight - this.offsetHeight;
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);

    this.style.left = curL + 'px';
    this.style.top = curT + 'px';
}
function up(ev) {
    // 鼠标抬起，把MOVE和UP都移除掉
    // 谷歌的解绑方法：
    document.onmousemove = null;
    document.onmouseup = null;
}
