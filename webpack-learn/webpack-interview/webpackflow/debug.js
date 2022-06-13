const webpack = require('webpack')
const config = require('./webpack.config.js')
debugger
// 从这一步进入函数就可以感受下参数准备环节的 webpack 的工作
const compiler = webpack(config)
const compilerCb = (err, stats) => {
    const statsString = stats.toString()
    console.log(statsString)
}

// 从这个环节进入函数就可以感受下编译环节的 webpack 的工作
compiler.run(compilerCb)
