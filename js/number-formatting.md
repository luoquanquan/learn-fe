# 数字添加逗号

## 原生

直接使用数字的 `toLocaleString` 方法，就可以实现数字每 3 位添加一个逗号了，缺点是针对浮点数，只保留小数点后三位数并进行了四舍五入。

```js
function thousands(num){
    return num.toLocaleString();
}
```

## 字符串硬干

```js
const numToThousand = num => {
    let stringNum = (num || 0).toString();
    let result = '';
    while (stringNum.length > 3) {
        result = ',' + stringNum.slice(-3) + result;
        stringNum = stringNum.slice(0, stringNum.length - 3);
    }
    if (stringNum) {
        result = stringNum + result;
    }
    return result;
};
```

## 正则

```js
function thousands(num){
        const str = num.toString();
        const reg = str.includes(".")
            ? /(\d)(?=(\d{3})+\.)/g
            : /(\d)(?=(?:\d{3})+$)/g;
        return str.replace(reg,"$1,");
}
```

## 字符串打散

```js
function thousands(num){
	var splits=[],res=[];
	var splits = num.toString().split(".");
	splits[0].split("").reverse().forEach(function(item,i){
		if (i % 3 == 0 && i!=0) {
            res.push(",");
        }
		res.push(item);
	});
	return res.reverse().join("")+(splits.length>1 ? "."+splits[1] : "");
}
```
