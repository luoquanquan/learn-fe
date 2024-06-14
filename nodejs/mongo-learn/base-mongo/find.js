var db = connect('users')
var timeStart = Date.now()
var cursor = db.user.find({name: 'quanquan2000'})
cursor.forEach(item => {
    printjson(item)
})
print('耗时:', Date.now() - timeStart)

// 耗时: 52
// 创建索引后耗时: 7