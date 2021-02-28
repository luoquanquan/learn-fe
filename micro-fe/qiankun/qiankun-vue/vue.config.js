module.exports = {
  devServer: {
    port: 8888,
    headers: {
      'access-control-allow-origin': '*'
    }
  },
  configureWebpack: {
    output: {
      libraryTarget: 'umd',
      library: 'vueApp'
    }
  }
}
