# package.json 中库的版本号符号

> package.json 的依赖库版本号前大多有一个 ^ ~ 这两者有什么区别呢

## 含义

- 波浪符号(~)：当依赖的**修订号**发生升级后，使用 `npm i` 会自动升级最新版本
- 插入符号(^)：当依赖的**次版本号**发生升级后，使用 `npm i` 会自动升级最新版本

以上两者均不会更新 `package.json`

## 原理及使用步骤

使用 `npm i gulp@4.0.0 hexo@4.1.0` 之后修改 `package.json` 文件如下：

PS: 修改的原因是当前利用 `npm` 安装的模块默认使用的是 `^` 修饰符

```json
"dependencies": {
    "gulp": "~4.0.0",
    "hexo": "^4.1.0"
}
```

如上代码中，`gulp` 版本符号使用了 `~` 而 `hexo` 的版本符号使用了 `^`. 根据概念，如果存在 `gulp` 的修订号更新或者 `hexo` 的次版本号更新。通过 `npm i` 安装依赖时应该都会更新⋯⋯

然而，执行后结果如下
```json
"dependencies": {
    "gulp": "~4.0.0",
    "hexo": "^4.1.0"
}
```

看上去似乎没有什么改变，执行 `npm list` 会得到以下结果

```txt
├─┬ gulp@4.0.0
│ ├─ 似乎有那么一点点的失败
└─┬ hexo@4.1.0
  ├── 其他各种依赖包的版本
```

他还真没有什么改变⋯⋯

经过查阅各种资料我发现

之所以出现以上的情况是因为，项目中存在了 `package-lock.json` 文件。删除该文件后再次 `npm i`

再看 `package.json`

```json
"dependencies": {
    "gulp": "^4.0.0",
    "hexo": "^4.1.0"
}
```

卧槽，卧槽槽槽⋯⋯还是没有变化呀，然后执行 `npm list` 会得到以下结果

```txt
├─┬ gulp@4.0.2
│ ├─┬ 实际的版本号是更新了的
└─┬ hexo@4.2.0
  ├── 还有各种依赖的信息
  ├── ......
```

可以看出，虽然 `package.json` 里边记录的内容没有变化，但是实际下载到的版本是升级以后的版本，这个可谓是天坑，刚刚在公司项目里边踩到⋯⋯

## 其他常用的版本号修饰符

- \* === ""代表任意版本的版本号
- \> 必须大于版本号
- \>= 大于或等于版本号
- < 必须小于版本号
- <= 小于或等于版本号

## 参考文章

- [语义化版本 2.0.0](https://semver.org/lang/zh-CN/)
- [node 版本控制 package.json](https://blog.csdn.net/u011584949/article/details/80447862)
- [What's the difference between tilde(~) and caret(^) in package.json?](https://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json)
