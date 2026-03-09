# SQL 注入

## 概念

SQL 注入, 又叫 SQL Injection. 是一种常见的 web 安全漏洞. 是指 web 应用程序对用户输入数据的合法性没有判断或过滤不严, 攻击者可以在 web 应用程序中事先定义好的查询语句的结尾上添加额外的SQL语句, 在管理员不知情的情况下实现非法操作, 以此来实现欺骗数据库服务器执行非授权的任意查询, 从而进一步得到相应的数据信息的攻击方式

![](http://handle-note-img.niubishanshan.top/2020-03-01-17-02-49.png)

## 本质

**数据**和**代码**未分离, 把数据当成代码来执行了...

## 万能密码

### 实现原理

正常用户登录过程
前端交互
![](http://handle-note-img.niubishanshan.top/2020-03-01-16-51-26.png)

后端处理逻辑
![](http://handle-note-img.niubishanshan.top/2020-03-01-16-57-56.png)

黑客的登录过程
前端交互
![](http://handle-note-img.niubishanshan.top/2020-03-01-16-52-24.png)

后端处理逻辑
![](http://handle-note-img.niubishanshan.top/2020-03-01-16-59-33.png)

两者对比
![](http://handle-note-img.niubishanshan.top/2020-03-01-16-53-04.png)

### 实现过程

- 获取用户请求参数
- 将用户端发来的请求参数直接用于拼接 SQL
- 执行 SQL

### 必备条件

- 可以控制的输入数据
- 服务器要执行的代码拼接了控制的数据

## 危害

### 获取用户信息

- 获取管理员 or 其他用户的用户名密码等敏感信息
- 拖库

### 获取服务器权限

- 植入webshell, 获取服务器后门
- 读取服务器敏感文件
- 万能密码
- ...
