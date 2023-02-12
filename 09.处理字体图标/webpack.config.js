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
  })],
  module: {   // 加载器
    rules: [  // 规则
      {       // 一个具体的规则对象
        test: /\.css$/i,    // 匹配 .css 结尾的文件
        use: ["style-loader", "css-loader"],  // 让 webpack 使用这两个loader处理css文件
        // 从右到左，不能颠倒顺序
        // css-loader：webpack解析css文件-把css代码一起打包到js文件中
        // style-loader：css代码插入到DOM上(style标签)
      },
      {
        test: /\.less/,
        use: ["style-loader","css-loader","less-loader"]
      },
      {   // 图片文件配置
        test: /\.(gif|png|jpg|jpeg)$/,
        type: 'asset' // 匹配上面的文件后，webpack 会把它们当作静态资源打包
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource',  // 所有字体图标文件，都输出到 dist 下
        generator: {    // 生成文件名字 - 定义规则
          filename: 'fonts/[name].[hash:6][ext]'  // ext 会替换成 .eot/.woff
        }
      }
    ],
  },
};