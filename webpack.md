# webpack

## 1. webpack 基本概念

> webpack 本身是 node 的一个第三方模块包，用于打包代码

[webpack官网](https://webpack.docschina.org/)

* 现代 javascript 应用程序的 **静态模块打包器 (module bundler)**

* 为要学的 vue-cli 开发环境做铺垫



webpack 能做什么？

把很多文件打包整合到一起, 缩小项目体积, 提高加载速度(**演示准备好的例子**)

![image-20230210184613231](C:\Users\家康\AppData\Roaming\Typora\typora-user-images\image-20230210184613231.png)

其中功能:

* less/sass -> css

* ES6/7/8 -> ES5

* html/css/js -> 压缩合并



## 2 webpack 的使用步骤

### 2.1 webpack 使用步骤

使用 webpack 需要的准备工作

1. 初始化环境

   ```bash
   yarn init
   ```

2. 安装依赖包

   ```bash
   yarn add webpack webpack-cli -D
   ```

3. 配置 script(自定义命令)

   ```js
   "scripts": {
     "build":"webpack"
   }
   ```



webpack 基础使用

1. 新建目录 src

2. 新建 src/add/add.js - 定义求和和函数导出

   ```js
   export const addFn(a,b) => a + b
   ```

3. 新建 src/index.js 导入使用

   ```js
   import { addFn } from './add/add.js
   console.log(addFn(2,6))
   ```

4. 运行打包命令

   ```bash
   yarn build
   # 或者 npm run build
   ```

> 总结: src并列处, 生成默认dist目录和打包后默认main.js文件





### 2.2 webpack 更新打包

> 目标：以后代码变更, 如何重新打包呢

1. 新建 src/tool/tool.js - 定义导出数组求和方法

   ```js
   export const getArrSum = arr => arr.reduce((sum,val) => { sum+=val }, 0)
   ```

2. src/index.js - 导入使用

   ```js
   import { addFn } from './add/add.js'
   import { getArrSum } from './tool/tool.js'
   
   console.log(addFn(5,2))
   console.log(getArrSum([1,2,3,4,5]))
   ```

3. 重新打包

   ```bash
   yarn bulid
   ```

> 总结1: src下开发环境, dist是打包后, 分别独立
>
> 总结2: 打包后格式压缩, 变量压缩等



## 3. webpack 的配置

### 3.1 webpack 入口和出口

配置文档: https://webpack.docschina.org/concepts/#entry

默认入口：./src/index.js

默认出口：./dist/main.js

webpack 配置 - webpack.config.js(默认)

1. 新建 src 并列出，webpack.config.js

<img src="C:\Users\家康\AppData\Roaming\Typora\typora-user-images\image-20230211183930454.png" alt="image-20230211183930454" style="zoom:80%;" />

2. 填入配置项：

   ```js
   const path = require('path');
   
   module.exports = {
     entry: './src/main.js',   // 入口
     output: {                 // 出口
       path: path.resolve(__dirname, 'dist'),  // 出口路径文件夹名
       filename: 'bundle.js',                  // 出口文件名字(代码打包进这里)
     },
   };
   ```

3. 修改 `package.json` ，自定义打包命令，让 webpack 使用配置文件：

   ```js
   "scripts": {
     "build":"webpack"
   }
   ```



总结：如何修改 webpack 入口和出口

1. 新建 webpack.config.js (webpack 默认配置文件名)
2. 通过 entry 设置入口文件路径
3. 通过 output 对象设置出口路径和文件名



### 3.2 打包流程图

![](C:\Users\家康\OneDrive\图片\project\image-20210421125257233.png)

==重点：所有要打包的资源都要跟入口产生直接/间接的引用关系==

一句话总结 `yarn build` 做了什么：

==执行webpack命令, 找到配置文件, 入口和依赖关系,  打包代码输出到指定位置==



### 3.3 案例-webpack 隔行变色

1. 回顾从0准备环境
   * 初始化包环境

   * 下载依赖包
   * 配置自定义打包命令

2. 下载 jquery，新建 public/index.html

   ```bash
   yarn add jquery
   ```

   <img src="C:\Users\家康\AppData\Roaming\Typora\typora-user-images\image-20230211185713641.png" alt="image-20230211185713641" style="zoom:50%;" />

3. index.html 准备一些li

   ```html
   <div id="myUL">
     <!-- ul>li{我是第$个li}*10 -->
     <ul>
       <li>我是第1个li</li>
       <li>我是第2个li</li>
       <li>我是第3个li</li>
       <li>我是第4个li</li>
       <li>我是第5个li</li>
       <li>我是第6个li</li>
       <li>我是第7个li</li>
       <li>我是第8个li</li>
       <li>我是第9个li</li>
     </ul>
   </div>
   ```

4. 在 src/main.js 引入 jquery并编写隔行变色代码：

   ```js
   // 引入 jquery
   import $ from 'jquery'
   
   // 编写隔行变色代码
   $('#myUL>li:odd').css('color','red')
   $('#myUL>li:even').css('color','green')
   ```

5. 执行打包命令观察效果

   ```bash
   yarn build
   ```

6. 可以在dist下把public/index.html引入过来，在index.html 中手动引入 js

   ```js
   <script src="../dist/bundle.js"></script>
   ```

> 总结: 前端工程化模块化, 需要的包yarn下, 被webpack打包后引入到html中使用



### 3.4 插件-自动生成html文件

> html-webpack-plugin插件, 让webpack打包后生成html文件并自动引入打包后的js

[html-webpack-plugin插件地址](https://www.webpackjs.com/plugins/html-webpack-plugin/)

1. 下载插件

   ```bash
   yarn add html-webpack-plugin -D
   ```

2.  webpack.config.js 配置

   ```js
   // 引入自动生成 html 的插件
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
       // ...省略其他代码
       plugins: [
           new HtmlWebpackPlugin({
               template: './public/index.html' // 以此为基准生成打包后html文件
           })
       ]
   }
   ```

3. 重新打包后观察 dist 下是否多出 html 并运行查看效果

   ==打包后的index.html自动引入打包后的js文件==

> 总结: webpack就像一个人, webpack.config.js是人物属性, 给它穿什么装备它就干什么活



### 3.5 加载器-处理css文件

> webpack 默认只能处理js类型文件
>
> loaders 加载器，可让 webpack 处理其他类型文件

[style-loader文档](https://webpack.docschina.org/loaders/style-loader/)

[css-loader文档](https://webpack.docschina.org/loaders/css-loader/)

**style-loader：把 css 插入到 DOM 中**

**css-loader：让 webpack 能够处理 css 类型文件**

使用步骤：

1. 安装依赖

   ```bash
   yarn add style-loader css-loader -D
   ```

2. webpack.config.js 配置

   ```js
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   module.exports = {
       // ...其他代码
       module: { 	// 加载器
           rules: [ // loader的规则
             {		// 一个具体的规则对象 
               test: /\.css$/, // 匹配所有的css文件
               // use数组里从右向左运行
               // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
               // 再用 style-loader 将样式, 把css插入到dom中
               use: [ "style-loader", "css-loader"]
             }
           ]
       }
   }
   ```

3. 新建src/css/li.css - 去掉li默认样式

   ```css
   ul, li{
       list-style: none;
   }
   ```

4. 引入到main.js (因为这里是入口需要产生关系, 才会被webpack找到打包起来)

   ```js
   import "./css/index.css"
   ```

5. 运行打包后dist/index.html观察效果和css引入情况



webpack 如何支持 CSS 打包？打包后的样式在哪？如何生效？

1. 依赖 css-loader 和 style-loader
2. css 代码被打包进 js 文件中
3. style-loader 会把 css 代码插入到 header 下style标签内



### 3.6 加载器-处理less文件

> less-loader让webpack处理less文件, less模块翻译less代码

[less-loader文档](https://webpack.docschina.org/loaders/less-loader/)

less-loader 作用：识别 less 文件

less作用：将 less 编译为 css

使用步骤：

1. 下载依赖包

   ```bash
   yarn add less less-loader -D
   ```

2. webpack.config.js 配置

   ```js
   module: {
     rules: [ // loader的规则
       // ...省略其他
       {
       	test: /\.less$/,
       	// 使用less-loader, 让webpack处理less文件, 内置还会用less翻译less代码成css内容
           use: [ "style-loader", "css-loader", 'less-loader']
       }
     ]
   }
   ```

3. src/less/index.less - 设置 li 字体大小为 24px

   ```less
   @size:24px;
   
   ul, li{
       font-size: @size
   }
   ```

4. 引入到 main.js 中

   ```js
   import "./less/index.less"
   ```

5. 打包运行dist/index.html 观察效果



小结：webpack如何支持less打包? 需要注意什么?

1. 依赖 less-loader 和 less 模块包
2. 转换 css 后 还需要 css-loader 和 style-loader 的处理



### 3.7 加载器-处理图片文件

> webpack5, 使用asset module技术实现字体文件和图片文件处理, 无需配置额外loader

[asset module文档](https://webpack.docschina.org/guides/asset-modules/)

如果使用的是 webpack5 版本的，直接配置到 webpack.config,js 的 rules 里面即可

```js
{   // 图片文件配置
  test: /\.(gif|png|jpg|jpeg)$/,
  type: 'asset' // 匹配上面的文件后，webpack 会把它们当作静态资源打包
},
```

如果使用的是 webpack4 及以前的请使用这里的配置

[url-loader文档](https://webpack.docschina.org/loaders/url-loader/)

[file-loader文档](https://webpack.docschina.org/loaders/file-loader/)

1. 下载依赖包

   ```bash
   yarn add url-loader file-loader -D
   ```

2. 配置 webpack.config,js

   ```js
   {
     test: /\.(png|jpg|gif|jpeg)$/i,
     use: [
       {
         loader: 'url-loader', // 匹配文件, 尝试转base64字符串打包到js中
         // 配置limit, 超过8k, 不转, file-loader复制, 随机名, 输出文件
         options: {
           limit: 8 * 1024,
         },
       },
     ],
   }
   ```

图片转成 base64 字符串

- 好处是浏览器不用发请求了，可以直接读取
- 坏处是如果图片太大，再转成 base64 就会让图片的体积增大 30% 左右



webpack如何支持图片打包? 对图片有哪2种处理方案?

1. **webpack5 在rules里，针对图片文件设置 type：asset**
2. **小于8KB转base64字符串进js里，大于8KB输出文件**



### 3.8 webpack 加载文件优缺点

图片转成 base64 字符串

- 好处是浏览器不用发请求了，可以直接读取
- 坏处是如果图片太大，再转成 base64 就会让图片的体积增大 30% 左右



### 3.9 加载器-处理字体文件

**用 assetmodule 技术，asset/recource 直接输出到 dist 目录下**

webpack5 使用这个配置

```js
{ // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    type: 'asset/resource',
    generator: {
    	filename: 'font/[name].[hash:6][ext]'
    }
}
```

webpack4及以前使用下面的配置

1

1. webpack.config.js - 准备配置

   ```js
    { // 处理字体图标的解析
        test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 2 * 1024,
                        // 配置输出的文件名
                        name: '[name].[ext]',
                        // 配置输出的文件目录
                        outputPath: "fonts/"
                    }
                }
            ]
    }
   ```

2. src/assets/ - 放入字体库fonts文件夹

3. 在main.js引入iconfont.css

   ```js
   // 引入字体图标文件
   import './assets/fonts/iconfont.css'
   ```

4. 在public/index.html使用字体图标样式

   ```html
   <i class="iconfont icon-weixin"></i>
   ```

5. 执行打包命令-观察打包后网页效果

> 总结: url-loader和file-loader 可以打包静态资源文件



### 3.11 加载器-处理高版本js语法

写代码演示: 高版本的js代码(箭头函数), 打包后, 直接原封不动打入了js文件中, 遇到一些低版本的浏览器就会报错

原因: **webpack 默认仅内置了 模块化的 兼容性处理**   `import  export`

babel 的介绍 => 用于处理高版本 js语法 的兼容性 

解决: 让webpack配合babel-loader 对js语法做处理

babel官网: https://www.babeljs.cn/ 

babel-loader文档: https://webpack.docschina.org/loaders/babel-loader/

使用步骤：

1. 安装依赖

   ```bash
   yarn add -D babel-loader @babel/core @babel/preset-env
   ```

2. 配置规则

   ```js
   module: {
     rules: [
       {
           test: /\.js$/,
           exclude: /(node_modules|bower_components)/,
           use: {
               loader: 'babel-loader',
               options: {
                   presets: ['@babel/preset-env'] // 预设:转码规则(用bable开发环境本来预设的)
               }
           }
       }
     ]
   }
   ```

3. 在 main.js 中使用箭头函数(高版本js)

   ```js
   // 高级语法
   const fn = () => {
     console.log("你好babel");
   }
   console.log(fn) // 这里必须打印不能调用/不使用, 不然webpack会精简成一句打印不要函数了/不会编译未使用的代码
   // 没有babel集成时, 原样直接打包进lib/bundle.js
   // 有babel集成时, 会翻译成普通函数打包进lib/bundle.js
   ```

4. 打包后观察lib/bundle.js - 被转成成普通函数使用了 - 这就是babel降级翻译的功能

> 总结: babel-loader 可以让webpack 对高版本js语法做降级处理后打包



## 4. webpack 开发服务器

文档地址: https://webpack.docschina.org/configuration/dev-server/

每次修改代码, 都需要重新 yarn build 打包, 才能看到最新的效果, 实际工作中, 打包 yarn build 非常费时 (30s - 60s) 之间

为什么费时? 

1. 构建依赖
2. 磁盘读取对应的文件到内存, 才能加载  
3. 用对应的 loader 进行处理  
4. 将处理完的内容, 输出到磁盘指定目录  

解决问题: 起一个开发服务器,  在电脑内存中打包, 缓存一些已经打包过的内容, 只重新打包修改的文件, 最终运行加载在内存中给浏览器使用



### 4.1 webpack-dev-server 自动刷新

> 目标: 启动本地服务, 可实时更新修改的代码, 打包**变化代码**到内存中, 然后直接提供端口和网页访问

1. 下载包：

   ```bash
   yarn add webpack-dev-server -D
   ```

2. 配置自定义命令

   ```js
   scripts: {
   	"build": "webpack",
   	"serve": "webpack serve"
   }
   ```

3. 运行命令-启动webpack开发服务器

   ```bash
   yarn serve
   #或者 npm run serve
   ```

   > 总结: 以后改了src下的资源代码, 就会直接更新到内存打包, 然后反馈到浏览器上了



### 4.2 webpack-dev-server 配置

在webpack.config.js中添加服务器配置

更多配置参考这里: https://webpack.docschina.org/configuration/dev-server/#devserverafter

```js
module.exports = {
    // ...其他配置
    devServer: {
      port: 3000 // 端口号
    }
}
```