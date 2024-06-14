# mongo 再次学习笔记(学 n 次, 忘 n 次)

## ./base-mongo

> 内部的 js 文件都是 mongo 脚本, 不能使用 node 执行, 需要使用 mongo xxx.js 执行

- index.js 对比了同样添加 1e5 条数据时, 每次循环都调用数据库插入方法和创建一个数组先拼接参数最后一次性插入数据库的时间差异

- find.js 对比了创建索引前后, 查询相同数据的速度差异

ps: 创建索引命令 db.ensureIndex({索引字段: 正序 1, Or 倒序 -1})

## mongoose-learn

- index.js mongoose 实现的增删改查常用办法
- populate.js 实现联表查询
- enity.js 通过实体直接修改内容, 并通过 save 存储修改后的内容
- extend.js 扩展 mongoose 使其更好用
  - statics 给 modal 添加(静态)方法
  - methods 给 modal 的实例添加(原型)方法
  - virtual 虚拟属性, 方便多个属性拼接出一个计算属性的情况, 类比 vue computed
  - pre post 钩子...
    - [pre](https://mongoosejs.com/docs/api.html#schema_Schema-pre)
    - [post](https://mongoosejs.com/docs/api.html#schema_Schema-post)