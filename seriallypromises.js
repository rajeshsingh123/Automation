let fs=require("fs");

let f1kapromises=fs.promises.readFile(("f1.txt"));

f1kapromises.then(function(data){
    console.log(data+"");
    let f2kapromises=fs.promises.readFile("f2.txt");
    return f2kapromises;
  }).then(function(data){
    console.log(data+"");
 }).catch(function(error){
    console.log(error);
})