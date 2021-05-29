// 拖动滚动条
let slider = {

    use: function(id,callBack) {  // 进度条滑动
        let self = this;
        self.slider = document.querySelector(id);
        self.bar = self.slider.querySelector('.bar-white');
        self.thumb = self.slider.querySelector('span');
        self.slider.addEventListener('mousedown', function(e) {
            if (e.target.tagName == 'SPAN') { // 判断点击红点
                self.mDown = true;
                self.beginClientX = e.clientX;
                self.beginWidth = self.bar.offsetWidth;
            //    clearInterval(barSong.timew);  //   清除计时器 
                barSong.removeEventListener('timeupdate',tu,false)
            }

        });

        document.addEventListener('mousemove', function(e) {
            if (self.mDown) {
                let moveX = e.clientX - self.beginClientX; // 鼠标移动距离
                let tw = self.beginWidth + moveX; // 临时宽度
                if(tw<=0){
                self.bar.style.width = '0px';
                }else{
                    self.bar.style.width = (tw > self.slider.offsetWidth ? self.slider.offsetWidthtw : tw ) + 'px';
                    // barSong.currentTime = barSong.duration * (currentBar.offsetWidth / bar.offsetWidth);

                }
            }
        });

        document.addEventListener('mouseup', function(e) {
            if (self.mDown) {
                self.mDown = false;
                callBack&&callBack();
            }
        });

    },

    useY : function (id,callBack){  // 音量调节
        let self = this;
        self.slidery = document.querySelector(id);
        self.bary = self.slidery.querySelector('.bar-white');
        self.thumby = self.slidery.querySelector('span');
        self.slidery.addEventListener('mousedown', function(e) {
            if (e.target.tagName == 'SPAN') { // 判断点击红点
                self.mDowny = true;
                self.beginClientY = e.clientY;
                // self.beginTop = self.thumb.offsetTop;
                self.beginHeight = self.bary.offsetHeight;
            }

        });
        document.addEventListener('mousemove', function(e) {
            if (self.mDowny) {
                let moveY =  self.beginClientY-e.clientY; // 鼠标移动距离
                let th = self.beginHeight + moveY; // 临时高度
                if(th<0){
                self.bary.style.height = '0px';
                }else{
                    // self.bar.style.width = (tw > self.slider.offsetWidth ? self.slider.offsetWidthtw : tw ) + 'px';
                    self.bary.style.height = (th > self.slidery.offsetHeight ? self.slidery.offsetHeight : th ) +'px';
                }
            }

        });

        document.addEventListener('mouseup', function(e) {
            if (e.button == 0 && self.mDowny) {
                self.mDowny = false;
                let v = Math.round(self.bary.offsetHeight/self.slidery.offsetHeight *100 )/100 ; // 保留两位小数
                callBack && callBack(v); // 音量大小
            }
        });
    },

    

};

barSong.setct = function (){
    let bar = document.querySelector('.progress-bar'); // 进度条总长度
    let currentBar = document.querySelector('.bar-white'); // 已播放
    barSong.currentTime = barSong.duration * (currentBar.offsetWidth / bar.offsetWidth);
    // barSong.seti() // 添加计时器
    barSong.addEventListener('timeupdate',tu) // 添加事件

}
slider.use('.progress-bar',barSong.setct);

// 音量调节
barSong.voiceSet = function(v){  // 传递一个0-1之间的数值
    barSong.volume = v;
}
slider.useY('.voice-bar',barSong.voiceSet);
// 显示、隐藏音量条
(function(){
    let voice = document.querySelector('#voice-set');
    voice.display = display.bind(voice,'.voice-bar');
    voice.display();
})()

/**
 * 
 * @param {string} sclass 需要隐藏或者显示的元素
 */
function display(sclass){ 
    this.sdis = this.parentNode.querySelector(sclass);  //需要隐藏或者显示的元素
    this.flag = 0;
    this.addEventListener('mousedown',function(e){
            if(this.flag){
                this.flag = 0;
                this.sdis.style.display = 'none';
            }else{
                this.flag = 1;
                this.sdis.style.display = 'inline-block';
            }
    })
}
// 修改搜索分类
function changeSCLass(callBack) {
    let liA = document.querySelector('.s-class ul').querySelectorAll('li');
    liA.forEach(ele => {
        if (ele.className.includes('s-cl-on')) {
            ele.className = '';
        }
        this.className = 's-cl-on'; // 显示边框
    });
    callBack && callBack();
}

// 给单曲添加

(function(){
    let ss = document.querySelector('#ss');
    ss.change = changeSCLass;
    ss.addEventListener('mouseup',function(){
        if(!ss.className.includes('s-cl-on')){
            let input = document.querySelector('#index-sea');   // 搜索框
            let paB = document.querySelector('.pa-count') // 装数字的盒子
            ss.change(sendSearchRequest.bind(ss,input.value,paB.tn,LoadpageNum))
            let page = document.querySelector('.s-page');
            page.style.display = 'block';
        }
    })
})()

// 搜索入口

