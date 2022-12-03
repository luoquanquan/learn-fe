import $ from 'jquery'
import { WindowPostMessageStream } from '@metamask/post-message-stream'

const barStream = new WindowPostMessageStream({
    name: 'barStream',
    target: 'indexStream',
    targetWindow: window.opener
})

barStream.on('data', data => {
    console.log(`${Date.now()} receive data via stream: `, data)
})

$('#btn-send').on('click', () => {
    barStream.write('hi this is Bar Page')
})
