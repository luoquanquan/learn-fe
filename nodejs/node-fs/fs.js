const fs = require('fs')

fs.readFile('./files/1', (err, data) => {
    if (err) {
        console.log('文件读取失败')
        return
    }

    fs.writeFile('./files/new1', data, (err) => {
        if (err) {
            console.log('文件写入失败')
            return
        }
        console.log('文件操作成功')
    })
})