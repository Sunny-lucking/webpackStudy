@[TOC](这里写目录标题)
## 1、webpack 初体验
#### 全局安装webpack

```c
npm i webpack webpack-cli -g
```

```js
/*
    index.js:webpack 入口起点文件
    1.运行指令：
      开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
      webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
      生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
      webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
    2.结论：
      1.webpack能处理js/json资源，不能处理css/img等其他资源
      2.生产环境比开发环境多压缩一个js文件
 */
function add(x,y) {
    return x+y;
}
add(1,2)


```
执行打包 这个文件，打包成功
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404171531588.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk2NDE0OA==,size_16,color_FFFFFF,t_70)

总结：    index.js:webpack 入口起点文件

> 1.运行指令：
>      开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
>      webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
>      生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
>      webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
>    2.结论：
>      1.webpack能处理js/json资源，不能处理css/img等其他资源
>      2.生产环境比开发环境多压缩一个js文件

## 2.打包样式资源
#### 创建webpack.config.js文件（配置文件）
use 数组中顺序执行：从右到左，从上到下

```js
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

```
## 3.打包html资源
#### webpack.config.js文件（配置文件）
plugin 1.下载，2.引入，3.使用

```js
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
    plugins:[
        new HtmlWebpackPlugin({
            // 复制一个html文件，并引入
            template:'./src/index.html'
        })
    ],
    // 模式
    mode:'development'
}


```

## 4.打包图片资源
#### webpack.config.js文件（配置文件）
需要url-loader 和html-loader
```js
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

```
## 5.打包其他资源
#### webpack.config.js文件（配置文件）
主要用到 file-loader
```js
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
            },
            {
                // 打包其他资源
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader'
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

```
## 6.devServer

    // 自动打包运行
    // 指令：npx webpack-dev-server

#### webpack.config.js文件（配置文件）

```js
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
                test:/\.css/,
                //使用哪些loader进行处理
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
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
        })
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

```

## 7.提取css成单独文件
用到mini-css-extract-plugin插件
并且将style-loader 改为 MiniCssExtractPlugin.loader,
#### webpack.config.js文件（配置文件）

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
        new MiniCssExtractPlugin()
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

```

## 8.css兼容

#### package.json增加

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404205619968.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk2NDE0OA==,size_16,color_FFFFFF,t_70)

#### webpack.config.js文件（配置文件）

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
        new MiniCssExtractPlugin()
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

```
## 9.css压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

```js
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

```
