学习笔记
#### 实现utf-8的其他两种方法
1.window.TextEncoder()
2.使用 encodeURI(str)，其中如果碰到中文字符之类的，就会按照 utf8 编码之后变成类似%E5%91，再将 % 替换成 \x，就得到了单个字节的串
```
function str2utf8(str) {
    return eval('\''+encodeURI(str).replace(/%/gm, '\\x')+'\'');
}
```