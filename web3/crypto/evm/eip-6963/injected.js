console.log(`Current log: injected ${Date.now()}`)

const info = {
    uuid: 'd44e79b3-199d-4eb2-9708-1b14a3b18b1d',
    name: 'EIP 6963',
    // 96px * 96px
    icon: 'https://fe-note.niubishanshan.top/images/favicon.png',
    rdns: 'io.github.luoquanquan'
}

const announce6963Provider = () => {
    window.dispatchEvent(new CustomEvent('eip6963:announceProvider', {
        detail: Object.freeze({ info, provider: {} })
    }))
}

announce6963Provider()
window.addEventListener('eip6963:requestProvider', () => {
    announce6963Provider()
})
