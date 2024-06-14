const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
    files: []
}).write()

const getFile = md5 => {
    return db.get('files')
        .find({md5})
        .value()
}

const setFile = file => {
    db.get('files')
    .push(file)
    .write()
}

module.exports = {
    getFile,
    setFile
}

