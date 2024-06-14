;(() => {
    [...btns].forEach((btn, idx) => {
        ((idx) => {
            btn.onclick = function() {
                console.log(`当前时间 ${Date.now()}: debug 的数据是 idx: `, idx)
            }
        })(idx)
    })
})();
