function StringToNumber(str, radix) {
    let radixMap = {
        '0b': 2,
        '0o': 8,
        '0x': 16
    }
    
    //没有传入进制，判断字符串是否为0b、0o、0x开头
    if (!radix) {
        if (!radixMap[str.slice(0, 2)]) {
            return NaN
        } else {
            radix = radixMap[str.slice(0, 2)]
            str = str.slice(2)
        }
    }
    let result = 0, len = str.length
    for(let index = 0; index < len; index++) {
        result +=  str[index] * Math.pow(radix, len - index - 1)
    }
    return result
}

console.log(StringToNumber('123', 2)) //11
console.log(StringToNumber('123', 8)) //83
console.log(StringToNumber('123', 10)) //123
console.log(StringToNumber('123', 16)) //291

console.log(StringToNumber('0b123')) //11
console.log(StringToNumber('0o123')) //83
console.log(StringToNumber('0x123')) //291


function NumberToString(num) {
    return num.toString()
}
NumberToString(123) //123
NumberToString(0x123) //291