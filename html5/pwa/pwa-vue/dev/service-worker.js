// 初始化缓存名称
workbox.core.setCacheNameDetails({prefix: "pwa-vue"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 缓存列表, 可以配置自定义的缓存
self.__precacheManifest = [].concat(self.__precacheManifest || []);

// 执行缓存操作
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
    o => o.url.href.includes('/pwa-vue-demo'),
    workbox.strategies.staleWhileRevalidate()
)

console.log('自定义的缓存配置文件~')