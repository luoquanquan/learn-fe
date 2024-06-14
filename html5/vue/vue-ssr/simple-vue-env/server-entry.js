import createApp from './src/app'

export default context => new Promise(resolve => {
    const { app, router, store } = createApp()
    const { url } = context
    // 路由跳转, 如果服务端渲染用户直接访问 /bar 路径, 还是返回 index.html
    // 但是这里做一个跳转就能保证通过服务端渲染也能给到用户正确的页面了
    router.push(url)

    router.onReady(() => {
        const matchedComponents = router.getMatchedComponents()
        Promise.all(matchedComponents.map(component => {
            if (component.asyncData) {
                return component.asyncData(store)
            }
        })).then(() => {
            // 通过这一句会给生成的 html 中加上 window.__INITIAL_STATE__={"name":"quanquan"} 这一句
            context.state = store.state
            context.meta = app.$meta()
            resolve(app)
        })
    })
})


