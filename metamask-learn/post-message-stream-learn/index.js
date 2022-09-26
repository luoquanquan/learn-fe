import $ from 'jquery'

let fooPage

$('#btn-open-foo').on('click', () => {
    fooPage = window.open('/sub-html/foo.html')
})

$('#btn-hi-via-post-message').on('click', () => {
    if (fooPage) {
        fooPage.postMessage('hi this is Home Page', '*')
    }
})

window.addEventListener('message', ({data}) => {
    console.log(`Current timestamp ${Date.now()} data: `, data)
})
