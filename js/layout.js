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
            // search.style.display = 'none';
            break;
        }
        case '#/search' : {
            // index1.style.display = 'none';
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
     document.documentElement.scrollTop = document.body.scrollTop = 0;
    
}
