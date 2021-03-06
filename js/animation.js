// 防抖
function debounce(fn, wait) {    
    let timeout = null;    
    return function() {        
        if(timeout !== null)   
        clearTimeout(timeout);        
        timeout = setTimeout(fn, wait);    
    }
}

// 推荐部分大轮播图
function scroll() {
    let box = document.querySelector('.box-reco');// 获取大框
    let scr = document.querySelector('.scroll');// 获取中间的框
    let ulDot = document.querySelector('.box-scr-dot')
    let pic = document.querySelectorAll('.rec-pic'); //获取轮播的全部图片
    let arrowL = document.querySelector('.arrow-l'); // 获取左箭头
    let arrowR = document.querySelector('.arrow-r'); // 获取右箭头
    let current = 0; // 表示当前显示的图片的num属性
    // 给每一个图片添加大背景
    pic.forEach(e => {
        let url = e.firstElementChild.src;
        let l = url.indexOf('(1)');
        e.bigBg = url.substr(0,l-3) + '.jpg';
    });
    // 给第一个点添加红色
    // 给轮播图片设置一个新的属性
    for (let i = 0; i < pic.length; i++) {
        pic[i].num = i;
        // 动态创建小圆点
        let dot = document.createElement('li');
        ulDot.appendChild(dot);
        // 创建新属性
        dot.circleNum = i;
    }
    // 先将第一个设置成红色
    ulDot.firstElementChild.style.backgroundColor = 'rgb(194,26,26)';
    // 获取每个点
    let liDot = document.querySelectorAll('.box-scr-dot li');
    move(current);
    // 给每个元素设置一个监听事件让小圆点变红
    liDot.forEach(e=>{
        e.addEventListener('click',function(){
            liDot.forEach(e2=>{
                e2.style.backgroundColor = '#fff';
                move(e.circleNum);
            })
            
            e.style.backgroundColor = 'rgb(192,26,26)';
        })
    })
    // 轮播的动画效果
    // 传入number参数与pic中的num对应
    function move(number){
        pic.forEach(pe => {
            pe.style.opacity = '0';
            if (pe.num === number) {
                pe.style.opacity = '1';
                current = pe.num;
                // 添加对应的大背景
                // 大背景的添加依靠图片和背景的关系
                box.style.backgroundImage = 'url(' + pic[current].bigBg + ')';
            }
            // 将对应点连接
            liDot.forEach(le => {
                if (le.circleNum === number) {
                    liDot.forEach(e2 => {
                        e2.style.backgroundColor = '#fff';
                    })
                    le.style.backgroundColor = 'rgb(192,26,26)';
                }
            });
        })
    }
    
    // 自动播放
    let t = setInterval(() => {
        if (current < pic.length-1) {
            current++;
        } else {
            current = 0;
        }
        move(current);
    }, 3000);

    scr.addEventListener('mouseenter',function () {
        clearInterval(t);
    })
    scr.addEventListener('mouseleave', function () {
         t = setInterval(() => {
            if (current < pic.length-1) {
                current++;
            } else {
                current = 0;
            }
            move(current);
        }, 3000);
    })
    
    // 左右箭头移动
    arrowL.addEventListener('click',function () {
        if (current == 0){
            current = pic.length-1;
        }else {
            current--;
        }
        move(current);
    })
    arrowR.addEventListener('click',function () {
        if (current == pic.length-1){
            current = 0;
        }else {
            current++;
        }
        move(current);
    })
}

// 回到顶部
(function () {
    let backTop = document.querySelector('.back-top');
    backTop.addEventListener('click', function () {
        gotop();
    })
})();
    

