学习笔记

##### 预处理
通过flex-direction:row/column确定主轴和交叉轴
* flex-direction: row;Main: width x left right;Cross: height y top bottom;
* flex-direction: column;Main: height y top bottom;Cross: width x left right;

##### 收集元素进行
* 分行
    * 根据主轴尺寸，将元素分进行
    * 若设置了no-wrap，则强行分配进第一行

##### 计算主轴
* 计算主轴方向
    * 找出所有Flex元素
    * 把主轴方向的剩余尺寸按比例分配给这些元素
    * 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

##### 计算交叉轴
* 计算交叉方向
    * 根据每一行中最大元素尺寸计算行高
    * 根据行高flex-align和item-align，确定元素具体位置