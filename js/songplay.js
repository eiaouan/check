// https://music.163.com/song/media/outer/url?id=554241732.mp3

var play = document.querySelector('#play'); // 播放按钮
var playPic = document.querySelector('.play-pic'); // 播放条的图片
var playSongName = document.querySelector('#play-song'); // 歌曲名称
var playSinger = document.querySelector('#play-singer');// 歌手名称
var barSong = document.querySelector('#bar-song'); // 播放条中的audio标签

var id = barSong.src.substring(barSong.src.indexOf('id=')+3,barSong.src.lastIndexOf('.mp3')); // 截取id
var idList = [
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
    '441359',
    '26667946',
    '33291435',
];
// 调用接口获取详细信息
var details = {
    type : 'get',
    header : {
        contentType : 'application/json'
    },
    date : {
        ids : id
    },
    url : 'https://autumnfish.cn/song/detail',
    success : function(date){
        playPic.style.backgroundImage =  'url(' +  date.songs[0].al.picUrl + ')';
        playSongName.innerHTML = date.songs[0].al.name;
        playSinger.innerHTML = date.songs[0].ar[0].name;
    },
    error : function(date){
        console.log(date);
    }
}
// barSong 的src的拼接函数
// 点击列表切换歌曲
function setSrc(){
    barSong.src = 'https://music.163.com/song/media/outer/url?id=' + id +'.mp3';
    details.date.ids = id;
    ajax(details);
    flag = 0;
    playSong();
}

// 播放播放条中的歌曲
 let flag = 0;
function playSong() {
    if (!flag) {
        
        setTimeout(function() {
            barSong.play();
        }, 200);
        play.style.backgroundPosition = '0px -163px'
        flag = 1;
    } else if (flag) {
        barSong.pause();
        play.style.backgroundPosition = '0px -202px'
        flag = 0;
    }
}
play.addEventListener('click', function(){
    playSong();
})

ajax(details);



// 要添加事件才可以显示时间长度
// 在音频加载完后触发
// 进度条和时间
// 加载播放列表
barSong.addEventListener('canplaythrough',function(){
    var duration = document.querySelector('#song-time'); // 歌曲时间长度
    var currentTime = document.querySelector('#play-time'); // 已播放时间
    var bar = document.querySelector('.progress-bar'); // 进度条总长度
    var currentBar = document.querySelector('#bar-white'); // 已播放
    var dSecond = Math.floor(barSong.duration%60); // 歌曲时间长度的秒数
    if(dSecond < 10){
        dSecond = '0'+ dSecond;
    }
    duration.innerHTML = Math.floor(barSong.duration/60) + ':' + dSecond;
    
    setInterval(function(){
    var cSecond = Math.floor(barSong.currentTime%60); // 已播放的时间的秒数
    if(cSecond < 10){
        cSecond = '0'+ cSecond;
    }
        currentTime.innerHTML = Math.floor(barSong.currentTime/60) + ':' + cSecond + ' /';
        currentBar.style.width = Math.floor(bar.offsetWidth *(barSong.currentTime/barSong.duration)) + 10  + 'px';
    },500);
    bar.addEventListener('click',function(e){
        barSong.currentTime = barSong.duration * (e.offsetX/bar.offsetWidth);
    })
    
})

var index = 0;
// 顺序播放
function playOrder(){
    //  index = 0;
    barSong.addEventListener('ended', function(){
        index = idList.indexOf(id);
        setTimeout(() => {
            if(index == idList.length-1){
                id = idList[0];
            }else{
                id = idList[++index]
            }
            setSrc();
        }, 200);
    });
loadNext();
}
playOrder();
function loadNext(){
    var Bplay = document.querySelector('#Bplay') ; // 上一首
    var Nplay = document.querySelector('#Nplay'); // 下一首
    Bplay.addEventListener('mousedown', function () {
        index = idList.indexOf(id);
        setTimeout(() => {
            if(index == 0){
                id = idList[idList.length-1];
            }else{
                id = idList[--index]
            }
            setSrc();
        }, 200);
    });
    Nplay.addEventListener('mousedown', function () {
        index = idList.indexOf(id);
        setTimeout(() => {
            if(index == idList.length-1){
                id = idList[0];
            }else{
                id = idList[++index]
            }
            setSrc();
        }, 200);
    })
}

// 动态加载播放列表函数
function loadSongList(idList) {
    let ul = document.querySelector('.song-list');
    idList.forEach(i => {
        var li = document.createElement('li');
        var d = {
            type: 'get',
            header: {
                contentType: 'application/json'
            },
            date: {
                ids: i
            },
            url: 'https://autumnfish.cn/song/detail',
            success: function (date) {
                li.innerHTML = date.songs[0].al.name + ' - ' + date.songs[0].ar[0].name;
                ul.appendChild(li);
            },
            error: function () {
                console.log('获取失败');
            }
        }
        ajax(d);
        li.Sid = i; // 给每个li添加新属性 Sid 资源的id
        li.addEventListener('click',function(){
            id = li.Sid;
            setSrc();
        })
    })
}
loadSongList(idList);


// js有时只能后去内联样式
// 要获取文件中的样式
function getStyle(obj,attr){
    if(obj.getCurrentStyle){
        return getCurrentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}
