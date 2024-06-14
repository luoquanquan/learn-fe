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
const CartSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    user: {
        type: ObjectId,
        ref: User
    }
})
const Cart = conn.model('Cart', CartSchema)

;(async () => {
    // const user = await User.create({
    //     name: 'quanquan',
    //     age: 28,
    //     sex: 'male',
    //     create_at: new Date()
    // })
    // console.log(`当前时间 ${Date.now()}: debug 的数据是 user: `, user)

    // const product = await Cart.create({
    //     productName: 'switch',
    //     price: 1800,
    //     user: user._id
    // })
    // console.log(`当前时间 ${Date.now()}: debug 的数据是 product: `, product)
    const productInfo = await Cart.findById('5e31c37ac1b81976794eaff8')
        // 这个 user 的意思是要对 Cart 文档的 user 字段进行 populate(填充)
        .populate('user', {
            name: 1, _id: 0
        })

    console.log(`当前时间 ${Date.now()}: debug 的数据是 productInfo: `, productInfo)
    process.exit(0)
})()

