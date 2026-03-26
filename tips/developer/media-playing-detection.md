# 判断音(视)频是否正在处于播放中

## 背景

在 `whatwg` 的 [官方规范](https://html.spec.whatwg.org/multipage/media.html#playing-the-media-resource) 里定义了媒体标签的 `paused ended played currentTime` 状态，但是对于开发人员更加关注的 `playing` 状态并没有提供。就很尴尬 ⋯⋯

根据官方的规范，如果一个视频的 [readState > 2](https://www.w3school.com.cn/tags/av_prop_readystate.asp) 说明资源加载没有出错。那么此时视频的状态无非两个：播放中或者暂停中⋯⋯

那么如果一个视频同时具备以下状态:
- 资源加载正常 `readyState > 2`
- 当前视频的 `currentTime` 大于 `0`
- 当前视频没有处在暂停状态
- 当前视频没有处在结束状态

那么就可以认为当前的视频处于播放中状态

## 火速实操

```js
// 直接在 HTMLMediaElement 的构造函数原型中添加属性 isPlaying,
// 这样每个视频标签作为实例就有了对应的属性访问器了
Object.defineProperty(HTMLMediaElement.prototype, 'isPlaying', {
    get() {
        return this.readyState > 2 && this.currentTime > 0 && !this.paused && !this.ended;
    }
})
```

```html
<!DOCTYPE html>
<html lang="en">
<body>
    <video src="//handle-note-img.niubishanshan.top/peiqi.mp4"></video>
    <script>
        Object.defineProperty(HTMLMediaElement.prototype, 'isPlaying', {
            get() {
                return this.readyState > 2 && this.currentTime > 0 && !this.paused && !this.ended
            }
        })

        const video = document.querySelector('video')
        console.log(0, video.isPlaying)
        setTimeout(() => {
            console.log(1, video.isPlaying)
            video.play()
            console.log(2, video.isPlaying)
        }, 1e3);

        setTimeout(() => {
            console.log(3, video.isPlaying)
            video.pause()
            console.log(4, video.isPlaying)
            video.play()
        }, 2e3);

        video.addEventListener('ended', () => {
            console.log(5, video.isPlaying)
        })
    </script>
</body>
</html>
```
