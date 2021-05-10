let logBtn = document.querySelector('#login');  // 登录按钮
let box = document.querySelector('.box-login'); // 总体大盒子，包括固定在窗口的
let main = document.querySelector('.login-main'); // 主要内容的盒子
let log1 = document.querySelector('.b-login-1'); // 第一个页面
let log2 = document.querySelector('.b-login-2');  // 第二个页面手机登录
let logTop = document.querySelectorAll('.log-top');  // 获取顶部
let err = document.querySelector('.log-2-err'); // 错误信息提示框

// 按钮切换
// 点击显示登录界面
logBtn.addEventListener('click',function() {
    box.style.display = 'block';
})

// 关闭登录界面
let close = document.querySelectorAll('.log-close');
close.forEach(e => {
    e.addEventListener('click', function () {
        log1.style.display = 'block';   // 恢复原来样式
        log2.style.display = 'none';
        box.style.display = 'none';
    })
});
    
// 手机登录
let numBtn = document.querySelector('#log-num');
numBtn.addEventListener('click',function(){
    // 清空提示框和错误信息
    log2.querySelector('#account').value = '';
    err.style.display = 'none';
    logTop[1].querySelector('h4').innerHTML = '手机号登录' ;
    log2.querySelector('#account').setAttribute('placeholder','请输入手机号');
    enterLog2 ();
})

// 邮箱登录
let addressBtn = document.querySelector('#log-address');
// 修改第二个页面
addressBtn.addEventListener('click',function(){
    log2.querySelector('#account').value = '';
    err.style.display = 'none';
    logTop[1].querySelector('h4').innerHTML = '邮箱登录' ;
    log2.querySelector('#account').setAttribute('placeholder','请输入邮箱地址');
    enterLog2 ();
})

function enterLog2 () {
    let t = getPolicyAgree ();
    if(t){
        log1.style.display = 'none';
        log2.style.display = 'block';
    }else {
        return ;
    }
}

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
function login(obj) {
    let numValue = document.querySelector('#account').value;
    let passValue = document.querySelector('#password').value;
    let span = document.querySelector('.log-2-err span');   // 提示内容框
    var reg = obj.reg;  // RegExp 对象，正则表达式
    if(!reg.test(numValue)){
        span.innerHTML = '请输入正确的' + obj.tip;
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
        url : obj.url,
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


// 点击调用函数login
let confirm = document.querySelector('#log-btn'); // 确认登录
confirm.addEventListener('click',function(){
    // 设置登录参数，根据不同的登录方式传递不同对象
    let logByNum = {
        tip : '手机号',
        reg : /^0{0,1}(13[0-9]|15[0-9])[0-9]{8}$/ ,
        url : 'https://autumnfish.cn/login/cellphone' ,
        // 需要传给ajax的参数
        type : 'phone',
        // 电话号码成功登录之后的函数
        success : function(){}
    }
    let logByAdress = {
        tip : '邮箱地址',
        reg : /^\w+((-\w+)|(\.\w+))*@163+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
        url : 'https://autumnfish.cn/login',
        // 需要传给ajax的参数
        type : 'address',
        // 邮箱成功登录之后的函数
        success : function(){}
    }
    
    if (logTop[1].querySelector('h4').innerHTML == '邮箱登录' ){
    login(logByAdress);
    } else {
        login(logByNum);
    }
})


// 登录盒子随着鼠标移动
function dragMove(son, father) {
    son.addEventListener('mousedown', function (e) {
        let x = e.pageX - father.offsetLeft
        let y = e.pageY - father.offsetTop
        let minX = 0;
        let maxX = father.parentNode.offsetWidth - father.offsetWidth;
        let minY = 0;
        let maxY = father.parentNode.offsetHeight - father.offsetHeight;
        let curL = null;
        let curT = null;
        function move(e) {
            // 边界处理
            curL = e.pageX - x;
            curT = e.pageY - y;
            curL = (curL >= minX) ? curL : minX;
            curL = (curL <= maxX) ? curL : maxX;
            curT = (curT >= minY) ? curT : minY;
            curT = (curT <= maxY) ? curT : maxY;
            father.style.top = curT + 'px'
            father.style.left = curL + 'px'
        }
        
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', move)
        })
    })
}

dragMove(logTop[0],main);
dragMove(logTop[1],main)