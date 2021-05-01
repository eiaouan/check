
// 新碟推荐
function getNewDisc() {
    let ul = document.querySelector('.shelves ul');
    let obj = {
        type: 'get',
        url: 'https://autumnfish.cn/top/album',
        date: {
            limit: 10
        },
        success: function (date) {
            for (let i = 0; i < 12; i++) {
                dd = date.weekData[i];
                console.log('dd');
                // 建立结构
                let li = document.createElement('li');
                let img = document.createElement('img');
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');
                let a1 = document.createElement('a');
                let a2 = document.createElement('a');
                li.className = 'shelves-disc';
                a1.className = 'she-disc-name';
                a2.className = 'she-disc-singer';
                p1.appendChild(a1);
                p2.appendChild(a2);
                li.appendChild(img);
                li.appendChild(p1);
                li.appendChild(p2);
                ul.appendChild(li);
                // 将内容输入
                img.src = dd.blurPicUrl;
                a1.innerHTML = dd.name;
                a2.innerHTML = dd.artists[0].name;
                for (let i = 1; i < dd.artists.length; i++) {
                    a2.innerHTML += '   ' + dd.artists[i].name;
                }

            }

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
            limit: 6
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
