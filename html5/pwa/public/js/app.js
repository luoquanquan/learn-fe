class Page {
    constructor() {
        this.box = document.querySelector('.box')
        this.imgList = []
    }

    init() {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '/api/getImage')
        xhr.responseType = 'json'
        xhr.onload = () => {
            this.imgList = xhr.response
            this.handleRender()
        }
        xhr.send()
    }
    handleRender() {
        const {imgList} = this
        let str = ''
        imgList.forEach(img => {
            str += `<img src="${img}" />`
        })
        this.box.innerHTML = str
    }
}

const page = new Page()
page.init()