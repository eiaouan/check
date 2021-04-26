// 推荐部分大轮播图
function scroll() {
    var box = document.querySelector('.box-reco');// 获取大框
    var scr = document.querySelector('.scroll');// 获取中间的框
    var ulDot = document.querySelector('.box-scr-dot')
    var pic = scr.getElementsByClassName('rec-pic'); //获取轮播的全部图片
    var current = 0; // 表示当前显示的图片的num属性
    // 给第一个点添加红色
    // 给轮播图片设置一个新的属性
    for(let i=0; i<pic.length;i++){
        pic[i].num = i;
        // 动态创建小圆点
        let dot = document.createElement('li');
        ulDot.appendChild(dot);
        var liDot = document.querySelectorAll('.box-scr-dot li');
        // 给每个元素设置一个监听事件让小圆点变红
        dot.addEventListener('click', function(){
            liDot.forEach(e => {
                e.style.backgroundColor = '#fff'
            });
            dot.style.backgroundColor = 'rgb(194,26,26)'
        })
    }   
    // 先将第一个设置成红色
    ulDot.firstElementChild.style.backgroundColor = 'rgb(194,26,26)'

}

scroll();

// js有时只能后去内联样式
// 要获取文件中的样式
function getStyle(obj,attr){
    if(obj.getCurrentStyle){
        return getCurrentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}