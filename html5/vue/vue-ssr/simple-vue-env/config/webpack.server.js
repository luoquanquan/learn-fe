const merge = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const externals = require('webpack-node-externals')

module.exports = merge(base, {
    target: 'node',
    entry: {
        server: path.resolve(__dirname, '../server-entry.js')
    },
    output: {
        libraryTarget: 'commonjs2'
    },
    externals: [externals()],
    plugins: [
        new VueSSRServerPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.ssr.html'),
            filename: 'index.ssr.html',
            excludeChunks: ['server']
        })
    ]
})