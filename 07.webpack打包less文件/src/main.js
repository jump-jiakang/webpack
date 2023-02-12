// 引入 jquery
import $ from 'jquery'

// 编写隔行变色代码
$('#myUL>li:odd').css('color','red')
$('#myUL>li:even').css('color','green')

// 引入 css 文件
import "./css/index.css"

// 引入 less 文件
import "./less/index.less"