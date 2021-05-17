
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
    let listBox = document.querySelectorAll('.hot .hot-song'); // a标签
    for(let i =0 ; i<listBox.length; i++){
        listBox[i].listid = infArr[i].id;
    }
    
    listBox.forEach( e =>{
        let img = e.querySelector('img');   // 封面
        let plays = e.querySelector('.plays'); // 播放次数
        let p = e.querySelector('p'); // 描述
        let da = {                  // 要传递的数据
            id : e.listid,
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
// 默认华语
getHotList(mand);

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




// 榜单内容
// 加载主页榜单内容

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
                // ranks[i].setAttribute('sId',daA.al.id) 
                // art.setAttribute('aId',daA.ar.id);
                ranks[i].sid =  daA.id // 自定义属性sId表示当前歌曲的id
                art.aId = daA.ar.id;
                pic.style.backgroundImage = 'url(' + daA.al.picUrl + ')';
                name.innerHTML = daA.name;
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
})();


// 获取搜索结果 并且转跳页面
(function(){
    let input = document.querySelector('#index-sea');
    let value = null;
    input.addEventListener('keydown',function(ev){
        if(ev.keyCode == 13){
        value = this.value;
        let paB = document.querySelector('.pa-count') // 装数字的盒子
        paB.tn =1;
        sendSearchRequest(value,paB.tn,LoadpageNum); // 发送搜索结果请求，offset默认为0，并且改变锚点
        }
    })
})();

/**
 * @function 发送搜索请求
 * @param {string} value 用户输入的查询值
 * @param {number} page 页码
 * @param {function} callBack 回调函数
 */

function sendSearchRequest(value,page,callBack){
    const limit = 15;
    let offset = limit*(page-1); // 计算偏移量
    let det = {     // ajax参数对象
        type: 'post',
        url: 'https://autumnfish.cn/search',
        date: {
            keywords: value,
            limit: limit,
            type: 1,
            offset: offset, // 分页
        },
        header : {
            'Content-Type' : 'application/json'
        },
        success: function (d) {
            loadSearchSongs(d, value);
            callBack&&callBack(d.result.songCount, limit,value);
        },
        error: function (d) {
        }

    }
    ajax(det);
    location.hash = '#/search' ;
}


window.onload = function(){
}

/**
 * @function 重新加载搜索页面
 * @param {object} d  页面需要加载的数据
 * @param {string} value 搜索的的关键字
 */
function loadSearchSongs(d,value) {     
    let inp = document.querySelector('#s-inp');
    inp.value = value
    // 动态将搜索内容写入
    let ul = document.querySelector('.s-res ul');
    ul.innerHTML = '';
    let songs = d.result.songs;
    for (let i = 0; i < songs.length; i++) {
        let art = '';
        for (let j = 0; j < songs[i].artists.length; j++) {
            art += songs[i].artists[j].name + ' ';
        }
        let dSecond = Math.floor((songs[i].duration / 1000) % 60); // 歌曲时间长度的秒数
        if (dSecond < 10) {
            dSecond = '0' + dSecond;
        }
        let leng = Math.floor((songs[i].duration / 1000) / 60) + ':' + dSecond;  /// 歌曲时间的表示
        let alb = songs[i].album.name;
        let cl = 's-res-odd';
        if (i % 2 == 1) {
            cl = 's-res-even'
        }
        let str = '<li sId="' + songs[i].id + '" ' + 'class=' + cl + '>'
            + '<span class="s-name">' + songs[i].name + '</span>'
            + '<div class="s-ico">'
            + '<span class="s-play"></span>'
            + '<span class="s-add"></span>'
            + '</div>'
            + '<span class="s-art">' + art + '</span>'
            + '<span class="s-alu">' + alb + '</span>'
            + '<span class="s-leng">' + leng + '</span>'
            + '</li>'
        ul.insertAdjacentHTML('beforeend', str);
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
}

// 加载分页数目
function LoadpageNum(Scount,limit,value){  // 参数：歌曲数目,一个页面内显示的数量
    let paB = document.querySelector('.pa-count') // 装数字的盒子
    let pcount = Math.ceil(Scount/limit); // 取大于Scount/limit的最小整数
    // 初始化paB的内容
    let tn = paB.tn || 1;
    if (tn == 1) {
        paB.innerHTML = '<a href="#" class="pa-on">1</a>';
        if (pcount > 7) {
            for (let i = 2; i < 7; i++) { // 加载默认显示,页数大于7
                let a = document.createElement('a');
                a.innerHTML = i;
                paB.appendChild(a);
            }
            let span = document.createElement('span');
            span.innerHTML = '...';
            paB.appendChild(span);
            let La = document.createElement('a');
            La.innerHTML = pcount;
            paB.appendChild(La);
        } else {
            for (let i = 2; i <= pcount; i++) { // 加载默认显示，页数小于7
                let a = document.createElement('a');
                a.innerHTML = i;
                paB.appendChild(a);
            }
        }
        changeSearchPage(value)
    }

   
}

function changeSearchPage(value) {
    let sPage = document.querySelector('.s-page') // 小面一行的盒子
    let paB = document.querySelector('.pa-count') // 装数字的盒子
    let paback = sPage.querySelector('.pa-b') // 上一页
    let panext = sPage.querySelector('.pa-n') // 下一页
    // 初始化上一页
    paback.disabled = true;
    paB.tn = paB.tn || 1;
    let last = paB.lastElementChild.innerHTML
    // 事件委托
    sPage.addEventListener('mouseup', function (ev) {
        let ele = ev.target;
        //    判断点击的类型
        if (ele.tagName == 'A') {  // 如果点击的是数字
            paB.tn = parseInt(ele.innerHTML);
        } else if (ele.className == 'pa-b') {
            paB.tn -= 1;
        } else if (ele.className == 'pa-n') {
            paB.tn += 1;
        }
        //    判断button是否被禁用
        if (paB.tn == 1) {
            paback.disabled = true;
        } else {
            paback.disabled = false;
        };
        if (paB.tn == paB.lastElementChild.innerHTML) {
            panext.disabled = true;
        } else {
            panext.disabled = false;
        };
        if(paB.tn > 3 && paB.tn < last-3){
            paB.innerHTML = '<a href="#" class="pa-on">1</a><span>...<span>';
            for(let i = paB.tn-2; i< paB.tn+3;i++){
                let n = document.createElement('a');
                n.innerHTML = i;
                n.href = 'javascript:;'
                paB.appendChild(n);
            }
            let span = document.createElement('span');
            span.innerHTML = '...';
            paB.appendChild(span);
            let La = document.createElement('a');
            La.innerHTML = last;
            paB.appendChild(La);
        }else if (paB.tn>= last-3 && paB.tn>4){
            paB.innerHTML = '<a href="#" class="pa-on">1</a><span>...<span>';
            for(let i = paB.tn-2; i< last;i++){
                let n = document.createElement('a');
                n.innerHTML = i;
                n.href = 'javascript:;'
                paB.appendChild(n);
            }
            let La = document.createElement('a');
            La.innerHTML = last;
            paB.appendChild(La);
        }
        let numA = paB.querySelectorAll('a'); // 数字
        numA.forEach(e => {
            if (parseInt(e.innerHTML) == paB.tn) {
                e.className = 'pa-on'
            } else {
                e.className = '';
            }
        })
         
        sendSearchRequest(value, paB.tn) // 重新发送请求并且加载页面
    })
}

// 搜索下拉框
function getSearchRelative() {
    let rs = document.querySelector('.relative-search');  // 提示框
    // oninput
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
                            for (let i = 0; i < date.result[t].length&& i <8; i++) {  // 循环添加li
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
        }, 200);
    })

   
}

// 搜索框失去焦点，点击相关搜索进行搜索
(function () {
    let rs = document.querySelector('.relative-search');  // 提示框
    let input = document.querySelector('#index-sea');   // 搜索框
    input.addEventListener('blur', function () {       // 增加一个失去焦点事件
        rs.style.display = 'none';
    })
    // 监听提示框
    rs.addEventListener('mousedown',function (ev) {
        let ele = ev.target ;
        if(ele.tagName == 'LI'){  // 点击li进行搜索
            input.value = ele.innerHTML;
            let paB = document.querySelector('.pa-count') // 装数字的盒子
            paB.tn = 1;
            sendSearchRequest(input.value,paB.tn,LoadpageNum);
            rs.style.display = 'none';

        }
    })
})()
