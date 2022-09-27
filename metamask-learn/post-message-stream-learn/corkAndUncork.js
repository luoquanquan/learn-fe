const { Writable } = require('stream');

class MyWritableStream extends Writable {
    constructor() {
        super()
    }

    _write(data, _encoding, next) {
        console.log(data.toString())
        next()
    }
}

const myWritableStream = new MyWritableStream()

myWritableStream.write('hello world ~')
myWritableStream.cork()

myWritableStream.write('hello world 2 ~')
myWritableStream.write('hello world 3 ~')
myWritableStream.write('hello world 4 ~')

myWritableStream.uncork()

