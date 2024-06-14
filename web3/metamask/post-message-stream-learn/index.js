import $ from 'jquery'
import { WindowPostMessageStream } from '@metamask/post-message-stream'

let fooPage
let barPage

const registerBarStream = () => {
    const indexStream = new WindowPostMessageStream({
        name: 'indexStream',
        target: 'barStream',
        targetWindow: barPage
    })

    indexStream.on('data', data => {
        console.log(`${Date.now()} receive data via stream: `, data)
    })

    $('#btn-hi-via-stream').on('click', () => {
        indexStream.write('hi this is Home via stream')
    })
}

$('#btn-open-foo').on('click', () => {
    fooPage = window.open('/sub-html/foo.html')
})

$('#btn-open-bar').on('click', () => {
    barPage = window.open('/sub-html/bar.html')
    registerBarStream()
})

$('#btn-hi-via-post-message').on('click', () => {
    if (fooPage) {
        fooPage.postMessage('hi this is Home Page', '*')
    }
})

// window.addEventListener('message', ({data}) => {
//     console.log(`Current timestamp ${Date.now()} data: `, data)
// })
