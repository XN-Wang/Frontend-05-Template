学习笔记

##### 重要的HTML实体（DTD）
* nbsp 在网页上使用多个nbsp，会出现分词的问题，no-break space会把空格前后的单词当成一个单词处理，会破坏语义，不建议使用
* quot 是双引号
* amp 是&符
* lt 是小于号
* gt 是大于号

##### HTML标签语义
* <main></mian> 放的主要部分 表示一个
* <hgroup></hgroup> 标题组
* <abbr></abbr> 表示缩写、简写 有title属性
* <strong></strong> 表示重点 文章的重点
* <em></em> 表示强调 语气上
* <figure></figure> 用作文档中插图的图像
* <figcaption></figcaption> 元素为 figure 添加标题
* <nav></nav> nav 标签定义导航链接的部分。
* <dfn></dfn> dfn表示定义当前的词
* <samp></samp> 表示例子
* <pre></pre> 表示引入代码
* <code></code> 代码

##### 合法元素
* Element: <tagname>...</tagname>
* Text: text
* Comment: <!-- comments -->
* DocumentType: <!Doctype html>
* ProcessingInstruction: <?a 1?>
* CDATA:<![CDATA[ ]]>

##### 浏览器API
###### DOM API
* 高级操作
    * compareDocumentPosition 是一个用于比较两个节点中关系的函数
    * contains 检查一个节点是否包含另一个节点的函数
    * isEqualNode 检查两个节点是否完全相同
    * isSameNode 检查两个节点是否是同一个节点，实际上在JavaScript 中可以用“===”
    * cloneNode 复制一个节点，如果传入参数true，则会连同子元素做深拷贝
###### Range API
* var range = new Range()
* range.setStart(element,9) 对于element的偏移值是children,对于text的偏移值是文字的个数 如果选中了半个节点并删除，浏览器会自己补上半个节点
* range.setEnd(element,4)
* var range = document.getSelection().getRangeAt(0);
* range.setStartBefore
* range.setEndBefore
* range.setStartAfter
* range.setEndAfter
* range.selectNode
* range.selectNodeContents 选中一个元素所有的内容
* var fragment = * range.extractContents()
* range选取的内容从DOM树摘下来，fragment是node的一个子类，它在append的时候，它自己不会append到dom树上，对fragment的dom操作不会影响真实的dom，最后append的时候它会把它的所有的子节点代替它自己放上去。fragment不需要发生重排，它的性能比较高。
* range.insertNode(document.createTexdNode("aaa"))

问题：把一个元素所有的子元素逆序：12345编程54321
考点一：知不知道DOM的collection是一个living collection，操作的时候，一操作的时候它取出来的这个集合会跟着变化
考点二：元素的这些子元素，在insert的时候，是不需要先把它从原来的位置挪掉的，因为DOM树的性质，在进行insert操作的时候，如果它已经在DOM树上了，或者是在另一棵DOM树上这都无所谓，它一定会把把它remove下来，然后再把它append到新的树上
答案：
```html
<div id="a">
  <span>1</span>
  <p>2</p>
  <a>3</a>
  <div>4</div>
</div>
``` 
```javascript
let element = document.getElementById("a");
function reverseChildren(element) {
    for(let child of children) {
        element.removeChild(child);
    }
    children.reverse();
    for(let child of children) {
        element.appendChild(child)
    }
}
reverseChildren(element)  
```
如果掌握了API的解法：
```javascript
let element = document.getElementById("a");
function reverseChildren(element) {
    var l = element.childNodes.length;
    while(l-- > 0) {
        element.appendChild(element.childNodes[l])
    }
}
reverseChildren(element)
```
完美的解法（用range）：
```javascript
let element = document.getElementById("a");
function reverseChildren(element) {
    let range = new Range();
    range.selectNodeContents(element);

    let fragment = range.extractContents();
    var l = fragment.childNodes.length;
    while(l-- > 0) {
        fragment.appendChild(fragment.childNodes[l]);
    }
    element.appendChild(fragment);
}
reverseChildren(element);
```