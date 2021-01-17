学习笔记

##### 动画实现方式
* setInterval
```javascript
// 具体到浏览器实现时，浏览器不能保证准时执行代码，并且会有堆积回调的可能（上一个回调还没执行，就已经到时间执行下一个的回调了）
setInterval(() => {}, 16);
```
* setTimeout
```javascript
let tick = function () {
  // 容易出现内存泄漏，如果不清理setTimeout的话
  setTimeout(tick, 16);
};
```
* requestAnimationFrame (更安全的实现)
```javascript
let tick = function () {
  /*
   ** 回调函数执行次数通常是60帧，
   ** 但在大多数遵循W3C建议的浏览器中，
   ** 回调函数执行次数通常与浏览器屏幕刷新次数相匹配。
   */
  let handler = requestAnimationFrame(tick);
  cancelAnimationFrame(handler);
};
```

##### 手势与动画|手势的基本知识
tap: start = end 
pan start: tap -> 移动 10px
pan: move -> pan (循环 move -> pan) -> pan end
end 切速度 > 1.5 ? flick : pan end 
press start: duration = 0.5s -> press end