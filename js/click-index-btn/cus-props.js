;(() => {
    [...btns].forEach((btn, idx) => {
        btn.idx = idx

        btn.onclick = function() {
            console.log(`当前时间 ${Date.now()}: debug 的数据是 this.idx: `, this.idx)
        }
    })
})();
