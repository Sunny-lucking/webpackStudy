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


import "./index.css"
