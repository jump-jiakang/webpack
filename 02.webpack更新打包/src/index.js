// webpack 打包的入口
import { addFn } from './add/add.js'
import { getArrSum } from './tool/tool.js'

console.log(addFn(5,2))
console.log(getArrSum([1,2,3,4,5]))