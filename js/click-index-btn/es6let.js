;(() => {
    for(let i = 0, len = btns.length; i < len; i++) {
        btns[i].onclick = () => {
            console.log(`当前时间 ${Date.now()}: debug 的数据是 i: `, i)
        }
    }
})()
