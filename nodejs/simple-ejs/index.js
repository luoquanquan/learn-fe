const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const obj = {
    name: 'quanquan',
    sex: 'male',
    arr: [
        '是时候扼杀那些陷入黑暗的人了',
        '我用双手成就你的梦想',
        '我的剑就是你的⚔'
    ]
}

const render = (ejsStr, obj) => {
    ejsStr = ejsStr.replace(/<%=(.*?)%>/g, (...args) => {
        // 因为外层用了 with(){} 所以这里可以直接拿到对应的值
        return '${' + args[1] + '}'
    })

    let head = `let str;
        with(obj) {
    `
    head += 'str = `\r\n'
    const content = ejsStr.replace(/<%(.*?)%>/g, (...args) => {
        return '`\r\n' + args[1] + '\r\n str +=`'
    })
    const tail = '`}; return str;'

    const fn = new Function('obj', `${head}${content}${tail}`)

    return fn(obj)
}

const ejsStr = fs.readFileSync(path.resolve(__dirname, 'index.ejs'), 'utf-8')
const htmlStr = render(ejsStr, obj)

console.log(htmlStr)