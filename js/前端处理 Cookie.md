# 前端处理 Cookie

## 添加一条 cookie

### 简单粗暴的方法

```js
document.cookie="key=quanquan"
```

### 文艺一点的方法

```js
function setCookie(key, value, expiresHours) {
    let cookie = key + "=" + value
    //判断是否设置过期时间, 0代表关闭浏览器时失效
    if (expiresHours > 0) {
        const date = new Date(Date.now() + expiresHours * 3600 * 1000)
        cookie = cookie + "; expires=" + date.toGMTString()
    }
    document.cookie = cookie
}
```

## 删除指定的 cookie

```js
function deleteCookie (key){
    const date = new Date(Date.now() - 1) // 过去的时间
    document.cookie = key + "=value; expires=" + date.toGMTString() // 此时这条记录就已经是过期的啦
}
```

## 更新指定的 cookie

```js
function modify(key, value, expiresHours) {
    let cookie = key + "=" + value
    //判断是否设置过期时间,0代表关闭浏览器时失效
    if (expiresHours > 0) {
        const date = new Date(Date.now() + expiresHours * 3600 * 1000) // 设置失效时间, 单位为小时
        cookie = cookie + "; expires=" + date.toGMTString()
    }
    document.cookie = cookie
}
```

## 获取指定的 cookie 的值

### 把 cookie 转化成一个对象获取对象的值

```js
function getCookie(key) {
    const cookieMap = {}
    const cookie = document.cookie
    if (cookie.length) {
        c = cookie.split('; ')
        for (var i = 0; i < c.length; i++) {
            cookieMap[c[i].split('=')[0].trim()] = c[i].split('=')[1].trim()
        }
    }
    return cookieMap[key] || null
}
```

### 切断 cookie 遍历数组找到同名 key 直接返回

```js
function getCookie(key) {
    const cookie = document.cookie
    const cookieArr = cookie.split("; ")
    for (var i = 0; i < cookieArr.length; i++) {
        var arr = cookieArr[i].split("=").map(i => i.trim())
        if (arr[0] == key) {
            return arr[1]
        }
    }

    return null
}
```

### 生猛的使用字符串截取

```js
function getCookie(key) {
    const search = key + "=" //查询检索的值
    let returnValue = ""; //返回值
    if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(search);
        if (start != -1) {
            start += search.length;
            end = document.cookie.indexOf(";", start);
            if (end == -1) end = document.cookie.length;
            returnValue = document.cookie.substring(start, end);
        }
    }
    return returnValue;
}
```

### 正则匹配

```js
function getCookie(key) {
    const reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    let arr;
    if (arr = document.cookie.match(reg))
        return arr[2]
    else
        return '';
}
```

```js
function getCookie(key) {
    const cookie = document.cookie
    const cookieMap = {}
    const reg = /([^=; ]*)=([^; ]*)/g
    cookie.replace(reg, (...args) => {
        const [, k, v] = args
        cookieMap[k] = v
    })

    return cookieMap[key] || null
}
```
