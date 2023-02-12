const path = require('path');

module.exports = {
  entry: './src/main.js',   // 入口
  output: {                 // 出口
    path: path.resolve(__dirname, 'dist'),  // 出口路径文件夹名
    filename: 'bundle.js',                  // 出口文件名字(代码打包进这里)
  },
};