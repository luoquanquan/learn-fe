## loader vs plugins

loader 即加载器: webpack 将一切文件视为模块, 但是其原生只能够解析 js 文件. 如果想要打包其他格式的文件(图片, less 等)就需要使用处理对应文件格式的 loader. loader 的作用是能够让 webpack 具备处理非 js 文件的能力
plugin 也就是插件: plugin 可以拓展 webpack 的功能. 让 webpack 具备更多的灵活性. 在 webpack 运行的声明周期中会广播很多事件, plugins 监听这些事件在合适的时机通过 webpack 提供的 api 作用于 webpack 的编译流程并影响最终编译输出的成果

## webpack 构建流程


