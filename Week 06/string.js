function UTF8_Encoding(string) {
    const bytes = []
    for (let i = 0; i < string.length; i++) {
        //获取Unicode值大小
        let code = string.charCodeAt(i);
        //补位
        if (0x00 <= code && code <= 0x7f) {
            bytes.push(code);
        } else if (0x80 <= code && code <= 0x7ff) {
            bytes.push((192 | (31 & (code >> 6))));
            bytes.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff) || (0xe000 <= code && code <= 0xffff)) {
            bytes.push((224 | (15 & (code >> 12))));
            bytes.push((128 | (63 & (code >> 6))));
            bytes.push((128 | (63 & code)))
        }
    }
    return Buffer.from(bytes)
}
console.log(UTF8_Encoding('helloWorld'))
console.log(UTF8_Encoding('你好'))