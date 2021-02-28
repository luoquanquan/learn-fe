module.exports = {
    webpack(config) {
        config.output.libraryTarget = 'umd'
        config.output.library = 'reactApp'
        config.output.publicPath = '//localhost:9999'
        return config
    },
    devServer(configFn, allowedHost) {
        return (proxy) => {
            const config = configFn(proxy, allowedHost)
            config.headers = {
                'access-control-allow-origin': '*'
            }
            return config
        }
    }
}
