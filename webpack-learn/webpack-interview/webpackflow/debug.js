const webpack = require('webpack')
const config = reuqire('./webpack.config.js')
debugger
const compiler = webpack(config)
const compilerCb = (err, stats) => {
    const statsString = stats.toString()
    console.log(statsString)
}

compiler.run(compilerCb)
