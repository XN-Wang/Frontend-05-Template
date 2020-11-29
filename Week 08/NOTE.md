学习笔记

我们看到的页面都是一个图片形式，专业点的说法叫做位图（Bitmap），然后经过显卡转换为我们可以识别的光信号。
整个的过程就是从 URL 转换为 Bitmap 的过程，先发送请求到服务器，然后服务器返回 HTML，浏览器解析 HTML，然后构建 DOM 树，计算 CSS 属性，然后进行排版，最后渲染成位图，然后经过操作系统或硬件的 API 完成视图的显示。

##### JS 中的状态机（Mealy）
一系列返回值为状态函数的状态函数
```javascript
// 每个函数是一个状态
function state(input) // 函数参数就是输入
{
  // 在函数中，可以自由地编写代码，处理每个状态的逻辑
  return next; // 返回值作为下一个状态
}

// 以下是调用
while(input) {
  // 获取输入
  state = state(input); // 把状态机的返回值作为下一个状态
}
```
##### HTTP请求总结
* 设计一个HTTP请求的类
* content-type是一个必要的字段，要有默认值
* body是KV格式
* 不同的content-type影响body格式

##### send函数总结
* 在Request的构造器中收集必要的信息
* 设计一个send函数，把请求真实发送到服务器
* send函数应该是异步的，所以返回Promise

##### 发送请求
* 设计支持已有的connection或者新建connection
* 收到数据传给parser
* 根据parser的状态resolve Promise

##### ResponseParser总结
* Response必须分段构造，所以要用一个ResponseParser装配
* ResponseParser分段处理ResponseText，可以用状态机分析文本的结构

##### BodyParser总结
* Response的body可能根据Content-type有不同的结构，因此可以采用子Parser结构解决问题
* 以TrunkedBodyParser为例，同样采用状态机处理body的其他格式