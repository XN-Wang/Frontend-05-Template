#### 学习笔记
```
<Expression>::=
    <AdditiveExpression><EOF>

<AdditiveExpression>::=
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression>::=
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
```
JavaScript RegExp 对象有状态的，可以将上次成功匹配后的位置记录在 lastIndex 属性中。使用此特性，可用exec() 来对单个字符串中的多次匹配结果进行逐条的遍历。