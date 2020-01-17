# 分片上传接口文档

> 分片上传: 利用了三步上传法:
>   1. 预上传, 请求上传会话
>   2. 分片上传, 保存每一个分片
>   3. 完成上传, 分片拼接

## 1. 文件检查

### 1.1 功能描述

检查当前文件是否已经上传过, 如果文件已经上传过直接返回文件信息实现秒传功能

### 1.2 请求说明

> 请求说明: <br>
> 请求方式: GET<br>
> 请求PATH: `/upload/fileCheck/{md5}`

### 1.3 请求参数

字段 | 字段类型  | 字段说明
--- | --- | ---
md5 | string | 文件的 md5 值

### 1.4 返回结果

### 之前上传过该文件触发秒传

```json
{
    "errno":0,
    "data":{
        "md5":"f2d1570da9deece6b8be74a12f6bc0da",
        "fileName":"1.mp4",
        "size":11423592
    }
}
```

### 之前没有上传过该文件

```json
{
    "errno":1
}
```

### 1.5 返回参数

字段 | 字段类型  | 字段说明
--- | --- | ---
errno | Number | 0: 说明服务器上已经存在该文件直接返回文件的信息 1: 目前没有上传过该文件需要上传
data | Object | 触发秒传时, 返回的已上传文件信息
&nbsp;&nbsp; md5 | String | 文件的 md5 值
&nbsp;&nbsp; fileName | String | 文件名
&nbsp;&nbsp; size | Number | 文件大小

## 2. 分片检查

### 2.1 功能描述

检查当前分片是否已经上传过, 如果上传过的话直接跳过当前分片尝试上传下一个分片

### 2.2 请求说明

> 请求说明: <br>
> 请求方式: GET<br>
> 请求PATH: `/upload/chunkCheck/:fileMd5/:chunkId`

### 2.3 请求参数

字段 | 字段类型  | 字段说明
--- | --- | ---
fileMd5 | String | 文件的 md5
chunkId | String | 分片的 id

### 2.4 返回结果

### 当前分片已经上传过, 触发断点续传

```json
{
    "errno": 0,
    "msg": "already"
}
```

### 当前分片没有上传过, 继续上传

```json
{
    "errno":1,
    "msg":"not have"
}
```

### 2.5 返回参数

字段 | 字段类型  | 字段说明
--- | --- | ---
errno | Number | 0: 当前分片已经上传过, 直接跳过 1: 当前分片没有上传过需要上传
msg | String | 提示信息

## 3. 分片上传

### 3.1 功能描述

前端一个一个上传分片数据, 后端保存分片数据信息

### 3.2 请求说明

> 请求说明: <br>
> 请求方式: POST<br>
> 请求PATH: `/upload/:fileMd5/:chunkId`

### 3.3 请求参数

字段 | 字段类型  | 字段说明
--- | --- | ---
fileMd5 | String | 文件 md5
chunkId | String | 当前上传的分片 id

### 3.4 返回结果

```json
{
    "errno":0
}
```

### 3.5 返回参数

字段 | 字段类型  | 字段说明
--- | --- | ---
errno | Number | 只能成功不能失败 😂

## 4. 完成上传-把所有分片拼接成一个文件

### 4.1 功能描述

所有分片上传完成后, 通知后端拼接所有文件为一个文件并存储到数据系统中

### 4.2 请求说明

> 请求说明: <br>
> 请求方式 POST<br>
> 请求PATH: `/upload/fileMerge/:md5/:chunks/:fileName/:size`

### 4.3 请求参数

字段 | 字段类型  | 字段说明
--- | --- | ---
md5 | String | 文件 md5
chunks | String | 文件包含的分片个数, 用于拼接文件
fileName | String | 文件名, 用于为拼接后的文件命名
size | String | 文件大小

### 4.4 返回结果

```json
{
    "errno": 0,
    "data":{
        "md5":"938122899e5212c8c185b15bb1de6141",
        "fileName":"mda.mp4",
        "size":25669900
    }
}
```

### 4.5 返回参数

字段 | 字段类型  | 字段说明
--- | --- | ---
errno | Number | 提示码
data | Object | 合并完成的文件信息
&nbsp;&nbsp; md5 | String | 文件的 md5
&nbsp;&nbsp; fileName | String | 文件名
&nbsp;&nbsp; size | Number | 文件大小