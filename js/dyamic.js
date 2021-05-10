
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
                    moveR();
                })
                function moveL() {  // 向左移动
                    if (i == 3) {
                        div.style.left = '0px';
                        i = 0;
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
// 函数调用
getNewDisc();

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

// 热门推荐
// 华语,流行,摇滚,民谣,电子
// 默认华语

// 获热门分类歌单
function getHotList(tag){
    // 传递自定义属性tag
    // 创建Ajax参数
    let details = {
        type : 'get',
        url : 'https://autumnfish.cn/top/playlist',
        date : {
            order : 'hot', 
            cat : tag,
            limit : 5,
        },
        success : function(date){
            loadHotList(date);
        },
        error : function(date){
            console.log(date);
        }
    }
    ajax(details);
}
getHotSinger();


let mand = document.querySelector('#mand');
let hotClassB = document.querySelector('.box-hot-class'); // 装分类名字的盒子
let hotClass = document.querySelectorAll('.hot-class a');
// 事件委托
hotClassB.addEventListener('click',function(e){
    let ele = e.target;
    if(ele.parentNode.className == 'hot-class'){
        hotClass.forEach(e=>{
            e.style.color = 'rgb(141, 141, 141)'
        })
        ele.style.color = 'rgb(236, 65, 65)';
        let tag = ele.innerHTML;
        getHotList(tag);
    }
})

function loadHotList(date){
    let infArr = date.playlists;  // 获取歌单id
    let listBox = document.querySelectorAll('.hot-song'); // a标签
    for(let i =0 ; i<listBox.length; i++){
        listBox[i].setAttribute('listId',infArr[i].id);
    }
    
    listBox.forEach( e =>{
        let img = e.querySelector('img');   // 封面
        let plays = e.querySelector('.plays'); // 播放次数
        let p = e.querySelector('p'); // 描述
        let da = {                  // 要传递的数据
            id : e.getAttribute('listId'),
        }
        let fn = function (d) {
            img.src = d.playlist.coverImgUrl;
            p.innerHTML = d.playlist.name;
            let count = d.playlist.playCount;
            if (count > 10000) {
                count = Math.floor(count / 1000);
                count = count + '万';
            }
            plays.innerHTML = count;

        }
        loadList(da,fn);
    });
}

// 加载歌单细节 
function loadList (da,callBack){
    let details = {
        type : 'get',
        url : 'https://autumnfish.cn/playlist/detail',
        date : da,  // 数据
        success: function(d){
            //  如果回调函数存在，执行回调函数
            callBack&&callBack(d);
        },
        error : function(date){
            console.log(date);
        }
    }
    ajax(details);
}


// 默认华语
getHotList(mand);

// 榜单内容
// 加载主页表单内容

(function(){
    let rankB = document.querySelectorAll('.rankone'); // 3个表单
    rankB.forEach(function(ele){
        let tag = ele.getAttribute('tag');
        let ranks = ele.querySelectorAll('.rank');
        let fn = function(d){  // d是请求放回的数据
            // console.log(d.playlist.tracks); // => nolist100
            for(let i =0; i < ranks.length;i++){
                let pic = ranks[i].querySelector('.rank-pic'); // 封面
                let name = ranks[i].querySelector('a'); // 歌曲名字
                let art = ranks[i].querySelector('.singer-name a') // 歌手名字
                let daA = d.playlist.tracks[i];
                ranks[i].setAttribute('sId',daA.al.id) // 自定义属性sId表示当前歌曲的id
                art.setAttribute('aId',daA.ar.id);
                pic.style.backgroundImage = 'url(' + daA.al.picUrl + ')';
                name.innerHTML = daA.al.name;
                for(let j =0;j<daA.ar.length; j++){
                    art.innerHTML += daA.ar[j].name;
                }
            }
        }

        let date = {
            id : tag ,
            limit : 10,
        }
        loadList(date,fn);
    }) 
})()


//  点击加载
let rankBox = document.querySelector('.b-rank');  // 榜单部分
// 待补全
rankBox.addEventListener('click',function(ev) {
    let ele = ev.target; // 点击的元素
    // 判断点击对象的类型，执行相应函数
    if(ele.className.includes('rank')){

    }
});

// 获取热门话题

(function(){
    let tdetail = {
        type : 'get',
        url : 'https://autumnfish.cn/hot/topic',
        date : {
            limit : 6,
            offset : 6,
        },
        success : function(d){
            console.log(d);
        },
        error : function(d){
            console.log(d);
        }
    }
    ajax(tdetail);
})();


// 获取搜索结果 并且转跳页面
(function(){
    let input = document.querySelector('#index-sea');
    input.addEventListener('keydown',function(ev){
        console.log('keyd');
        if(ev.keyCode == 13){
            let value = this.value;
            let det = {     // ajax参数对象
                type : 'get',
                url : 'https://autumnfish.cn/search',
                date : {
                    keywords : value,
                    limit : 15,
                    type : 1
                },
                success : function(d){
                    console.log(d);
                    // 动态将搜索内容写入
                    let ul = document.querySelector('.s-res ul');
                    console.log(ul);
                    let songs = d.result.songs;
                    for(let i = 0;i<songs.length;i++){
                        let art = null;
                        for(let j=0;j<songs.artists.length;i++){
                            art += songs.artists +' ';
                        }
                        let dSecond = Math.floor((songs[i].duration/1000) % 60); // 歌曲时间长度的秒数
                        if (dSecond < 10) {
                            dSecond = '0' + dSecond;
                        }
                        let leng = Math.floor((songs[i].duration/1000) / 60) + ':' + dSecond;  /// 歌曲时间的表示
                        let alb = songs[i].album.name;
                        let str = '<li sId="' + songs[i].id + '">' 
                        +'<span class="s-name">' + songs[i].name + '</span>'
                        +'<div class="s-ico">'
                            +'<span class="s-play"></span>'
                            +'<span class="s-add"></span>'
                        +'</div>'
                        +'<span class="s-art">'+ art +'</span>'
                        + '<span class="s-alu">'+ alb +'</span>'
                        + '<span class="s-leng">'+ leng +'</span>'
                    +'</li>'
                        ul.insertAdjacentHTML('beforeend',str);
                    }
                },
                error : function(d){
                    console.log(d);
                }
                
            }
            ajax(det);
            
            location.hash = '#/search';
        }
    }) 
})();


 