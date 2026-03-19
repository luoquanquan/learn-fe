# 命令注入

## 命令

![](http://handle-note-img.niubishanshan.top/2020-03-01-17-12-07.png)

### 基本命令

命令 | 功能
--- | ---
查看本地网络 | ipconfig
查看系统用户 | net user
查看目录 | dir "{path}"
字符串查找 | find 'hello' ./text.txt (在 text.txt 文件中查找 hello 的行)

### 复合命令

命令拼接 **&** 依次执行拼接的命令
```shell
echo 'hello' & echo 'world'

hello
world
```

管道符 **|** 依次执行拼接的命令，前边命令的输出作为后边命令的输入
```shell
ipconfig | find 'IPv4'

各种 IPv4 的 ip 地址
```

### 假传圣旨(图例)

正常流程
![](http://handle-note-img.niubishanshan.top/2020-03-01-17-22-19.png)

修改后的流程
![](http://handle-note-img.niubishanshan.top/2020-03-01-17-23-43.png)

## 命令注入原理

### 前提

- 调用可执行系统命令的函数
- 函数或者函数的参数可控
- 拼接注入命令

### 过程

- 客户端构造命令，并发送到服务端
- 服务端拼接命令并执行明林
- 命令执行的结果返回给 web 端

## 示例

php 代码
![](http://handle-note-img.niubishanshan.top/2020-03-01-17-27-27.png)

前端交互
![](http://handle-note-img.niubishanshan.top/2020-03-01-17-27-59.png)

## 参数可控示例

php 代码
![](http://handle-note-img.niubishanshan.top/2020-03-01-17-29-12.png)

前端交互
![](http://handle-note-img.niubishanshan.top/2020-03-01-17-30-17.png)

执行攻击的流程
![](http://handle-note-img.niubishanshan.top/2020-03-01-17-32-05.png)

执行结果
![](http://handle-note-img.niubishanshan.top/2020-03-01-17-32-37.png)

## 注意

进行命令注入攻击时，url 中的 & 要进行 urlEncode. 否则会被认为是一个参数分隔符
