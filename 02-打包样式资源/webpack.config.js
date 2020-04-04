const {resolve} = require('path');

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
        ]


    },

    // 模式
    mode:'development'
}
