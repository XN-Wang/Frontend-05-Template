学习笔记

##### css总体架构
* @charset
* @import
* rules
    * @media
    * @page
    * rule

##### @rule
* @charset ： https://www.w3.org/TR/css-syntax-3/
* @import ：https://www.w3.org/TR/css-cascade-4/
* @media ：https://www.w3.org/TR/css3-conditional/
* @page ： https://www.w3.org/TR/css-page-3/
* @counter-style ：https://www.w3.org/TR/css-counter-styles-3
* @keyframes ：https://www.w3.org/TR/css-animations-1/
* @fontface ：https://www.w3.org/TR/css-fonts-3/
* @supports ：https://www.w3.org/TR/css3-conditional/
* @namespace ：https://www.w3.org/TR/css-namespaces-3/

##### rule

* 简单选择器
    * *
    * 标签 div svg|a
    * 类 .cls
    * ID #id
    * 属性 理论上可以用属性选择器代替类和id选择器（如果不考虑选择器优先级的话）
    * [attr] 有该属性
    * [attr=value] 属性值等于value
    * [attr~=value] 属性值中的一个等于value，(适用于用空格相连的多个value)
    * [attr|=value] 属性值以value开头
    * 伪类 :hover （主要是元素的一些特殊状态[来自交互]，或者是带函数的选择器）
    * 伪元素 ::before

* 复合选择器
    * <简单选择器><简单选择器><简单选择器> 多个简单选择器之间是 “与” 的关系
    * * 或者div 必须写在最前面

* 复杂选择器
    * <复合选择器><复合选择器> (子孙)后代
    * <复合选择器><>"<复合选择器> 父子
    * <复合选择器><~"<复合选择器> 后续邻居
    * <复合选择器><+"<复合选择器> 第一个后续邻居
    * <复合选择器><||"<复合选择器> 列选择器，表示选中对应列中符合条件的单元格

##### CSS优先级计算
* p[1]计算选择器中ID选择器的数量
* p[2]计算选择器中类选择器、属性选择器和伪类的数量
* p[3]计算选择器中类型选择器、伪元素数量
* 忽略通用选择器
(https://www.w3.org/TR/selectors-4/#specificity-rules)

##### 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢
因为first-letter是针对字的样式不用关心变化布局所带来的影响，而first-line时必须是布局计算完成才能确定首行，如果first-line支持改变大小或display，那么布局又需要重新计算首行很影响性能。