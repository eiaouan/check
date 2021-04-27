// https://music.163.com/song?id=1837817804

var play = document.querySelector('#play');
var cSong = document.querySelector('#bar-song');// 当前预备的歌曲

// 播放播放条中的歌曲
function playSong(){
    let flag = 0;
    play.addEventListener('click',function(){
        if (flag === 0){
            cSong.play();
            play.style.backgroundPosition = '0px -163px' 
            flag = 1;
        }else if (flag === 1){
            cSong.pause();
            play.style.backgroundPosition = '0px -202px' 
            flag = 0;
        }
    })
}

playSong();
// js有时只能后去内联样式
// 要获取文件中的样式
function getStyle(obj,attr){
    if(obj.getCurrentStyle){
        return getCurrentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}

// 歌曲id
function getId(){
    var xhr = new XMLHttpRequest();
    xhr.open('get','https://autumnfish.cn/user/playlist?uid=32953014');
    xhr.send();
    var user = xhr.responseText;
    var id = null;
    // user.parse(id)
    console.log(user);
}
getId();
