((window, undefined) => {
    window.splitFile = file => {
        const ret = []
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
        const chunkSize = 1024 * 1024
        const chunks = Math.ceil(file.size / chunkSize)
        let currentChunk = 0
        let start = 0
        let end = 0

        while (currentChunk < chunks) {
            start = currentChunk * chunkSize
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
            ret.push(blobSlice.call(file, start, end))
            currentChunk++
        }

        return ret

    }
    window.md5File = file => new Promise((resolve, reject) => {
            const fileChunks = splitFile(file)
            const spark = new SparkMD5.ArrayBuffer()
            const fileReader = new FileReader()

        fileReader.onload = function (e) {
            spark.append(e.target.result)
            const nextChunk = fileChunks.shift()
            if (nextChunk) {
                loadNext(nextChunk)
            } else {
                resolve(spark.end())
            }
        }

        fileReader.onerror = reject

        const loadNext = (chunk) => {
            fileReader.readAsArrayBuffer(chunk)
        }

        loadNext(fileChunks.shift())
    })
})(window)
