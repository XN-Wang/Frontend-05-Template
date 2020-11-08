学习笔记
#### proxy用法
```
const p = new Proxy(target, handler)
```
**target**
要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
**handler**
一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

#### map和object的区别
Objects 和 Maps 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 Maps 使用。不过 Maps 和 Objects 有一些重要的区别，在下列情况里使用 Map 会是更好的选择：
![map和object的区别](http://note.youdao.com/yws/public/resource/19a48ce9673359f7255ee341c53c065b/xmlnote/WEBRESOURCE6a3f1bf64fda63f5aacef4795aa5b36b/4805)

#### Range用法
```
range = document.createRange()
range.setStart(startNode, startOffset)
range.setEnd(endNode, endOffset)
```
**setStart**
把该范围的开始点设置为指定的节点中的指定偏移量
**setEnd**
把该范围的结束点设置为指定的节点和偏移量

拖拽应使用 mousedown、mousemove 和 mouseup 组合，在需要拖动的块上监听 mousedown 事件，触发 mousedown 之后在 document 上监听 mousemove 和 mouseup 事件，因为当鼠标拖动太快时， 只监听滑动块的mousemove事件会出现掉块，当鼠标拖到浏览器窗口外松开时滑块也会监听不到 mouseup