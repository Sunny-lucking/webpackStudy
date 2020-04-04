const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 设置nodejs环境变量
// process.env.NODE_ENV = "development"
module.exports = {
    // 入口
    entry:'./src/index.js',
    // 输出
    output:{
        // 输出文件名
        filename:'built.js',
        //输出路径
        path:resolve(__dirname,'build')
    },
    // loader的配置
    module:{
        rules:[
            {
                //匹配哪些文件
                test:/\.css/,
                //使用哪些loader进行处理
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options:{
                            ident:'postcss',
                            plugins:()=>{
                                require('postcss-preset-env')()
                            }
                        }
                    }
                ]
            },
            {
                // 处理html中的img
                test: /\.html$/,
                loader:'html-loader'
            }
        ]


    },
    plugins:[
        new HtmlWebpackPlugin({
            // 复制一个html文件，并引入
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsWebpackPlugin()
    ],

    // 自动打包运行
    // 指令：npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname,'build'),
        compress:true,
        port:3000,
        open:true
    },
    // 模式
    mode:'development'
}
