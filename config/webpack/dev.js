const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const SERVER_PORT = process.env.PORT || 8010
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development'
const API_VER = process.env.API_VER ? process.env.API_VER.toLowerCase() : 'development'

const config = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.jsx', '.js', '.scss', '.css'],
        modules: [path.resolve('src'), path.resolve('node_modules')]
    },
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://0.0.0.0:${SERVER_PORT}`,
        'webpack/hot/only-dev-server',
        path.resolve('./src/client')
    ],
    output: {
        publicPath: '/',
        filename: 'js/[name].js',
        pathinfo: true
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true
                        }
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
                ]
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
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
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV),
                'API_VER': JSON.stringify(API_VER)
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/static/index.html'
        })
    ]
}

module.exports = config
