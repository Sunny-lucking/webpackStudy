const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
                test:/\.less/,
                //使用哪些loader进行处理
                use:[
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                //匹配哪些文件
                test:/\.css/,
                //使用哪些loader进行处理
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                // 处理图片资源,但是处理不了html中img的路径问题
                test: /\.(jpg|png|gif)$/,
                loader:'url-loader',
                options:{
                    limit: 8* 1024,
                    // 关闭es6
                    esModule:false,
                    name:'[hash:10].[ext]' //不重复名字
                },
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
        })
    ],
    // 模式
    mode:'development'
}