// 新碟上架滚动
function scr() {
    let div = document.querySelector('.shelves .b-shelves'); // 最大的盒子，装5个ul
    let ulA = document.querySelectorAll('.shelves ul'); // 全部轮播ul
    let i = 1;
    let w = ulA[0].offsetWidth;
    div.style.left = (- i * w ) + 'px'; // 显示第一张
    let arrowR = document.querySelector('.she-arrow-l');
    let arrowL = document.querySelector('.she-arrow-r');
    let timer = null;
    // 监听左右箭头
    arrowL.addEventListener('click', function () {
            moveL();
    });
    arrowR.addEventListener('click',function(){
        moveR();

    })
    function moveL() {  // 向左移动
        if (i == 3) {
            div.style.left = '0px';
            i = 0;
        }
        let speed = Math.floor(w/100); // 设置步长
        clearInterval(timer); // 消除之前的计时器
        timer = setInterval(function () {
            if (div.style.left.substr(0,div.style.left.length-2) <= ( - (i+1) * w )) {
                i++;
                clearInterval(timer);  // 如果到达，清除计时器
            } else {
                div.style.left = div.style.left.substr(0,div.style.left.length-2)- speed + "px"; // 向左移动
            }
        }, 10)
    }
    function moveR() {
        if (i == 1) {
            div.style.left = -4 * w + 'px';
            i = 4;
            // div.style.left = - i-- * ulA[0].offsetWidth + 'px';
        }
        let speed = Math.floor(w / 100); // 设置步长
        clearInterval(timer); // 消除之前的计时器
        timer = setInterval(function () {
            if (div.style.left.substr(0, div.style.left.length - 2) >= (- (i - 1) * w)) {
                i--;
                clearInterval(timer);  // 如果到达，清除计时器
            } else {
                div.style.left = parseInt(div.style.left.substr(0, div.style.left.length - 2)) + speed + "px"; // 向右移动
            }
        }, 10)
        // div.style.left = - i-- * ulA[0].offsetWidth + 'px';
    }
}
scr();

function gotop(){
    timer = setInterval(function(){
        //获取滚动条的滚动高度
        let osTop = document.documentElement.scrollTop || document.body.scrollTop;
        //用于设置速度差，产生缓动的效果
        let speed = Math.floor(-osTop / 6);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
        isTop =true;  //用于阻止滚动事件清除定时器
        if(osTop <= 0){
            clearInterval(timer);
        }
    },30);
}

// 播放列表
function changListDisplay(){
    let listButton = document.querySelector('.play-list');
    let ul = document.querySelector('.song-list');
    listButton.addEventListener('click',function(){
        if(!ul.style.display == 'none'){
            ul.style.display = 'none';
        }else{
            ul.style.display = 'inline-block';
        }
    })
    ul.addEventListener('mouseleave',function(){
        ul.style.display = 'none';
    })
}


// 榜单动画

let rankone = document.querySelectorAll('.rankone'); // 3个排行榜
rankone.forEach(function (ele) {
    let rank = ele.querySelectorAll('.rank');
    rank.forEach(e => {
        e.addEventListener('mouseover', function () {
            // 修改其他元素的样式
            rank.forEach(f => {
                if (f.classList.contains('rank-on')) {
                    let fpic = f.querySelector('.rank-pic');
                    f.querySelector('.pic-num').className = 'rank-num';
                    fpic.style.display = 'none';
                    f.classList.remove('rank-on')
                }
            })
            // 给自己添加样式
            e.classList.add('rank-on');
            let pic = e.querySelector('.rank-pic');
            pic.style.display = 'inline-block';
            e.querySelector('.rank-num').className = 'pic-num';
        })
    });
});





// 适应
(function () {
    let timer = null;
    window.onresize = function () {
        fn();
    }
    let fn = function(){
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            let main = document.querySelectorAll('.main'); // 中间部分,和榜单大盒子
            let rw = document.querySelector('.rw'); // 右边侧边栏
            let br = document.querySelector('.br'); // 右下角图标
            if (window.innerWidth < 1200) {
                main.forEach(b => {
                    b.style.width = '980px'
                })
                rw.style.display = 'none';
                br.style.display = 'none';
            } else {
                main.forEach(b => {
                    b.style.width = '1200px'
                })
                rw.style.display = 'block';
                br.style.display = 'block';
            }
        }, 500);
    }
    fn(); // 打开页面时检测大小
})()

function debounce(fn, wait) {    
    let timeout = null;    
    return function() {        
        if(timeout !== null)   
        clearTimeout(timeout);        
        timeout = setTimeout(fn, wait);    
    }
}

// 调用函数
scroll();
changListDisplay();
// getSearchRelative();
