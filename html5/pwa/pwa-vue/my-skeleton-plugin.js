class MySkeletonPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('html-webpack-plugin-before-html-generation', function (compilation) {
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('MySkeletonPlugin', function (htmlPluginData, callback) {
                htmlPluginData.html = htmlPluginData.html.replace(/<div id="app"><\/div>/,
                `<div id=app>
                    <div id=Skeleton style="display: none;">
                        <h1>这是首页</h1>(真实情况下回放一张 base64 的图片~)
                    </div>
                    <div id=SkeletonAbout style="display: none;">
                        <h1>这是关于页面</h1>(真实情况下回放一张 base64 的图片~)
                    </div>
                    <script>const { hash } = location
                        let id = 'SkeletonAbout'
                        if (hash === '#/') {
                            id = 'Skeleton'
                        }
                        document.getElementById(id).style.display = 'block'</script>
                </div>`)
                callback()
            })
        });
    }
}

module.exports = MySkeletonPlugin