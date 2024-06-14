var db = connect('users')
var i  = 0;

var timeStart = Date.now()
var arr = []
while (i++ < 1e5) {
    arr.push({name: 'quanquan' + i, age: i + 10})
}

db.user.insert(arr)
print(Date.now() - timeStart)

// 耗时: 112