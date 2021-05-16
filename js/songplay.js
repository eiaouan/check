// https://music.163.com/song/media/outer/url?id=554241732.mp3

let play = document.querySelector('#play'); // 播放按钮
let playPic = document.querySelector('.play-pic'); // 播放条的图片
let playSongName = document.querySelector('#play-song'); // 歌曲名称
let playSinger = document.querySelector('#play-singer');// 歌手名称
let barSong = document.querySelector('#bar-song'); // 播放条中的audio标签

// 立即调用，给播放条添加属性记录id和idList
(function(){
let barSong = document.querySelector('#bar-song'); // 播放条中的audio标签
let idList = [
    '1837817804',
    '461347998',
    '518066366',
    '2872411',
    '17950534',
    '20087060',
    '3885379',
    '31010564',
    '35416168',
    '422132125',
    '354352',
    '26667946',
    '33291435',
];
barSong.idList = idList;  // 把id数组存入播放条的idList属性中
barSong.sid = '1837817804'   // 添加一个默认的歌曲id
barSong.index = 0;          // 顺序播放的计数器
loadSongList(barSong.idList); // 加载播放列表

let play = document.querySelector('#play'); // 播放按钮
play.flag = 0 ;  // 给按钮添加flag属性，flag= 0 停止，flag= 1 播放
})();


// 调用接口获取详细信息
/**
 * 
 * @param {{}} callBack 回调函数 
 */
function sendSongDetailRequest(callBack){
    let id = barSong.sid; // 当前需要播放歌曲的id
    let details = {
        type : 'get',
        header : {
            contentType : 'application/json'
        },
        date : {
            ids : id
        },
        url : 'https://autumnfish.cn/song/detail',
        success : function(date){
            callBack&& callBack(date);
        },
        error : function(date){
            console.log(date);
        }
    }
    ajax(details);
};

sendSongDetailRequest(LoadBarSong); // 发送第一次默认请求加载播放器

/**
 * 
 * @param {object} date 发送歌曲详情请求放回的数据
 */
function LoadBarSong(date) {
    // 获取元素
    let playPic = document.querySelector('.play-pic'); // 播放条的图片
    let playSongName = document.querySelector('#play-song'); // 歌曲名称
    let playSinger = document.querySelector('#play-singer');// 歌手名称
    let ars = '';
    for (ar of date.songs[0].ar) {
        ars += ar.name;
    }
    playPic.style.backgroundImage = 'url(' + date.songs[0].al.picUrl + ')';
    playSongName.innerHTML = date.songs[0].name;
    playSinger.innerHTML = ars;
};





// 动态加载播放列表函数

/**
 * @function 加载播放列表
 * @param {Array} idList 播放列表的歌曲id数组 
 */
function loadSongList(idList) {
    let ul = document.querySelector('.song-list');
    ul.innerHTML = '';
        let d = {
            type: 'get',
            header: {
                contentType: 'application/json'
            },
            date: {
                ids: idList.join(',')
            },
            url: 'https://autumnfish.cn/song/detail',
            success: function (date) {
                for(let i =0 ; i<date.songs.length;i++){
                let li = document.createElement('li');
                    // 把每一首歌加载到播放列表
                    let ars = '';
                    for(ar of date.songs[i].ar){
                        ars +=  ar.name + '&nbsp;';
                    }
                li.innerHTML = date.songs[i].name + ' - ' + ars;
                li.sid = date.songs[i].id;
                li.addEventListener('click',function(){
                    barSong.sid = li.sid;
                    setSrc();
                 })
                ul.appendChild(li);
                let span = document.createElement('span');
                span.innerHTML = '×'
                li.appendChild(span);
                }
                
                
            },
            error: function () {
                console.log('获取失败');
            }
        }
        ajax(d);
        // li.Sid = i; // 给每个li添加新属性 Sid 资源的id
        
};


