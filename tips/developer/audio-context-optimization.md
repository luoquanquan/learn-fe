# AudioContext 使用和优化

## 前言

由于不可描述的原因在年初我加入了一个新团队. 程序猿的快乐莫过于入职开发新项目, 即没有**前人代码**的束缚的同时又提供了**与项目共同进步**的契机. 本文作为开发笔记行文方式较为轻松. 旨在记录探索开发中遇到的各种技术问题和解决方案, 同时感谢在此过程中给予帮助的多位同学 ~

## 需求背景

作为一款主打语音弹幕的产品我们的特色就是语音弹幕 & 合唱. h5 承担的分享落地页要做的就是完美还原客户端效果的同时能够引起用户对于产品的兴趣进而达到拉新的效果. 因此, 分享页不再是一张切图点哪儿都引导下载的 little case ...

总体来说就是

1. 背景为原作者唱歌(或导入)的一段视频
2. 消费用户播放到自己喜欢的段落时可以跟唱弹幕
3. 弹幕提交后若被原作者 `pick` 则再次播放作品能够在视频上方展示弹幕动画同时播放弹幕音频
4. 前端仅需实现播放分享作品时**实时**播放弹幕音频并展示弹幕动画

需求文档就是这些. 至于实现的细节技术同学研究下吧 ~

## 技术调研

由于消费者提交弹幕和原作者 `pick` 弹幕的动作均为动态化, 不适合服务器直接把弹幕合入原视频的方案(动态创建视频会浪费大量服务资源). 所以这个功能的主要开发工作就由前端来完成啦 ~

简单分析需求, 落地到前端其实就两个重点:
1. 播放一个背景视频 - video
2. 播放一堆音频弹幕 - audio
3. 弹幕划过动画 - css3

万事俱备, 开始采坑 ~

## 采坑之旅

后端返回的数据中包含了每条弹幕相对于当前视频作品的开始时间. 我们只需要自动播放 `video` 并监听其 `timeupdate` 事件获取播放时间并以此控制弹幕 `子弹元素` 在屏幕区域的滑动位置. 同时创建 `audio` 标签播放弹幕音频看上去似乎非常简单.

