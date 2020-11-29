function kmp(source, pattern) {
    // 计算 table
    let table = new Array(pattern.length).fill(0)

    {
        let i = 1, j = 0

        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                ++j, ++i
                table[i] = j
            } else {
                if (j > 0) {
                    j = table[j]
                } else {
                    // table[i] = j
                    ++i
                }
            }
        }
    }

    {
        let i = 0, j = 0
        while (i < source.length) {
            if (pattern[j] === source[i]) {
                ++i, ++j
            } else {
                if (j > 0) {
                    j = table[j]
                } else {
                    ++i
                }
            }
            if (j === pattern.length) return true
        }
        return false
    }
}

console.log(kmp('aabaaac', 'aca'))