/**
 * @function 播放或者暂停歌曲
 */

function playSong() {
    let play = document.querySelector('#play');
    if (!play.flag) {
        setTimeout(function() {
            barSong.play();
        }, 200);
        play.style.backgroundPosition = '0px -163px'
        play.flag = 1;
    } else if (play.flag) {
        barSong.pause();
        play.style.backgroundPosition = '0px -202px'
        play.flag = 0;
    }
};

// 添加点击事件调用函数
(function(){
    let play = document.querySelector('#play')

    play.addEventListener('click', function(){
        playSong();
    })
})();




// 要添加事件才可以显示时间长度
// 在音频加载完后触发
// 进度条和时间
// 加载播放列表
(function () {
    barSong.addEventListener('canplaythrough', function () {
        let duration = document.querySelector('#song-time'); // 歌曲时间长度
        let currentTime = document.querySelector('#play-time'); // 已播放时间
        let bar = document.querySelector('.progress-bar'); // 进度条总长度
        let currentBar = document.querySelector('#bar-white'); // 已播放
        let dSecond = Math.floor(barSong.duration % 60); // 歌曲时间长度的秒数
        if (dSecond < 10) {
            dSecond = '0' + dSecond;
        }
        duration.innerHTML = Math.floor(barSong.duration / 60) + ':' + dSecond;

        setInterval(function () {
            let cSecond = Math.floor(barSong.currentTime % 60); // 已播放的时间的秒数
            if (cSecond < 10) {
                cSecond = '0' + cSecond;
            }
            currentTime.innerHTML = Math.floor(barSong.currentTime / 60) + ':' + cSecond + ' /';
            currentBar.style.width = Math.floor(bar.offsetWidth * (barSong.currentTime / barSong.duration)) + 10 + 'px';
        }, 500);
        bar.addEventListener('click', function (e) {
            barSong.currentTime = barSong.duration * (e.offsetX / bar.offsetWidth);
        })

    })

})();

// barSong 的src的拼接函数 （可以换成获取歌曲url的接口）
// 点击列表切换歌曲

/**
 * @function 更改播放器的src属性并且播放歌曲
 */
function setSrc(){
    barSong.src = 'https://music.163.com/song/media/outer/url?id=' + barSong.sid +'.mp3';
    sendSongDetailRequest(LoadBarSong);
    let play = document.querySelector('#play');
    play.flag =0;
    playSong();
    setNowSongStyle();
};

// 顺序播放
function playOrder(){
    //  index = 0;
    barSong.addEventListener('ended', function(){
        playNext.call(barSong);
    });
}
function loadNext(){
    let Bplay = document.querySelector('#Bplay') ; // 上一首
    let Nplay = document.querySelector('#Nplay'); // 下一首
    Bplay.addEventListener('mousedown', function () {
        playBack();
    });
    Nplay.addEventListener('mousedown', function () {
        playNext.call(barSong);
    })
}

playOrder();
loadNext();

/**
 * @function 播放上一首
 */
function playBack(){
    let idList = barSong.idList;
    barSong.index = barSong.idList.indexOf(barSong.sid);
        setTimeout(() => {
            if(barSong.index == 0){
                barSong.sid = idList[idList.length-1];
            }else{
                barSong.sid = idList[--barSong.index]
            }
            setSrc();
        }, 200);
}

/**
 * @function 播放下一首
 */
function playNext(){
    this.index = this.idList.indexOf(this.sid);
    console.log(this.index);
        setTimeout(() => {
            if(this.index == this.idList.length-1){
                this.sid = this.idList[0];
            }else{
                this.sid = this.idList[++this.index]
            }
            setSrc();
        }, 200);
};

// 曾
// 删
// 查

function addid (id){
    let i = barSong.idList.indexOf(barSong.sid);
    barSong.idList.splice(i+1,0,id);
    loadSongList(barSong.idList)    // 添加后宠重新加载歌单
}

