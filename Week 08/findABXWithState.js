function findABXWithState(str) {
    let state = start
    for(let c of str) {
        state = state(c)
    }
    return state === end
}
function start(c) {
    if(c === 'a') 
        return foundA
    return start
}
function end(c) {
    return end;
}
function foundA(c) {
    if(c === 'b') 
        return foundB
    return start(c)
}
function foundB(c) {
    if(c === 'x')
        return end(c) 
    return start(c)
}

console.log(findABXWithState('abcabababx'))