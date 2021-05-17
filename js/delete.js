
getHotSinger();


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

/**
 * @function 获取热门话题
 */
 function getHotTopic(page){
    let cookie = sessionStorage.getItem('cookie')||localStorage.getItem('cookie')
    if(cookie){
        let tdetail = {
            type : 'get',
            url : 'https://autumnfish.cn/hot/topic',
            date : {
                cookie : cookie,
                limit : 5,
                offset : 5*(page-1),
            },
            success : function(d){
                console.log(d);
                // 加载进html
                let ul = document.querySelector('.b-hot-topic ul');
                ul.innerHTML = '';  // 先清空li
                for(let i = 0 ; i < d.hot.length; i++){
                    let str = '<li>\
                    <div class="t-pic">\
                        <img src="' + d.hot[i].sharePicUrl + '" alt="">\
                    </div>\
                    <p class="t-title">' + d.hot[i].title + '</p>\
                </li>'
                ul.insertAdjacentHTML("beforeend",str); // 插入ul末尾
                }
            },
            error : function(d){
                console.log(d);
            }
        }
        ajax(tdetail);
    }else { // 如果没有cookie，弹出登录窗口
        let login = document.querySelector('.box-login');
        login.style.display = 'block';
    }
    
}
  
(function (){
    let tpc = document.querySelector('.b-hot-topic span');  // 换一换
    tpc.page = 1;     // 设置page属性记录页码
    tpc.addEventListener('click',function(){
        getHotTopic(this.page);
        console.log(this.page);
        this.page += 1;
    })
})();

var slider = {
    use: function (id) {
        var self = this;
        self.slider = document.getElementById(id);
        self.bar = self.slider.querySelector('.progress-bar');
        self.thumb = self.slider.querySelector('.progress-thumb');
        self.slider.addEventListener('mousedown', function (e) {

            if (e.button == 0) { // 判断点击左键
                self.mDown = true;
                self.beginX = e.offsetX;
                self.positionX = e.offsetX;
                self.beginClientX = e.clientX;
                self.sliderLong = parseInt(self.getStyle(self.slider, 'width'));
                var per = parseInt(self.positionX / self.sliderLong * 100);
                self.bar.style.width = per + '%';
            }

        });

        document.addEventListener('mousemove', function (e) {
            if (self.mDown) {
                var moveX = e.clientX - self.beginClientX;
                self.positionX = (self.beginX + moveX > self.sliderLong) ? self.sliderLong : (self.beginX + moveX < 0) ? 0 : self.beginX + moveX;
                var per = parseInt(self.positionX / self.sliderLong * 100);
                self.bar.style.width = per + '%';
            }

        });

        document.addEventListener('mouseup', function (e) {

            if (e.button == 0) {

                self.mDown = false;

            }

        });

    },

    getStyle: function (obj, styleName) { // 获取元素样式的方法
        if (obj.currentStyle) {
            return obj.currentStyle[styleName];
        } else {
            return getComputedStyle(obj, null)[styleName];
        }
    }
};

slider.use('demo');