学习笔记

1.数组的复制
function clone(pattern) {
    return JSON.parse(JSON.stringify(pattern));
}
function clone(pattern) {
    return Object.create(pattern);
}

2.列数相等的二维数组转成一维数组的方法： [x, y] = [x * 二维数组的列数 + y]

3.代码块外部包一个花括号，let变量是块作用域, 使其变成局部变量，可以反复的声明/赋值

4.多层遍历时候，可用outer: 直接break到外层

5.在TacTicToe的willWin方法里可以传入点的坐标，然后判断这个点是否属于斜线上的点，如果不是，可以只判断与该点相关的横竖两排的点是否颜色一致，如果是斜线上的点，再判断斜线是否能赢，这样可以不用全部遍历棋盘中的点。willWin方法的复杂度可以由O(n ^ 2)降为O(n)

5.异步async/await将异步代码变得像同步代码一样，易于理解代码执行顺序，代码整洁优雅

