const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const conn = mongoose.createConnection('mongodb://localhost/users', {
    useNewUrlParser: true
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

;(async () => {
    // 通过实体直接修改
    // doc.save 修改后保存
    // doc.remove 删除实体
    const doc = await User.findById('5e31c37ac1b81976794eaff7')
    doc.age = 9e4
    await doc.save()
})()

