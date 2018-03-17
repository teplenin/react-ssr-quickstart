'use strict'

const path = require('path')
const fs = require('fs')

const nodeModules = {}

fs.readdirSync('node_modules')
    .filter(x => {
        return ['.bin'].indexOf(x) === -1
    })
    .forEach(mod => {
        nodeModules[mod] = 'commonjs ' + mod
    })

const config = {
    mode: 'production',
    externals: nodeModules,
    target: 'node',
    resolve: {
        extensions: ['.jsx', '.js', '.scss', '.css'],
        modules: [path.resolve('src'), path.resolve('node_modules')]
    },
    entry: './src/server.js',
    output: {
        path: path.resolve('./build/static'),
        filename: '../app.js',
        publicPath: '/static/',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }, {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                loader: 'null-loader'
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /fonts/,
                loader: 'file-loader',
                options: {
                    hash: 'sha512',
                    digest: 'hex',
                    name: 'images/[hash].[ext]'
                }
            }, {
                test: /fonts.*\.woff$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    hash: 'sha512',
                    digest: 'hex',
                    name: 'fonts/[hash].[ext]'
                }
            }, {
                test: /fonts.*\.woff2$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff2',
                    hash: 'sha512',
                    digest: 'hex',
                    name: 'fonts/[hash].[ext]'
                }
            }, {
                test: /fonts.*\.ttf$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/octet-stream',
                    hash: 'sha512',
                    digest: 'hex',
                    name: 'fonts/[hash].[ext]'
                }
            }, {
                test: /fonts.*\.otf$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-otf',
                    hash: 'sha512',
                    digest: 'hex',
                    name: 'fonts/[hash].[ext]'
                }
            }, {
                test: /fonts.*\.eot$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/vnd.ms-fontobject',
                    hash: 'sha512',
                    digest: 'hex',
                    name: 'fonts/[hash].[ext]'
                }
            }, {
                test: /fonts.*\.svg$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'image/svg+xml',
                    hash: 'sha512',
                    digest: 'hex',
                    name: 'fonts/[hash].[ext]'
                }
            }
        ]
    },
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
    }
}

module.exports = config
