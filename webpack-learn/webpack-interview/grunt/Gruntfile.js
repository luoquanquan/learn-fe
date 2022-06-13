module.exports = grunt => {
    grunt.loadNpmTasks('grunt-babel')

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    "dist/bundle.js": './index.js'
                }
            }
        }
    })

    grunt.registerTask('default', ['babel'])
}
