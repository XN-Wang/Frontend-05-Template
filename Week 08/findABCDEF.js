// function findABCDEF(str) {
//     for(let i = 0; i < str.length; i++) {
//         if(str[i] === 'a') {
//             if(str[i + 1] === 'b') {
//                 if(str[i + 2] === 'c') {
//                     if(str[i + 3] === 'd') {
//                         if(str[i + 4] === 'e') {
//                             if(str[i + 5] === 'f') {
//                                 return true
//                             }
//                             continue
//                         }
//                         continue
//                     }
//                     continue
//                 }
//                 continue
//             }
//             continue
//         }
//     } 
//     return false
// }
// findABCDEF('abbccddeeff')

function findABCDEF(str) {
    let findA = false
    let findB = false
    let findC = false
    let findD = false
    let findE = false
    for(let c of str) {
        if(c === 'a')
            findA = true
        else if(findA && c === 'b') {
            findB = true
            findA = false
        }
        else if(findB && c === 'c') {
            findC = true
            findB = false
        }          
        else if(findC && c === 'd') {
            findD = true
            findC = false
        }        
        else if(findD && c === 'e') {
            findE = true
            findD = false
        }         
        else if(findE && c === 'f') {
            return true
        }
        else {
            findE = false
        }
    }
    return false
}

findABCDEF('abbccddeeff')