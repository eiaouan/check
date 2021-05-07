
// 新碟推荐
function getNewDisc() {
    let div = document.querySelector('.shelves .b-shelves'); // 最大的盒子，装5个ul
    let obj = {
        type: 'get',
        url: 'https://autumnfish.cn/top/album',
        date: {
            limit: 12
        },
        success: function (date) {
            for (let j = 1; j < 4; j++) {
                let ul = document.createElement('ul');  // 新建ul ，每个ul轮播一次
                for (let i = (j - 1) * 4; i < j * 4; i++) {
                    dd = date.weekData[i];
                    let singers = '';
                    for (let k = 0; k < dd.artists.length; k++) {
                        singers += '   ' + dd.artists[k].name;
                    }
                    let str = '<li class="shelves-disc"> <img src=' + dd.blurPicUrl + '><span class="msk"></span><p><a class="she-disc-name">'
                        + dd.name + '</a></p><p><a class="she-disc-singer">' + singers + '</a></p></li>'
                    ul.insertAdjacentHTML("beforeend", str);
                }
                div.appendChild(ul);
            }
            let ulA = document.querySelectorAll('.shelves ul'); // 全部轮播ul
            let ul1 = ulA[0].cloneNode(true);  // 克隆结点，循环
            let ul3 = ulA[2].cloneNode(true); // 不加true只复制标签
            div.insertAdjacentElement('afterbegin', ul3);
            div.insertAdjacentElement('beforeend', ul1);
            ulA = document.querySelectorAll('.shelves ul');
            let w = ulA[0].offsetWidth;
            // console.log(w);
            // 滚动
            function scr() {
                let i = 0;
                div.style.left = (- (i++) * w ) + 'px'; // 显示第一张
                let arrowR = document.querySelector('.she-arrow-l');
                let arrowL = document.querySelector('.she-arrow-r');
                // 监听左右箭头
                arrowL.addEventListener('click', function () {
                    moveL();
                });
                arrowR.addEventListener('click',function(){
                    console.log('r');
                    moveR();
                })
                function moveL() {  // 向左移动
                    if (i == 3) {
                        div.style.left = '0px';
                        i = 0;
                    // div.style.left = (- (i++) * w ) + 'px';
                    }
                    let timer = null;
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
                    // console.log(div.style.left.substr(0,div.style.left.length-2));
                    // div.style.left = - i++ * ulA[0].offsetWidth + 'px';
                }
                function moveR() {
                    if (i == 1) {
                        div.style.left = -4 * w + 'px';
                        i = 4;
                        // div.style.left = - i-- * ulA[0].offsetWidth + 'px';
                    }
                    let timer = null;
                    let speed = Math.floor(w / 100); // 设置步长
                    console.log(speed ,div.style.left);
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
        },
        error: function () {
            console.log(date);
        }
    }
    ajax(obj);
}

// 热门歌手
function getHotSinger() {
    let obj = {
        type: 'get',
        date: {
            limit: 5
        },
        url: 'https://autumnfish.cn/top/artists',
        success: function (date) {
            let ul = document.querySelector('.b-singer ul');
            for (let a of date.artists) {
                // 创建结构并赋值类名
                let li = document.createElement('li');
                li.className = 'singer';
                let img = document.createElement('img');
                let div = document.createElement('div');
                div.className = 'sin';
                let a1 = document.createElement('a');
                a1.className = 'sin-name';
                let a2 = document.createElement('a');
                a2.className = 'sin-brief';
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');
                p1.appendChild(a1);
                p2.appendChild(a2);
                div.appendChild(p1);
                div.appendChild(p2);
                li.appendChild(img);
                li.appendChild(div);
                ul.appendChild(li);

                // 赋值
                img.src = a.picUrl;
                a1.innerHTML = a.name;
                a2.innerHTML = a.alias;
            }
        },
        error: function (date) {
            console.log(date);
        }
    }
    ajax(obj);
}

// 函数调用
getNewDisc();
getHotSinger();
