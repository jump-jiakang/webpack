const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/main.js',   // 入口
  output: {                 // 出口
    path: path.resolve(__dirname, 'dist'),  // 出口路径文件夹名
    filename: 'bundle.js',                  // 出口文件名字(代码打包进这里)
  },
  plugins: [new HtmlWebpackPlugin({   // plugins 插件配置
    template: './public/index.html'   // 告诉 webpack 使用插件时，使用自己的html文件模板生成 dist/html 文件
  })]
};