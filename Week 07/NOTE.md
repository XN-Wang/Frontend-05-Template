学习笔记

#### Unboxing（拆箱转换）
把引用类型转换为基本的数据类型称为拆箱
* ToPremitive
    - 如遇到 object 参与运算，如 object + object 时，都会调用 ToPremitive 过程。
* toString vs valueOf
    - 加法会优先调用 valueOf 方法，即使是字符串+对象，如 'x' + o，如果没有 valueOf 和 Symbol.toPrimitive 方法才会调用 toString，但是当 object 作为属性名的时候则会优先调用 toString 方法，如x[o]。
* Symbol.toPrimitives
    - 优先级最高，如果调用了该方法，则会忽略 toString 和 valueOf 方法

#### Boxing（装箱转换）
把基本数据类型转换为对应的引用类型的操作称为装箱,若用 Member 运算符或者方括号去访问属性时，若被访问者是一个基础类型，则会自动调用装箱转换
| 类型       | 对象     | 值      |
| --------   | -----:  | :----:  |
| Number    | new Number(1) | 1 |
| String | new String('a') | 'a' |
| Boolean | new Boolean(true) | true |
| Symbol | new Object(Symbol('a')) | Symbol('a') |


#### 带标签的模板字符串
带标签的模板字符串可以用函数解析模板字符串。标签函数的第一个参数包含一个字符串值的数组。其余的参数与表达式相关。最后，你的函数可以返回处理好的的字符串
```javascript
function foo(str) { 
    return str[0].toUpperCase(); 
}
foo`justjavac`; // 输出 JUSTJAVAC
foo`Xyz`; // 输出 XYZ
```