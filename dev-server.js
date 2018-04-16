const serve = require('webpack-serve')
const config = require('./webpack.config.js')

serve({
    config,
    port: process.env.PORT || 8080,
    clipboard: false,
    open: true,
    dev: {
        stats: {
            assets: false,
            hash: false,
            modules: false,
            errors: true,
            warnings: true,
            chunks: false,
            chunkModules: false,
            chunkOrigins: false,
            children: false
        }
    }
})
