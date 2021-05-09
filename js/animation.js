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

// 回到顶部
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

// 播放列表
function changListDisplay(){
    var listButton = document.querySelector('.play-list');
    var ul = document.querySelector('.song-list');
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
var rank = document.querySelectorAll('.rank');
rank.forEach(e => {
    e.addEventListener('mouseover' ,function(){
        // 修改其他元素的样式
        rank.forEach(f => {
            if(f.classList.contains('rank-on')){
                let fpic = f.querySelector('.rank-pic');
                f.querySelector('.pic-num').className = 'rank-num';
                fpic.style.display = 'none';
                f.classList.remove('rank-on')
            }
        })
        // 给自己添加样式
        e.classList.add ('rank-on');
        let pic = e.querySelector('.rank-pic');
        pic.style.display = 'inline-block';
        e.querySelector('.rank-num').className ='pic-num';
    })
});

// 搜索下拉框
function getSearchRelative() {
    // oninput
    let rs = document.querySelector('.relative-search');  // 提示框
    let input = document.querySelector('#index-sea');   // 搜索框
    let timer = null;       // 用定时器设置防抖
    input.addEventListener('input', function () {      // 输入事件
        let value = document.querySelector('#index-sea').value;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            let inf = {
                type: 'get',
                url: 'https://autumnfish.cn/search/suggest',
                date: {
                    keywords: value
                },
                success: function (date) {
                    rs.style.display = 'block';
                    let boxA = document.querySelectorAll('.rs-m');
                    for (e of boxA) {
                        let t = e.getAttribute('type'); // 存放结果类型
                        if (date.result.order.includes(t)) {  // 如果存在该类型的值，显示该类型的框，没有则不显示
                            e.style.display = 'block';
                            // date.result[t] 各类型的内容  
                            let ul = e.querySelector('ul');     // 各类型下的ul
                            for (let i = 0; i < date.result[t].length; i++) {  // 循环添加li
                                let li = document.createElement('li');
                                li.innerHTML = date.result[t][i].name;
                                ul.appendChild(li);
                            }
                        } else {
                            e.style.display = 'none';
                        }
                    }
                },
                error: function () {
                    rs.style.display = 'none';
                }
            }
            if (value) {  // 如果value为空就不发送请求
                ajax(inf);
            } else {
                let ul = document.querySelectorAll('.rs-m ul')
                ul.forEach(e => {
                    e.innerHTML = '';
                });
                rs.style.display = 'none';
            }
            timer = null;
        }, 500);
    })

    input.addEventListener('blur', function () {       // 增加一个失去焦点事件
        rs.style.display = 'none';
    })
}




// 调用函数
scroll();
gotop();
changListDisplay();
getSearchRelative();

