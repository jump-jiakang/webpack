// 引入 jquery
import $ from 'jquery'

// 编写隔行变色代码
$('#myUL>li:odd').css('color','pink')
$('#myUL>li:even').css('color','green')

// 引入 css 文件
import "./css/index.css"

// 引入 less 文件
import "./less/index.less"

// 手动引入图片文件
import imgObj from './assets/1.gif'
let theimg = document.createElement('img')
theimg.src = imgObj
document.body.appendChild(theimg)

// 引入字体图标样式文件
import "./assets/fonts/iconfont.css"
let theI = document.createElement('i')
theI.className = 'iconfont icon-qq'
document.body.appendChild(theI)

// 书写高版本的js语法
const fn = () => { console.log('我是箭头函数') }
console.log(fn)