function findA(str) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] === 'a') {
            return i
        }
    }
}
findA('happy')