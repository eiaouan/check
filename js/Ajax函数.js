function ajax(options){
    var defaults = {

    }
    // 使用options对象中的属性覆盖defaults对象中的属性
    Object.assign(defaults,options);
    var xhr = new XMLHttpRequest();
    // xhrFields: { withCredentials: true }
    // xhr.withCredentials = true;
    var params = '';
    // 使用循环动态拼接请求参数
    for(let attr in defaults.date) {
        params += attr + '=' + defaults.date[attr] + '&';
    }
    // 去掉最后一个&
    // console.log(params);
    params = params.substr(0, params.length-1);
    // 判断请求方式
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params;
        // 配置Ajax对象
        xhr.open(defaults.type, defaults.url);
        xhr.send();
    }

    if (defaults.type == 'post') {
        defaults.url = defaults.url + '?' + params + 't' + Math.random ;
        xhr.open(defaults.type, defaults.url);
        var contentType = defaults.header['Content-Type']
        // 设置请求参数格式类型
        xhr.setRequestHeader('Content-Type', contentType);
        // 判断用户请求参数类型
        if (contentType == 'application/json') {
            // 向服务端传输普通类型的请求参数
            xhr.send(JSON.stringify(defaults.date));
        } else {
            xhr.send(params);
        }
    }

    // 当xhr接受完响应数据后触发
    xhr.onload = function(){
        // xhr.getResponseHeader()
        // 获取响应头中的数据
        var contentType = xhr.getResponseHeader('Content-Type');
        var responseText = xhr.responseText;
        // 如果响应类型中包括application/json
        if (contentType.includes('application/json')){
            // 将json字符串转换成json对象
            responseText = JSON.parse(responseText);
        }
        if(xhr.status == 200) {
            defaults.success(responseText, xhr);
        }else {
            defaults.error(responseText,xhr);
        }
    }
}

// 参数为一个对象，该对象有type url success 几种属性

// ajax({
//     type: 'post',
//     url: '',
//     success: fucntion (date) {
//         console.log('1')
//     } ,
//     error: fucntion(){
//         console.log('1')
//     }

// })