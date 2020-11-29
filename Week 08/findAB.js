function findAB(str) {
   for(let i = 0; i < str.length; i++) {
       if(str[i] === 'a') {
           if(str[i + 1] === 'b') {
               return true
           }
           continue
       }
   } 
   return false
}
findAB('reliacble')