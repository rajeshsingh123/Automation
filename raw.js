const puppeter=require("puppeteer");
 
 let browserkapromises=puppeter.launch({headless : false});

// browserkapromises.then(function(browserInstance){
//     console.log("browser has opened")
//    let pagepromise=browserInstance.newPage();
//   // return pagepromises;

// })

 browserkapromises.then(function(browser){
       console.log("browser has opened");
       let pagekapromise=browser.newPage();
       return pagekapromise;
 }).then(function(page){
    console.log("we are in new page");
    let urlpromise=page.goto("https://www.google.com/");
    return urlpromise;
 }).then(function(){
    console.log("google has opened");
 })

