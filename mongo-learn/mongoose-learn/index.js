const mongoose = require('mongoose')

const conn = mongoose.createConnection('mongodb://localhost/users', {
    useNewUrlParser: true
})

conn.on('open', () => {
    console.log(`当前时间 ${Date.now()}: 代码走到了这里 连接成功`)
})

conn.on('error', () => {
    console.log(`当前时间 ${Date.now()}: 代码走到了这里 连接失败`)
})

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
    create_at: Date,
    hobby: {
        type: Array,
        default: []
    }
})

const User = conn.model('User', userSchema)

console.log(User === conn.model('User'))
;(async () => {
    // 新增
    // const ret = await User.create({
    //     name: 'quanquan',
    //     age: 28,
    //     sex: 'male',
    //     create_at: new Date()
    // })
    // console.log(`当前时间 ${Date.now()}: debug 的数据是 ret: `, ret)

    // 修改
    // 默认自带合并功能不会覆盖
    // updateOne, updateMany, or bulkWrite
    // const ret = await User.updateOne({name: 'quanquan', age: 28}, {
    //     $addToSet: {
    //         hobby: {
    //             $each: ['唱', '跳', 'rap', '篮球 1']
    //         }
    //     }
    // })
    // console.log(`当前时间 ${Date.now()}: debug 的数据是 ret: `, ret)

    // 删除
    // deleteOne deleteMany
    // const ret = await User.deleteMany({name: 'quanquan', age: 28})
    // console.log(`当前时间 ${Date.now()}: debug 的数据是 ret: `, ret)

    // 查询
    const arr = []
    for (let i = 0; i < 10; i++) {
        arr.push({
            name: 'quanquan' + i,
            age: 28 + i % 2,
            sex: 'male',
            create_at: new Date()
        })
    }
    const ret = await User.create(arr)
    console.log(`当前时间 ${Date.now()}: debug 的数据是 ret: `, ret)

    process.exit(0)
})()

