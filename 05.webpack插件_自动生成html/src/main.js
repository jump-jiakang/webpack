// 引入 jquery
import $ from 'jquery'

// 编写隔行变色代码
$('#myUL>li:odd').css('color','red')
$('#myUL>li:even').css('color','green')