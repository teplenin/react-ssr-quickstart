const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'production'
const API_VER = process.env.API_VER ? process.env.API_VER.toLowerCase() : 'production'

const config = {
    mode: 'production',
    devtool: false,
    resolve: {
        extensions: ['.jsx', '.js', '.scss', '.css'],
        modules: [path.resolve('src'), path.resolve('node_modules')]
    },
    entry: {
        main: './src/client',
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'react-router-config',
            'react-router-dom',
            'react-redux',
            'redux',
            'redux-thunk',
            'prop-types',
            'react-helmet',
            'immutable',
            'reselect'
        ]
    },
    output: {
        path: path.resolve('./build/static'),
        publicPath: '/static/',
        filename: 'js/[name].[chunkhash].js'
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
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract([
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: true,
                            minimize: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            importLoaders: true,
                            sourceMap: true
                        }
                    }
                ])
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract([
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: true,
                            minimize: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    }
                ])
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
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV),
                'API_VER': JSON.stringify(API_VER)
            }
        }),
        new ManifestPlugin({
            fileName: '../manifest.json'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new CopyWebpackPlugin([
            { from: 'src/static/misc/', to: '../misc/' }
        ])
    ]
}

module.exports = config
