let logBtn = document.querySelector('#login');  // 登录按钮
let box = document.querySelector('.box-login'); // 总体大盒子，包括固定在窗口的
let main = document.querySelector('.login-main'); // 主要内容的盒子
let log1 = document.querySelector('.b-login-1'); // 第一个页面
let log2 = document.querySelector('.b-login-2');  // 第二个页面手机登录
let logTop = document.querySelectorAll('.log-top');  // 获取顶部
let err = document.querySelector('.log-2-err'); // 错误信息提示框

// 按钮切换
// 点击显示登录界面
logBtn.addEventListener('click', function () {
    box.style.display = 'block';
});

// 名片点击显示登录入口

(function(){
    let logBtn2 = document.querySelector('.nologin button');
    logBtn2.addEventListener('click',function(){
    box.style.display = 'block';
    })
})();

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
numBtn.addEventListener('click', function () {
    // 清空提示框和错误信息
    log2.querySelector('#account').value = '';
    err.style.display = 'none';
    logTop[1].querySelector('h4').innerHTML = '手机号登录';
    log2.querySelector('#account').setAttribute('placeholder', '请输入手机号');
    enterLog2();
})

// 邮箱登录
let addressBtn = document.querySelector('#log-address');
// 修改第二个页面
addressBtn.addEventListener('click', function () {
    log2.querySelector('#account').value = '';
    err.style.display = 'none';
    logTop[1].querySelector('h4').innerHTML = '邮箱登录';
    log2.querySelector('#account').setAttribute('placeholder', '请输入邮箱地址');
    enterLog2();
})

// 进入第二个登录页面
function enterLog2() {
    let t = getPolicyAgree();
    if (t) {
        log1.style.display = 'none';
        log2.style.display = 'block';
    } else {
        return;
    }
}

// 同意政策是否被选中
function getPolicyAgree() {
    let logCheck = document.querySelector('#log-agree');
    let agree = document.querySelector('.log-tip');
    if (logCheck.checked) {
        return true;
    } else {
        agree.style.display = 'block';
        setTimeout(function () {
            agree.style.display = 'none';
        }, 2000)
        return false;
    }
}

