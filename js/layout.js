//  路由

let index1 = document.querySelector('#index');
let search = document.querySelector('#search');
console.log(index1,search);
window.addEventListener('DOMContentLoaded',onHashChange());
window.addEventListener('hashchange',onHashChange);
function onHashChange(){
    switch (location.hash){
        case '#/index' : {
            console.log('index');
            index1.style.display = 'block';
            search.style.display = 'none';
            break;
        }
        case '#/search' : {
            index1.style.display = 'none';
            search.style.display = 'block';
            break;
        }
    }
}