![](http://handle-note-img.niubishanshan.top/2021-11-10-10-16-23.png)

### 问题一: 背景视频无法自动播放

按照最初的构想, 只要获取 `video` 标签并执行 `video.play()` 启动背景视频的播放. 可是控制台红艳艳的报错出乎意料 emmmm ~

![](http://handle-note-img.niubishanshan.top/2021-11-11-11-59-10.png)

为了能 hack 视频的自动播放, 经过一番搜索和测试. 我发现以下方案均不好用:

1. 通过 js 调用play()
2. 设置 video 属性 autoplay
3. 通过 js 来触发click事件
4. 使用插件 videojs
5. 通过 js 调用load()然后再调用play();
6. 设置 video 属性 webkit-playsinline="true"
7. touchstart 监听
8. stalled 事件处理
9. canplaythrogh 事件处理
10. readyState 大于 2 的处理
11. DOMContentLoaded 监听

好在搜索的过程中发现了 [Autoplay policy in Chrome](https://developer.chrome.com/blog/autoplay/#webaudio). 文档中指明自从 `Chrome 66` 以来谷歌浏览器便对自动播放的音频和视频进行了限制. 没有用户的交互就想实现视频自动播放怕是实现不了, 只好找产品经理把体验降级为用户点击全局蒙层再启动视频播放. 问题搞定 ~

<img width="240" src="http://handle-note-img.niubishanshan.top/2021-11-10-11-42-53.png">

### 问题二: 视频跑到顶层挡住弹幕

搞定了播放的问题开始整弹幕布局, 参照 App 的设计图, 布局方案如下:

<img width="240" src="http://handle-note-img.niubishanshan.top/2021-11-10-11-48-48.png" />

弹幕区域置于视频区域上方(z-index)布局完美, 可惜用户点击播放后视频直接起飞. 具体表现为:
- iOS: 调用系统播放器脱离网页播放
- 安卓: 视频在网页内, 但是层级上升为最高, 盖住了弹幕区域

![](http://handle-note-img.niubishanshan.top/2021-11-13-17-30-04.png)

好在有前人写下了[这篇文章](https://segmentfault.com/a/1190000009395289). 加上三个属性终于把视频结结实实固定在网页上了.

属性 | 作用
--- | ---
playsinline | iOS 中支持 h5 页内播放(适用于 微信 QQ QQ浏览器 Safari浏览器)
webkit-playsinline | 同👆🏻, 兼容 iOS 10 添加浏览器前缀
x5-video-player-type="h5" | 安卓 x5 内核启动 h5 业内播放 video(适用于 微信 QQ QQ浏览器)

如果想要强力控制还可以使用[这个库](https://github.com/fregante/iphone-inline-video).

由于安卓还不支持 `playsinline`, 所以安卓系统下目前只有腾讯系 `x5` 内核 webview 可以实现 `video` 标签的页内播放. 其他浏览器目前没有找到相应的解决方案. 如果有大佬知道的话还请赐教 ~

### 问题三: iOS 系统弹幕没有声音

搞定了视频播放, 实现了弹幕展示, 终于可以开始整弹幕音频播放了. 理论上还是非常简单: 监听 `video` 标签 `timeupdate` 事件获取底版视频的播放时间. 遍历弹幕找到当前需要播放的弹幕后创建 `audio` 标签并播放. 然而事与愿违, 安卓设备自动播放弹幕没有问题, 但是到了 iOS 上直接 GG. `audio` 没有成功播放出来 😭, `vConsole` 捕捉到的报错:

```json
{
  "name": "NotAllowedError",
  "message": "The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.",
  "stack": "play@[native code]\nglobal code"
}
```

很明显, 动态创建的 `audio` 标签也不能自动播放. 动辄上百的弹幕引导用户疯狂的点击? 我没去找产品, 因为这个事儿他应该不会妥协 😭...

面对问题时, 还是习惯性百度了一下看看有没有前人已经遇到过. 这样往往会事半功倍: 如果有, 那就躺在巨人的肩膀上继续牛逼着. 如果没有, 那么这就是一个机会. 经过一通搜索了解到 [AudioContext](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext). 这个 `Api` 可以把音频文件处理成 `audioBuffer`, 事情开始有了眉目.

如果把所有的弹幕都转成 `audioBuffer` 然后再用 [audio-buffer-utils](https://github.com/audiojs/audio-buffer-utils) 往一块拧巴拧巴. 一百多个弹幕就会变成一个音频文件, 播放的问题迎刃而解 🤔

具体操作步骤如下:

1. 首先创建一个和作品时长相等的 `audioBuffer` 作为容器
2. 逐个下载所有弹幕转 `audioBuffer` 并 `merge` 到上述容器中
3. 用户点击播放键同时播放视频和装满弹幕的容器实现一个点击事件同时播放视频和音频

合并音频的原理如下图:
<img src="http://handle-note-img.niubishanshan.top/merge-barrage.gif" />

audioBuffer 播放的最简伪代码如下:
```js
// bgBuffer 就是我们创建的盛放弹幕音频 buffer 的容器
const bgBuffer = 1
const sourceNode = audioCtx.createBufferSource();
sourceNode.buffer = bgBuffer;
sourceNode.connect(audioCtx.destination);
sourceNode.start(0);
```

PS: 如果把一个音频链接添加到 `audio` 标签直接播放的话可以正常播放. 但是如果想要获取音频中的数据转 `audioBuffer` 时就会触发浏览器的[同源策略](https://baike.baidu.com/item/%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5/3927875)说白了就是跨域了. 对于这个老生常谈的问题直接找cdn老铁加个[CORS 跨域](https://juejin.cn/post/6844903733487206413)域名白名单即可.

### 问题四: 弹幕数量增多后, 移动端报错

解决了跨域问题后成功将所有弹幕音频文件合并成一个 `audioBuffer` 实例. 依托于之前的全局蒙层点击事件启动播放解决了播放的弹幕播放的问题. 使用我自己那仅有 3 条弹幕的作品测试页没有任何问题. 万事俱备只差测试, 一只脚已经站在了成功的门槛上了 ✌🏻

原本以为提测就是走个过场, 没想到这测试老哥还真是有货. 提测没十分钟 `bug` 就来了:

**冷门作品弹幕可以正常播放, 但是热门作品弹幕没有声音**

WTF 还有这么抽象的问题😭, 毕竟哥还没有转正这不是吓唬哥嘛. 拿来一个**热门**视频感受了一把. 还真没有声音 😓.

`vConsole` 打开调试一看, 又是明晃晃的报错.

```log
Failed to construct 'AudioContext': The number of hardware contexts provided (6) is greater than or equal to the maximum bound (6)
```

这是明摆着, 浏览器限制了每个页面只能创建 6 个 `AudioContext` 实例, 超过以后再次创建便会直接报错. 理论依据在[这里](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext#google_chrome), 但是我总不能限制作品的弹幕不能超过 6 个呀...

好在我们项目中用到了[audio-buffer-utils](https://github.com/audiojs/audio-buffer-utils)库, 既然是专业处理 `audio-buffer` 的库说不定有啥骚操作. 迫不及待打开[github](https://github.com/audiojs/audio-buffer-utils)项目主文件, 分分钟定位到 `AudioContext` 定义的部分, 原来可以创建一个实例挂在命名空间下供所有的业务功能使用, 再次感到智商被秀到...

![](http://handle-note-img.niubishanshan.top/2021-11-13-14-58-59.png)

`AudioContext` 实例只需要创建一次后续复用即可. 那么问题就变得简单起来, 用一个实例处理所有弹幕替换之前的每条弹幕都创建一次实例, 问题解决 ~

PS: 这里有一个隐藏的坑. 通过 `ajax` 下载音频弹幕文件会占用内存, `AudioContext.prototype.decodeAudioData` 处理音频文件也会占用内存. 因此每个弹幕的处理都会占用自身大小的两倍的内存. 如果异步下载并处理就可能会导致页面 `OOM` 只能同步线性处理. 即下载一条弹幕并处理完成在下载下一个...

PS2: 还有可能会出现同一条弹幕线下正常播放但是上线后不行了. 这个是因为跨域请求 cdn 资源时 cdn 节点会缓存 `origin` 作为 `Access-Control-Allow-Origin` 的响应头字段. 这样的话如果线下已经请求过该资源, 上线后访问相同内容时会直接返回了缓存的本地地址作为响应头. 浏览器判断为不允许跨域了具体过程如下:

![](http://handle-note-img.niubishanshan.top/2021-11-13-16-11-19.png)

解决方案为线下环境调试时在音频链接后加一个固定参数作为标记. 实际上 cdn 会认为两次请求的不是相同的内容:
```bash
# 音频 cdn
http://example.com/audio.m4a
# 线上直接访问
http://example.com/audio.m4a
# 线下添加一个 _=local
http://example.com/audio.m4a?_=local
```

### 问题五: 弹幕 / 底版无法对齐

当我搞定了测试和设计, 终于长舒了一口气. 这下子哥转正应该没啥问题了吧. 当然能看到这里的老铁都知道这里肯定会有转折.

产品经理: 圈圈, 这个弹幕声音和底版似乎没有对齐呀. 你看这句至少差了 40ms...

此时我内心是想忽悠他一下的. 在我们 js 世界里 16ms 的误差都没法记录, 这个小间隔用户听不出来的(我是真的听不出来)

组里老鸟伟哥: 还是研究研究吧, 你忽悠不了他的. 他之前是专门搞音乐的, 能听出来...

我哐哧哐哧又改了一通

```javascript
// 伪代码
const playBtn = document.getElementById('btn-id');
playBtn.onClick = () => {
    videoEle.play(); audioContext.play();
}
```

哼哼哼, 甚至把两个播放写到了一行. 产品经理你等着夸我吧 😏.

后来的事情就是我开始了各种探索, 启动播放音频从延迟 10ms, 20ms, 30ms... 直到 100ms 全都不好使. 分析原因发现:

- 启动视频播放和创建 `AudioContext` 都需要时间
- 不同的硬件设备(手机)所需的时间不同
- 结论是硬件问题无法解决

正当我嘀咕着组织语言想找领导陈述一下这件事情的不可行性的时候, 隔壁工位的后端老鸟猛哥给听到了. 他说: 想当年我做爬虫的时候, 发现有些视频网站的音频部分和视频部分是两个链接. 必须把两个链接都爬下来才行...

Duang ~, 一言惊醒梦中人如果我们也把背景视频内的音频轨剥离出来合并到『iOS 系统弹幕没有声音』步骤中创建的 `audioBuffer` 中然后在把各种弹幕按照其出现的时间从**物理**上实现对齐. 简直完美 ~

<img src="http://handle-note-img.niubishanshan.top/merge-bg-barrage.gif" />

### 问题六: loading 时间过长, 用户等待时间久

经过了旷日持久的捯饬功能终于是达标了, 弹幕动画正常展示音频也是完美对齐. 但是被我忽略的问题是所有弹幕下载的环节前置以后带来了 `loading` 时间非常长. 从首帧渲染到播放按钮可点击等待时长达到了 8 秒. 测试说忍不了, 我说我也忍不了 😭. 难道刚刚探索的完美解决方案又要被推翻嘛...

经历了百度谷歌一把梭以后, 我决定找大佬聊聊继续优化的*不可行性*以及需求些指点. 在说明了来意当前的实现方案后领导直接反问: 你这个能不能像播放视频一样流式处理呢. 就是用户边播边下载边处理?

经过这波提醒我再次恍然大悟, `AudioBuffer` 继承自 `Object` 那肯定也是引用类型的数据. 这样我可以先外漏播放的按钮允许播放. 同时异步下载弹幕 `merge` 进来. 这样优化后用户等待时间从 8 秒压缩到了 2 秒.

### 问题七: 音画无法对齐

到目前为止这个体验真是自己看了都舒服, 自信满满的分享链接到群里诚邀体验静待: 前端, 牛逼了...

然而等到的是: 你看这个声音唱了好几句了视频画面还没有开口. 音画不同步了...

经排查发现, 移动端为了节约流量不会预加载视频资源(及时设置了 preload 属性)只有用户点击了播放之后视频才会开始加载. 然而提取的音频都是内存里现成的资源触发播放就会跑起来. 好在根据『背景视频无法自动播放』步骤中得知, 静音的视频可以启动自动播放. 于是只需要页面加载后自动播放视频一帧即可:

```js
// 伪代码, 这里需要注意 video 的 play 方法是异步的.
// 只有当返回的 Promise 有了结果 (成功 or 失败) 才能继续
const videoEle = docuement.getElementById('video')
videoEle.setAttribute('mute', 'mute')
const playPromise = videoEle.play()
const pauseVideo = () => {
    videoEle.pase()
}
playPromise.then(pauseVideo).catch(pauseVideo)
```

这样就能实现视频首播一帧待用户点击播放时已经加载可立即播放音视频自然对齐

### 问题八: 数据结构真的有用

> 在相当长一段时间, 我对于无脑刷 `LeetCode` 的前端是非常不屑的. 因为真的不怎么用得到, 可惜浅薄的认识让我体验了一把古今真理: 书到用时方恨少...

事情是这样的, 由于弹幕音频和底版音频合并后同时播放. 当同一个时刻出现多条弹幕重叠的时候底版音频就会被覆盖直至被淹没. 好在客户端已经踩过这个坑, 解决方案为: 播放时候判断当前时间内有几条弹幕, 根据弹幕数设置弹幕的音量依次递减. 如下:

弹幕数 | 音量系数
--- | ---
1 | 1
2 | 0.8
3 | 0.6
4 | 0.5

具体的操作方案为:
1. 把当前作品时长对应的时间轴以 `50ms` 每份平均分成若干小份
2. 依次判断每个小份上边同时出现的弹幕数量, 并依据以上表格设置当前区间声音系数

逻辑模型如图:
![](http://handle-note-img.niubishanshan.top/2021-11-13-14-40-51.png)

图中 ABCD... 小格子为时间区间. 上方的小数为当前区间的音量系数, 下方的弹幕区域为可能出现的弹幕模型. 例如格子 A 时间段内有一个弹幕, 所以混音音量系数为 1. 同理, 格子 B 音量系数为 0.8 以此类推...

按照这个逻辑可以编辑伪代码如下:
```js
// 首先, 构造一个音频字典
const volumeArr = [
    [0, 50, 1],
    [51, 100, 0.8],
    // 以此类推
]

// 混合音频时根据弹幕出现的时间查出其音量系数
const findVolume = (barrage, volumeArr) => {
    const {start, end} = barrage;
    for (let idx = 0, len = volumeArr.length; idx < len; idx++) {
        if (/* 当前弹幕命中了时间区间 */) {
            return volumeArr[idx][2]
        }
    }
}
```

一个简单的顺序查找, 逻辑上没啥问题. 部署, 验收, 没啥意外可以下个早班 ~

事实是再次被打脸, 产品经理说: 加上混音之后第一遍听部分弹幕没有声音, 第二遍正常?

我: ......, 不应该呀?

出于对自己和代码的自信, 我想逻辑肯定不会出问题, 代码也绝对没有 bug. 之所以没声音可能是因为流式处理还没有到当前弹幕, 真是不看不知道一看吓一跳.

![](http://handle-note-img.niubishanshan.top/2021-11-13-15-44-15.png)

如图, 最后一列处理时长就是混音的处理时长. 一条弹幕就需要 `1s` 时间处理. 指定后边的弹幕没有声音呀, 根本还没有处理到它 😂.

难受的是我知道需要性能优化, 但是不知道怎么优化...

搞不定了, 现在开始刷算法抱佛脚好像有点来不及. 于是不得不扯着脸找领导(算法大佬) review 代码求指导. 大佬一句话直接让我再跪: 音量系数的查找, 直接改成 `start / 50` 在取整复杂度就变 O1 了. 你去试试...

![](http://handle-note-img.niubishanshan.top/2021-11-13-16-04-43.png)

解决一个问题很容易, 知道怎么解决一个问题很难. 根据领导的方案又是哐哧哐哧又是一顿整. 再看下处理时间:

![](http://handle-note-img.niubishanshan.top/2021-11-13-16-21-11.png)

所有弹幕的混音时长都限制了 200ms 以内, 产品经理体验也木有问题. 到此为止技术问题全部解决完成 ~

### 问题九: iOS 静音模式下无法播放外音

用户体验的最后一个问题仍然是由产品经理来完成: 如果苹果手机打开了静音模式(左上角的小开关)只能播放视频音频没有声音...

经过旷日持久的搜索, 我并没有发现有很好的解决办法. 由于 `AudioContext` 播放的音频属于背景音乐静音模式必然没有声音. 好在经过了一番游说产品经理再次选择了妥协. 可是作为一个 iPhone 几乎无时无刻不处于静音模式.

怀着对产品经理的愧疚和对于解决问题的执念, 某次刷 github 想要搞点新东西的时候突然发现个神器[unmute](https://github.com/swevans/unmute)专门用于解决背景音乐静音模式下无法播放的问题. 抓紧 <key>C/V</key> 了一波还真的好使.

```js
export default context => {
    const poorManHuffman = (c, a) => {
        let e = a;
        for (; c > 1; c--) {
            e += a;
        }
        return e;
    };

    const audioTag = document.createElement('audio');
    audioTag.setAttribute('x-webkit-airplay', 'deny');
    audioTag.controls = false;
    audioTag.disableRemotePlayback = true;
    audioTag.preload = "auto";
    audioTag.src = "data:audio/mpeg;base64,//uQx" + poorManHuffman(23, "A") + "WGluZwAAAA8AAAACAAACcQCA" + poorManHuffman(16, "gICA") + poorManHuffman(66, "/") + "8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkI" + poorManHuffman(320, "A") + "//sQxAADgnABGiAAQBCqgCRMAAgEAH" + poorManHuffman(15, "/") + "7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq" + poorManHuffman(18, "/") + "9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAw" + poorManHuffman(97, "V") + "Q==";

    audioTag.loop = true;
    audioTag.load();

    context.audioTag = audioTag;
};
```

既然背景音乐 `AudioContext` 会被静音模式限制, 如果加上一个 audio 标签创建的前景音之后静音模式便失去效果. 于是可以在初始化 `AudioContext` 同时创建一个 audio 标签, 一直循环播放一段空白的 mp3 音乐来占用手机外音喇叭. 此时背景音乐就可以 "沾光" 播放出来了, 不得不含泪揉了揉自己的膝盖.

## 结语

一个看似简单的功能. 从起步困难到中间克服了资源跨域, 音视频策略限制, 对齐问题, 内存溢出问题, CSS 3 动画性能等等一系列疑难杂症. 终于实现了和 `App` 端近乎一致的效果...

## 参考资料

- [OOM](https://baike.baidu.com/item/%E5%86%85%E5%AD%98%E6%BA%A2%E5%87%BA/1430777)
- [video](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)
- [unmute](https://github.com/swevans/unmute)
- [同源策略](https://baike.baidu.com/item/%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5/3927875)
- [问题的追查](https://fex.baidu.com/blog/2015/01/chrome-stalled-problem-resolving-process/)
- [CORS 跨域](https://juejin.cn/post/6844903733487206413)
- [createBuffer](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createBuffer)
- [AudioContext](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext)
- [AudioContext()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext#google_chrome)
- [decodeAudioData](https://developer.mozilla.org/zh-CN/docs/Web/API/BaseAudioContext/decodeAudioData)
- [audio-buffer-utils](https://github.com/audiojs/audio-buffer-utils)
- [iphone-inline-video](https://github.com/fregante/iphone-inline-video)
- [音频混音的算法实现](https://blog.csdn.net/guoke312/article/details/72901882)
- [Autoplay policy in Chrome](https://developer.chrome.com/blog/autoplay/#webaudio)
- [视频H5 video标签最佳实践](https://segmentfault.com/a/1190000009395289)
- [Android微信内网页音频自动播放能力调整](https://developers.weixin.qq.com/community/develop/doc/000e640d77cfa001132a6cb8456c01)
- [html5 video 在微信浏览器视频不能自动播放！](https://blog.csdn.net/qq_37949737/article/details/105222597)
