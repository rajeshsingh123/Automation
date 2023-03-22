// const fs=require("fs");

// let f1promises=fs.promises.readFile("f1.txt");
// console.log(f1promises);

// f1promises.then(function(error,data){
//     console.log(data+"");
    
// })
 
// f1promises.catch(function(error){
//     console.log(error);
// })

const fs = require("fs");

console.log("Before");
let f1KaPromise = fs.promises.readFile("f1.txt");


f1KaPromise.then(function(data){
    console.log(data+"");
})

f1KaPromise.catch(function(error){
    console.log(error);
})
console.log("After");