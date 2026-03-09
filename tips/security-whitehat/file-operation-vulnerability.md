# 文件操作漏洞

## 常见的文件操作

### 文件上传

- 上传头像
- 上传附件

### 文件下载

- 下载应用
- 下载附件

## 文件操作漏洞

### 文件上传

- 上传 webshell
- 上传木马

### 文件下载

- 下载系统任意文件
- 下载程序代码
- 下载配置文件

## 文件上传漏洞

### 正常上传流程

![](http://handle-note-img.niubishanshan.top/2020-03-01-17-54-25.png)

### 恶意文件上传

![](http://handle-note-img.niubishanshan.top/2020-03-01-17-55-12.png)

![](http://handle-note-img.niubishanshan.top/2020-03-01-17-55-30.png)

![](http://handle-note-img.niubishanshan.top/2020-03-01-17-55-48.png)

![](http://handle-note-img.niubishanshan.top/2020-03-01-17-56-01.png)

#### 前提

- 可以上传可执行脚本
- 脚本拥有执行权限

#### 利用

![](http://handle-note-img.niubishanshan.top/2020-03-01-17-57-58.png)

## 任意文件下载漏洞

正常下载
![](http://handle-note-img.niubishanshan.top/2020-03-01-17-58-59.png)

异常下载
![](http://handle-note-img.niubishanshan.top/2020-03-01-17-59-40.png)

![](http://handle-note-img.niubishanshan.top/2020-03-01-17-59-58.png)

![](http://handle-note-img.niubishanshan.top/2020-03-01-18-00-51.png)

### 危害

- 代码泄露
- 数据库配置文件泄露
- 系统文件泄露

### 前提

- 未验证下载文件格式
- 未限制请求路径

### 利用

![](http://handle-note-img.niubishanshan.top/2020-03-01-18-03-46.png)

## 文件包含漏洞

### 分类

- 本地文件包含
- 远程文件包含

### 过程

![](http://handle-note-img.niubishanshan.top/2020-03-01-18-06-20.png)

![](http://handle-note-img.niubishanshan.top/2020-03-01-18-06-42.png)

![](http://handle-note-img.niubishanshan.top/2020-03-01-18-06-59.png)

![](http://handle-note-img.niubishanshan.top/2020-03-01-18-07-09.png)

![](http://handle-note-img.niubishanshan.top/2020-03-01-18-07-34.png)
