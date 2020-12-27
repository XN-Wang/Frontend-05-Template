学习笔记
##### 组成
* line-box（IFC）：包括文字盒inline-box。从左到右
* block-level-box
* BFC：包括line-box（IFC）和block-level-box
##### 行内排布IFC
* base-line：各国文字都以各自的base-line为准对齐，导致结果会有偏移。跟盒混排时，外面的文字是根据盒内文字的最后一行（默认）文字的基线对齐的
* text-top：上限，字不可超过这条线，随着font-size而动
* text-bottom：下限，字不可超过这条线，随着font-size而动。跟盒混排时，盒的底部跟文字的底部是根据text-bottom对齐的
* line-top：跟盒混排时，盒的高度会把line-top撑开
* line-bottom：跟盒混排时，不同的对齐方式会把line-bottom撑开
相关css属性：vertical-align：baseling/top/middle/bottom/sub/text-top;
##### 块级排布
从上往下排
正常流程只有BFC会发生边距折叠margin collapse，以最大的margin为准
##### BFC
Block Container：里面有BFC的
能容纳正常流的盒，里面就有BFC
Block-level Box：外面有BFC
Block Box：Block Container + Block-level Box = 里面外面都有BFC的
##### Block Container
block
inline-box
table-cell
flex item
grid cell
table-caption
##### Block-level Box
block
inline-block
flex
inline-flex
table
inline-table
grid
inline-grid
##### 设立BFC
floats
absolutely positioned elements
block-containers(inline-block、table-cell、table-caption)
block boxes with 'overflow' other than 'visible'
默认能容纳正常流的盒，理论上都能设立BFC。除了Block Box里面都是BFC的并且overflow为visible的不能

##### flex排版
收集盒（文字被装在盒里）进行
计算主轴的排布
计算交叉轴的排布