let playmv = {
    search : function (){   //搜索入口
        this.sbtn = document.querySelector('.s-mv'); // 搜索界面的视频按钮
        this.slimit = 12;
        this.soffset = 1;
        this.ul = document.querySelector('.s-res ul');
        
        this.sbtn.addEventListener('mouseup',function(e){
        // console.log(this);  => s-mv 按钮
            // this.value = document.querySelector('#index-sea').value  // 搜索界面的输入框
            this.change = changeSCLass;
            this.change()
            sendR();
        })
        function sendR() { // 发送请求
            // 发送请求
            let det = {     // ajax参数对象
                type: 'get',
                url: 'https://autumnfish.cn/search',
                date: {
                    keywords: document.querySelector('#index-sea').value,
                    limit: playmv.slimit,
                    type: 1004,
                    offset: playmv.soffset, // 分页
                },
                // header: {
                //     'Content-Type': 'application/json'
                // },
                success: function (d) {
                    loads(d)
                    
                },
                error: function (d) {
                    console.log(d);
                }
            }
            ajax(det);
        }

        function loads (d){
            let s =d.result.mvs;
            // 加载视频内容
            playmv.ul.innerHTML = ''; // 清空有内容
            for (let i = 0; i < s.length; i++) {
                let arts = '';
                for (let j = 0; j < s[i].artists.length; j++) {
                    arts += s[i].artists[j].name;
                }
                let str = '<li class="s-mvs" mvid="' + s[i].id + '">\
                <div>\
                <img src='+ s[i].cover + ' alt="">\
                </div>\
                <p class="">'+ s[i].name + '</p>\
                <p class="s-mvs-art">'+ arts + '</p>\
                </li>'
                playmv.ul.insertAdjacentHTML('beforeend', str);
            }
            // 隐藏页数
            let page = document.querySelector('.s-page');
            page.style.display = 'none';
            playmv.ul.addEventListener('click',function(ev){
                if(ev.target.tagName== 'IMG'){ // 点击图片播放
                    playmv.mvid = ev.target.parentNode.parentNode.getAttribute('mvid');
                    playmv.click();
                }
            })
        }
    },
    click : function(){ // 点击跳转页面
        location.hash = '#/video'
        // 暂停歌曲播放
        let play = document.querySelector('#play');
        barSong.pause();
        play.style.backgroundPosition = '0px -202px'
        play.flag = 0;
        playmv.loadPage();
    },
    loadPage : function(){ // 加载页面
        playmv.video = document.querySelector('#vv');
        // 发送请求获得播放地址
        let det = {
            type : 'get',
            url : 'https://autumnfish.cn/mv/url',
            date : {
                id : playmv.mvid
            },
            header : {
                contentType: 'application/json',
            },
            success : function(d){
                console.log(d);
                playmv.video.src = d.data.url;
                playmv.loadMvInf();
                playmv.loadComment();
            },
            error : function(d){
                console.log(d);
            }
        }
        ajax(det);
    },
    loadMvInf : function(){
        playmv.page = document.querySelector('#video');
        let det = {
            type : 'get',
            url : 'https://autumnfish.cn/mv/detail',
            date : {
                mvid : playmv.mvid,
            },
            success : function(d){
                // console.log(d);
                // let str = '<h1>'+ d.data.name +'</h1>\
                // <p class="v-art">'+  d.data.artistName +'</p>'
                // playmv.page.insertAdjacentHTML('afterbegin',str);
                let h1 = playmv.page.querySelector('h1');
                h1.innerHTML = d.data.name;
                let art = playmv.page.querySelector('.v-art');
                art.innerHTML = d.data.artistName;
            },
            error : function(d){
                console.log(d);
            }
        }
        ajax(det);
    },
    p : null,
    loadComment : function(){
        let u = document.querySelector('.b-comment ul');
        u.innerHTML =''; // 清空原有评论
        const limit = 20;
        let offset = 1;
        if(playmv.p){
            offset = playmv.p.pn 
        }
        let det = {
            type : 'get',
            url : 'https://autumnfish.cn/comment/mv',
            date : {
                id : playmv.mvid,
                limit : limit,
                offset : offset
            },
            success : function(d){
                playmv.page.comUl = document.querySelector('.b-comment ul')
                console.log(d);
                let c =d.comments
                for(let i=0;i<c.length;i++){
                    let str = '<li class="v-com">\
                    <div>\
                        <img src="'+ c[i].user.avatarUrl +'" alt="">\
                        <p>'+  c[i].user.nickname +'</p>\
                    </div>\
                    <div class="com-con">'+ c[i].content +'</div>\
                    <span class="com-g"></span>\
                </li>'
                playmv.page.comUl.insertAdjacentHTML('beforeend',str);
                }
                let count = null;
                if(d.total < 99*limit ){
                    count = Math.floor(d.total/limit);
                }else{
                    count = 99;
                }
                if(playmv.p){
                playmv.page.removeChild(playmv.p);
                }
                playmv.p = SetPage(offset,count, playmv.loadComment);
                playmv.page.appendChild(playmv.p);
            },
            error : function(d){
                console.log(d);
            }
        }
        ajax(det);
    }
}

playmv.search();



