import $ from 'jquery'

$('#btn-send').on('click', () => {
    window.opener.postMessage('hi this is Foo Page')
})

window.addEventListener('message', ({data}) => {
    console.log(`Current timestamp ${Date.now()} data: `, data)
})