// 改变id，idlist；
function chuangeid (id){
    addid(id);
    playNext.call(barSong);
}

// 删除歌曲
// 调用时指定有Sid的元素
function deleteid (){
    let i = barSong.idList.indexOf(barSong.sid);
    // this.Sid 要删除的id
    let idcount = barSong.idList.indexOf(this.sid);
    if(idcount == i){
        playNext.call(barSong); // 先播放下一首，在删除
        barSong.idList.splice(idcount,1);
    }else {
        barSong.idList.splice(idcount,1);
    }
}

// 监听榜单点击事件
(function(){
    let box = document.querySelector('.box-rank');  // 榜单的主要部分
    // 委托
    box.addEventListener('click',function(ev){
        // 播放其中一首格
        if(ev.target.className.includes('playsong')){
            chuangeid(ev.target.parentNode.parentNode.sid);
            console.log(ev.target.parentNode.parentNode.sid);
        }else if (ev.target.className.includes('addsong')){  // 添加到播放列表
            console.log('add');
            addid(ev.target.parentNode.parentNode.sid)
        } else if (ev.target.className == 'play-rank-list'){       // 播放其中一个表单的歌曲，但是之前的歌曲会被覆盖
            let ul = ev.target.parentNode.parentNode.querySelector('ul'); // 获取ul
            let liA = ul.querySelectorAll('li'); // 获取榜单的li
            let oldlist = document.querySelector('.song-list') // 原本播放列表
            oldlist.innerHTML = '';
            let idList = new Array;
            for(let i =0;i < liA.length;i++){
                idList[i] = liA[i].sid;
            }
            barSong.idList = idList;
            loadSongList(barSong.idList);
        } else if (ev.target.className == 'add-rank-list'){
            let ul = ev.target.parentNode.parentNode.querySelector('ul'); // 获取ul
            let liA = ul.querySelectorAll('li');
            let idList = new Array;
            for(let i =0;i < liA.length;i++){
                idList[i] = liA[i].sid;
            }
            barSong.idList = idList;
            loadSongList(barSong.idList);
            barSong.sid = liA[0].sid;
            setSrc();
        }
    });

})();

// 监听热门推荐播放、添加歌单
(function(){
    let hotb = document.querySelector('.hot');
    hotb.addEventListener('click',function(ev){
        let ele = ev.target;
        if(ele.className == 'hot-play'){
            let lid = ele.parentNode.parentNode.listid;
            let fn = function(date){
                let idList = [];
                console.log(date.privileges);
                for( let i = 0; i< date.privileges.length;i++){
                    idList[i] = date.privileges[i].id;
                }
                let oldlist = document.querySelector('.song-list'); // 原本播放列表
                oldlist.innerHTML = '';
                barSong.idList = idList;
                barSong.sid = date.privileges[0].id
                loadSongList(barSong.idList);
                setSrc();
            };
            // 发送请求获取歌单详情
            loadList({id : lid},fn);
        }else if (ele.className == 'hot-list'){
            let lid = ele.parentNode.parentNode.listid;
            let fn = function(date){
                let idList = [];
                for( let i = 0; i< date.privileges.length;i++){
                    idList[i] = date.privileges[i].id;
                }
                barSong.idList.push(...idList);
                loadSongList(barSong.idList);
            }
            loadList({id : lid},fn);
        }
    })
})();

// 功能：删除播放列表中的歌单
// ，找到当前播放的歌曲添加样式
function setNowSongStyle(){
    // 遍历li
    let liA = document.querySelectorAll('.song-list li');
    liA.forEach(li=>{
        li.className = '';
    })
    for (li of liA) {
        if (li.sid == barSong.sid) {
            li.className = 'play-now';
        }
    }
}

// js有时只能后去内联样式
// 要获取文件中的样式
function getStyle(obj,attr){
    if(obj.getCurrentStyle){
        return getCurrentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}
