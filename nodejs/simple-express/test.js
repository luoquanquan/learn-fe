// const express = require('express')
const express = require('./index')
const path = require('path')

const conf = {
    PORT: 3001
}

const app = express()

app.use(express.static(path.resolve(__dirname, 'public')))

app.use((req, res, next) => {
    console.log(1)
    next()
})

app.use((req, res, next) => {
    console.log(2)
    next()
})

app.use((req, res, next) => {
    console.log(3)
    next()
})

app.get('/', (req, res) => {
    res.send('234')
})

app.post('/', (req, res) => {
    res.send(req.body)
})

app.get('/user/:id/:name', (req, res) => {
    const {params: {id, name}} = req
    res.end(JSON.stringify({id, name}))
})

app.use((err, req, res, next) => {
    if (err) {
        res.end('something Error')
        next(err)
    }
})


app.listen(conf.PORT, () => {
    console.log(`The Server Is Staring On ${conf.PORT}`)
})