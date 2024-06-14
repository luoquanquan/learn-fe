const CACHE_NAME = 'cache-v2'
const CACHE_LIST = [
    '/',
    '/css/index.css',
    '/js/app.js',
    '/api/getImage'
]

for(let i = 1; i < 9; i++) {
    CACHE_LIST.push(`http://img.blog.niubishanshan.top/${i}.jpeg`)
}

const handleCache = () => caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_LIST))

const handleClearCache = () =>
    caches.keys().then(keys => Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
    ))

const fetchAndSave = request => fetch(request).then(resp => {
    const r = resp.clone()
    caches.open(CACHE_NAME).then(cache => cache.put(request, r))
    return resp
})

self.addEventListener('fetch', e => {

    if (e.request.url.includes('/api')) {
        return e.respondWith(
            fetchAndSave(e.request).catch(err => caches.open(CACHE_NAME).then(cache => cache.match(e.request)))
        )
    }

    return e.respondWith(
        fetch(e.request).catch(err => caches.open(CACHE_NAME).then(cache => cache.match(e.request)))
    )
})

// sw.js 文件更新后的下次刷新进行安装
self.addEventListener('install', e => {
    // 如果前一个 sw 不销毁需要手动 skipWaiting
    console.log(`当前时间 ${Date.now()}: 代码走到了这里 install`)
    e.waitUntil(Promise.all([
        handleCache(),
        skipWaiting()
    ]))
})

// 当前的 sw 激活的时候触发
// 初次加载 sw 文件时会自动触发激活的方法
// install 方法中触发 skipWaiting
// 用户手动点击 skipWaiting 的时候会触发这个方法
// 浏览页面的过程中更新了 sw 文件, 关闭页面再打开新的页面会跳过这个方法直接进入激活状态
self.addEventListener('activate', e => {
    console.log(`当前时间 ${Date.now()}: 代码走到了这里 activate`)
    e.waitUntil(Promise.all([
        handleClearCache(),
        // Clients 接口的  claim() 方法允许一个激活的 service worker 将自己设置为其 scope
        // 内所有clients 的controller . 这会在由此service worker 控制的任何 clients
        // 中触发 navigator.serviceWorker  上的  "controllerchange"  事件.
        // 也就是让当前的 sw 成为主导的 sw
        self.clients.claim()
    ]))
})

