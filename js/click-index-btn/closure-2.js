;(() => {
    [...btns].forEach((btn, idx) => {
        btn.onclick = ((idx) => () => {
            console.log(`当前时间 ${Date.now()}: debug 的数据是 idx: `, idx)
        })(idx)
    })
})();