// 返回登录选项
let method = document.querySelector('.log-2-method');
method.addEventListener('click', function () {
    log1.style.display = 'block';
    log2.style.display = 'none';
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


// 点击调用函数login
let confirm = document.querySelector('#log-btn'); // 确认登录
confirm.addEventListener('click', function () {
    // 设置登录参数，根据不同的登录方式传递不同对象
    let logByNum = {
        tip: '手机号',
        reg: /^0{0,1}(13[0-9]|15[0-9])[0-9]{8}$/,
        url: 'https://autumnfish.cn/login/cellphone',
        // 需要传给ajax的参数
        type: 'phone',
        // 电话号码成功登录之后的函数
        success: function () { }
    }
    let logByAdress = {
        tip: '邮箱地址',
        reg: /^\w+((-\w+)|(\.\w+))*@163+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
        url: 'https://autumnfish.cn/login',
        // 需要传给ajax的参数
        type: 'address',
        // 邮箱成功登录之后的函数
        success: function () { }
    }

    if (logTop[1].querySelector('h4').innerHTML == '邮箱登录') {
        login(logByAdress);
    } else {
        login(logByNum);
    }
})

// 手机/邮箱登录
function login(obj) {
    let numValue = document.querySelector('#account').value;
    let passValue = document.querySelector('#password').value;
    let span = document.querySelector('.log-2-err span');   // 提示内容框
    let auto = document.querySelector('#autolog');  // 是否选择自动登录
    var reg = obj.reg;  // RegExp 对象，正则表达式
    if (!reg.test(numValue)) {
        span.innerHTML = '请输入正确的' + obj.tip;
        err.style.display = 'block';
        return false;
    } else if (!passValue) {
        span.innerHTML = '密码不能为空';
        err.style.display = 'block';
        return false;
    }
    console.log();
    let login = {
        type: 'post',
        url: obj.url,
        date: {
            phone: numValue,
            password: passValue,
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function (date) {
            let inpA = box.querySelectorAll('input');
            inpA.forEach(e=>{
                e.value = '';
            })
            box.style.display = 'none';
            if(auto.checked){
                console.log(date.cookie);
                localStorage.setItem('cookie',date.cookie);
            }else {
                sessionStorage.setItem('cookie',date.cookie);
            }
            loadCookieInf() // 获取账号信息
        },
        error: function (date) {
            span.innerHTML = date.msg;
            err.style.display = 'block';
            console.log(date.token);
        }
    }
    ajax(login)
}


dragMove(logTop[0], main);
dragMove(logTop[1], main);

/** 
 * @function 发送用户信息请求
 * @param {string} id 用户id
 */
function getUserInf(id) {
    let ude = {
        type: 'get',
        url: '',
        date: {
            cookie: sessionStorage.getItem('cookie')||localStorage.getItem('cookie'), // 表示登录
            uid: id,
        },
        success: function (date) {
            console.log(date);
            // 调用函数
        },
        error: function (date) {
            console.log(date.msg);
        }
    }
    ajax(ude);  // 发送请求
}

/**
 * @function 右上角图标改变
 * @param {object} da  登录成功后/再次发送请求获得账号的数据
 */

function ChangeuserHead(da) {
    let head = document.querySelector('.person-head');
    let login = document.querySelector('#login');
    login.style.display = 'none';  //  隐藏登录按钮
    head.style.display = 'inline-block'; // 显示头像
    console.log(da);
    // 获取用户id并赋值
    let uId = da.account.id;
    head.uid = uId;
    // 头像图片
    head.style.background = 'url(' + da.profile.avatarUrl + ')';
    // 给头像添加点击事件
    head.addEventListener('click', function () {
        let mune = document.querySelector('.personal-menu'); // 头像下的菜单栏
        mune.style.display = 'block';  // 点击头像显示菜单
        mune.addEventListener('mouseleave', function () {
            this.style.display = 'none';  // 鼠标离开隐藏
        })
    })
}

/**
 * @function 用户名片
 * @param {object} da  登录成功后/再次发送请求获得账号的数据
 */
function changeUserDetail(da) {
    let nolog = document.querySelector('.nologin'); // 未登录时显示的盒子
    let loging = document.querySelector('.loging') // 登录后显示的盒子
    // 登陆后隐藏和显示
    nolog.style.display = 'none';
    loging.style.display = 'block';
    // 写入用户信息
    let pic = loging.querySelector('.user-pic img'); // 头像图片
    pic.src = da.profile.avatarUrl;  // 显示头像
    let name = loging.querySelector('.user-name');  // 用户名
    name.innerHTML = da.profile.nickname;
    // 调用subcount接口获取用户歌单，mv，节目数量
    let subcount = {
        type: 'get',
        url: 'https://autumnfish.cn/user/subcount',
        date: {
            cookie: sessionStorage.getItem('cookie')||localStorage.getItem('cookie'),
        },
        success: function (date) {
            let playlist = loging.querySelector('.playlist-count');  // 动态
            playlist.innerHTML = date.createdPlaylistCount;
            let mv = loging.querySelector('.mv-count'); // 关注
            mv.innerHTML = date.mvCount;
            let program = loging.querySelector('.program-count');  // 粉丝数
            program.innerHTML = date.programCount;
        }
    }
    ajax(subcount);

}



// 判断是否有cookie，如果有直接加载用户信息
/**
 * @function 加载cookie中账号的信息
 * @description
 */
function loadCookieInf() {
    if (sessionStorage.getItem('cookie')||localStorage.getItem('cookie')) {
        let cde = {
            type: 'get',
            url: 'https://autumnfish.cn/user/account',
            date: {
                // encodeURIComponent()
                // cookie: document.cookie,
                cookie : sessionStorage.getItem('cookie')||localStorage.getItem('cookie'),
            },
            success: function (date) {
                ChangeuserHead(date);
                changeUserDetail(date);
            },
            error: function (date) {
                console.log(date.msg);
            }
        }
        ajax(cde);
    }
}
//  刷新重新加载cookie，不留cookie
window.onload = (function () {
    loadCookieInf()
});
// 点击加载个人主页

// 退出登录需要调用接口吗？

/**
 * @function 退出登录
 */
function logout() {
    let out = {
        type: 'get',
        url: 'https://autumnfish.cn/logout',
        success: function (date) {

        },
        error: function (date) {
            console.log(date);
        }
    }
    ajax(out);
}

(function(){
    let lout = document.querySelector('#logout');
    lout.addEventListener('click',function(){
        logout();
        if(sessionStorage.getItem('cookie')){
            sessionStorage.clear('cookie');
        }else if (localStorage.getItem('cookie')){
            localStorage.clear('cookie');
        }
        // 将样式恢复成未登录状态
        // 头像处
        let head = document.querySelector('.person-head');
        let a = document.querySelector('#login'); // 登录按钮
        head.style.display = 'none';
        a.style.display = 'block';
        // 名片处
        let log = document.querySelector('.loging');  
        let nolog = document.querySelector('.nologin');
        log.style.display = 'none';
        nolog.style.display = 'block';
    })
})();