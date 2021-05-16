//  路由

let index1 = document.querySelector('#index');
let search = document.querySelector('#search');
let user = document.querySelector('#user');
let pages = document.querySelectorAll('.page');
window.addEventListener('DOMContentLoaded',onHashChange());
window.addEventListener('hashchange',onHashChange);
function onHashChange(){
    switch (location.hash){
        case '#/index' : {
            pages.forEach(e=>{
                e.style.display = 'none';  // 隐藏其他页面
            });
            index1.style.display = 'block';
            break;
        }
        case '#/search' : {
            pages.forEach(e=>{
                e.style.display = 'none';  // 隐藏其他页面
            });
            search.style.display = 'block';
            break;
        }
        case '#/user' : {
            pages.forEach(e=>{
                e.style.display = 'none';  // 隐藏其他页面
            });
            user.style.display = 'block';
            loadUserPage(); // 点击之后再加载
        }
    }
     document.documentElement.scrollTop = document.body.scrollTop = 0; // 加载后回到顶部
    if (location.hash != '#/index') {  // 隐藏子导航
        let subnav = document.querySelector('.box-subnav');
        subnav.style.display = 'none';
        let occu = document.querySelector('.occu');
        occu.style.height = '71px'
        let top = document.querySelector('.flex-top');
        top.style.height = '71px'
    } else {
        let subnav = document.querySelector('.box-subnav');
        subnav.style.display = 'block';
        let occu = document.querySelector('.occu');
        occu.style.height = '105px'
        let top = document.querySelector('.flex-top');
        top.style.height = '105px'
    }
}
