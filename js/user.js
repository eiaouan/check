
// 3.填入html中
// 1.获取uid
/**
 * 
 * @returns 用户id
 */
function getuid(){
    let id = document.querySelector('.person-head').uid;
    return id;
}

// 2.发送请求，用户信息

// 2.1 发送用户信息详情

/**
 * @function 获取用户详情
 * @param {string} uid 用户id 
 * @param {number} page 页数
 */
function sendUserDetailRequset(uid,page){
    let limit = 5;
    let detail = {
        type : 'get',
        url : 'https://autumnfish.cn/user/detail',
        date : {
            uid : uid,
            limit : limit,
            offset : (limit-1)*page,
        },
        success : function(date){
            loadUserd(date);
        } ,
        error : function(date){
            console.log(date.msg);
        }
    }
    ajax(detail);
}

/**
 * @function 用户主页加载用户信息
 * @param {object} d 用户详情请求放回的数据 
 */

function loadUserd(d){
    // 头像
    let pic = document.querySelector('.u-pic img');
    pic.src = d.profile.avatarUrl;
    // 网名
    let name = document.querySelector('.u-name');
    name.innerHTML = d.profile.nickname;
    // 等级
    let level = document.querySelector('.u-level');
    level.innerHTML = 'Lv' + d.level;
    // gender 性别
    let gender = document.querySelector('.u-sex');
    if(d.profile.gender == 1){
        gender.style.backgroundPosition = '-41px -56px';
    }else {
        gender.style.backgroundPosition = '-41px -27px';
    }
    // 动态
    let enve = document.querySelector('.even-count');
    enve.innerHTML = d.profile.eventCount;
    // 关注
    let follows = document.querySelector('.follows');
    follows.innerHTML = d.profile.follows;
    // 粉丝
    let followeds = document.querySelector('.followeds');
    followeds.innerHTML = d.profile.followeds;
}


// 2.2 用户歌单请求
/**
 * @function 获取用户歌单 
 * @param {string} uid 用户id 
 * @param {Number} page 页数 
 */
function sendUserListRequest(uid,page){
    let limit = 4;
    let list = {    // 用户歌单ajax参数
        type : 'get',
        url : 'https://autumnfish.cn/user/playlist',
        date : {
            uid : uid,
            limit : limit,
            offset : limit*(page-1),
        },
        success : function(date){
            if(date.playlist.length != 0){
                loadUserList(date);
            }else{
                alert('没有了哦');
            }
        } ,
        error : function(date){
            console.log(date.msg);
        }
    }
    ajax(list);
}

function loadUserList(d){
    // 设置page记录页数
    let lmore = document.querySelector('.u-l-more'); // 更多
    lmore.page = lmore.page || 1;
    let lis = document.querySelector('.b-lis'); //  盒子
    //lis.innerHTML = ''; // 先清空盒子
    for(let i =0;i<d.playlist.length; i++){
        let p = d.playlist[i];
        let count = p.playCount;
            if (count > 10000) {
                count = Math.floor(count / 1000);
                count = count + '万';
            }
        let str = '<div class="hot-son">\
                    <a href="#" class="hot-song">\
                        <div class="msk"></div>\
                        <img src="'+ p.coverImgUrl +'" alt="">\
                        <div class="b-coast">\
                            <span class="hot-play"></span>\
                            <span class="hot-list"></span>\
                            <!-- 播放次数 -->\
                            <div class="plays">'+ count +'</div>\
                        </div>\
                        <p>'+ p.name +'</p>\
                    </a>\
                </div>';
        lis.insertAdjacentHTML('beforeend',str);
    }
 }

// 点击更多

(function(){
    let lmore = document.querySelector('.u-l-more');
    lmore.addEventListener('click',function(){
        lmore.page +=1;
        sendUserListRequest(getuid(),lmore.page)
    })
})()


// 2.3 用户关注列表
/**
 * @function 查看用户关注列表
 * @param {string} uid 用户id
 * @param {number} page 页数
 */
function sendFollowRequest(uid,page){
    let limit = 5;
    let follows = {
        type : 'get',
        url : 'https://autumnfish.cn/user/follows',
        date : {
            uid : uid,
            limit : limit,
            offset : (limit)*(page-1),
        },
        success : function(date){
            if(date.follow != 0){
                loadUserFol(date);
            }else{
                alert('没有了哦');
            }
        } ,
        error : function(date){
            console.log(date.msg);
        }
    }
    ajax(follows);
}

/**
 * @function 加载用户关注列表
 */
function loadUserFol(d){
    // 设置page记录页数
    let fmore = document.querySelector('.fs-more'); // 更多
    fmore.page = fmore.page || 1;
    let ul = document.querySelector('.u-fs ul'); //  盒子
    ul.innerHTML = ''; // 先清空盒子
    for(let i =0; i<d.follow.length; i++){
        let f = d.follow[i];
        let str = '<li>\
                    <img src="'+ f.avatarUrl +'" alt="">\
                    <p class="fs-name">' + f.nickname + '</p>\
                </li>'
        ul.insertAdjacentHTML('beforeend',str);
    }
}

// 添加点击事件
(function (){
    let fmore = document.querySelector('.fs-more');
    fmore.addEventListener('click',function(){
        fmore.page +=1;
        sendFollowRequest(getuid(),fmore.page);
    })
})()

/**
 * @function 加载个人主页
 */
function loadUserPage(){
    let id = getuid();
    let lmore = document.querySelector('.u-l-more'); // 更多
    let fmore = document.querySelector('.fs-more');
    let pagel = lmore.page || 1;
    let pagef = fmore.pagr||1;
    if(id){
        sendUserDetailRequset(id);
        sendUserListRequest(id,pagel);
        sendFollowRequest(id,pagef);
    }
    
}

