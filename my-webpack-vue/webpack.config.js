// 模块加载 打包 webpack
//打包 js 
//模块打包  css/scss/less  png/svg/iconfont    app.vue .vue
const webpack = require("webpack");
const path = require("path");
const openBrowserPlugin = require('open-browser-webpack-plugin'); // 打开浏览器 
const htmlWebpackPlugin = require("html-webpack-plugin"); // 操作 index.html 
const extractTextWebpackPlugin = require("extract-text-webpack-plugin"); // 抽离样式  css 和  js 分开 

module.exports = {
    entry: ["./src/main.js"], //入口文件
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[hash:8].js", // [name] = main  hash:8 以md5加密 生成一个8长度的随机字符串  阻止缓存
        publicPath: "" //公共路径  index.html  
    },
    // devtool: "source-map", //方便调试  查看打包之前的文件
    resolve: {
        alias: {
            "vue": "vue/dist/vue.js"
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(png|gif|svg|jpg|woff|eot|ttf|woff2)\??.*$/,
                use: ["url-loader?limit=8192&name=assets/[hash:8].[name].[ext]"]
            },
            {
                test: /\.(css|scss)$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: "style-loader", //转为 Node 风格代码
                    use: [
                        'css-loader', //变成commonJs 模块
                        {
                            loader: "postcss-loader", //  转换 css 代码风格
                            options: {
                                plugins: function () {
                                    return [
                                        require("cssgrace"), //美化css代码
                                        require("postcss-px2rem-exclude")({
                                            renUnit: 100,
                                            exclude: /mint-ui/i, //排除mint-ui 不进行rem转换
                                        }), //px转换rem
                                        require("autoprefixer") //自动补全
                                    ]
                                }
                            }
                        },
                        "sass-loader",

                    ]
                })
            }, {
                test: /\.(css|less)$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: "style-loader", //转为 Node 风格代码
                    use: [
                        'css-loader', //变成commonJs 模块
                        {
                            loader: "postcss-loader", //  转换 css 代码风格
                            options: {
                                plugins: function () {
                                    return [
                                        require("cssgrace"), //美化css代码
                                        require("postcss-px2rem-exclude")({
                                            renUnit: 100,
                                            exclude: /mint-ui/i, //排除mint-ui 不进行rem转换
                                        }), //px转换rem
                                        require("autoprefixer") //自动补全
                                    ]
                                }
                            }
                        }, "less-loader"

                    ]
                })
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loader: [{
                            'css': 'style-loader!css-loader'
                        },
                        {
                            'less': 'style-loader!css-loader!;ess-loader'
                        },
                        {
                            'scss': 'style-loader!scss-loader'
                        },


                    ],
                    postcss: function () {
                        return [
                            require('postcss-px2rem-exclude')({
                                remUnit: 100,
                                exclude: /mint-ui/i
                            })
                        ]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"), // base  根据地  开发环境 
        compress: true,
        hot: true,
        inline: true,
        // open:true,
        host: "0.0.0.0",
        port: 7000,
        publicPath: "", // 公共文件路径,
        historyApiFallback: true, // html5 history API
        disableHostCheck: true
    },
    plugins: [
        new openBrowserPlugin({
            url: "http://localhost:7000"
        }),
        new htmlWebpackPlugin({
            template: './src/index.html', //指示 编译文件
            inject: true //  自动注入 js/css

        }),
        new extractTextWebpackPlugin({
            filename: "css/app.[hash:8].css",
            allChunks: true, //全部数据编译
            disable: false, // true 无法抽离样式
        })
    ]
}