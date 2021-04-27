// 推荐部分大轮播图
function scroll() {
    var box = document.querySelector('.box-reco');// 获取大框
    var scr = document.querySelector('.scroll');// 获取中间的框
    var ulDot = document.querySelector('.box-scr-dot')
    var pic = document.querySelectorAll('.rec-pic'); //获取轮播的全部图片
    var arrowL = document.querySelector('.arrow-l'); // 获取左箭头
    var arrowR = document.querySelector('.arrow-r'); // 获取右箭头
    var current = 0; // 表示当前显示的图片的num属性
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
    var liDot = document.querySelectorAll('.box-scr-dot li');
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
    var t = setInterval(() => {
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

function gotop() {
    var backTop = document.querySelector('.back-top');
    backTop.addEventListener('click', function () {
        timer = setInterval(function(){
            //获取滚动条的滚动高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //用于设置速度差，产生缓动的效果
            var speed = Math.floor(-osTop / 6);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            isTop =true;  //用于阻止滚动事件清除定时器
            if(osTop == 0){
                clearInterval(timer);
            }
        },30);
    })
}
gotop();


// 调用函数
scroll();


