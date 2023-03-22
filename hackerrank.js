 const mail="cahifo7308@loongwin.com";

const pass="rajesh@3474";
const code = require('./code');

const puppeter=require("puppeteer");
 
 let browserkapromises=puppeter.launch({ headless: false, defaultViewport: null,args: ['--start-fullscreen'] });
  let page;
 browserkapromises.then(function(browser){
    console.log("browser has opened");
    let pagekapromise=browser.newPage();
    return pagekapromise;
}).then(function(pageInstance){
 console.log("we are in new page");
 page=pageInstance;
 let urlpromise=pageInstance.goto("https://www.hackerrank.com/access-account/");
 return urlpromise;
}).then(function(){
 console.log("hackerank has opened");
 let waitpromise=page.waitForSelector(".hr_button");
 return waitpromise;
}).then(function(){
    let domClickPromse = page.evaluate(function(){
        let btns = document.querySelectorAll(".hr_button");
        btns[1].click();
        return;
})
return domClickPromse;
}).then(function(){
    let waitPromise = page.waitForSelector("#input-1");
    return waitPromise;
}).then(function(){
    let mailTypedPromise = page.type("#input-1",mail,{ delay: 100 });
    return mailTypedPromise;
}).then(function(){
    let passTypedPromise = page.type("#input-2",pass,{delay:100});
    return passTypedPromise;
}).then(function(){
    let clickPromse = page.click('button[data-analytics="LoginPassword"]');
    return clickPromse;
}).then(function(){
    console.log("login succesfull")
   // return waitAndClick('[data-automation="algorithms"]');
   let waitpromise=page.waitForSelector('[data-automation="algorithms"]');
   return waitpromise;
}).then(function(){
    let clickpromise=page.click('[data-automation="algorithms"]');
    return clickpromise;
 }).then(function(){
   return page.waitForSelector(".filter-group");
 }).then(function(){
    let domSelectPromise = page.evaluate(function(){
        let allDivs = document.querySelectorAll(".filter-group");
        let div = allDivs[3];
        let clickSelector = div.querySelector(".ui-checklist-list-item input");
        clickSelector.click();
        return;
    })
    return domSelectPromise;
}).then(function(){
    console.log("warmup Selected");
    return page.waitForSelector('.challenges-list .js-track-click.challenge-list-item');
}).then(function(){
    let arrPromise = page.evaluate(function(){
        let arr = [];
        let aTags = document.querySelectorAll('.challenges-list .js-track-click.challenge-list-item');
        for(let i=0;i<aTags.length;i++){
            let link =  aTags[i].href;
            console.log(link);
            arr.push(link);
        }
        return arr;
    })
    return arrPromise;
}).then(function(questionsArr){
    console.log(questionsArr);
    console.log(code.answers.length);
    let questionPromise = questionSolver(questionsArr[0],code.answers[0]);
    for(let i=1;i<questionsArr.length;i++){
        questionPromise = questionPromise.then(function(){
            let nextQuestionPromise = questionSolver(questionsArr[i],code.answers[i]);
            return nextQuestionPromise;
        })
    }
    return questionPromise;
}).then(function(){
    console.log("All the warm up questions have been submitted!!!");
})
 
 



function waitAndClick(selector){
    return new Promise(function(resolve,reject){
        let waitPromise = page.waitForSelector(selector);
        waitPromise.then(function(){
            let clickPromise = page.click(selector);
            return clickPromise;
        }).then(function(){
            resolve();
        });
    })
}


function questionSolver(question,answer){
    return new Promise(function(resolve,reject){
        let linkPromise = page.goto(question);
        linkPromise.then(function(){
            return waitAndClick('.checkBoxWrapper input');
        }).then(function(){
            return waitAndClick('.ui-tooltip-wrapper textarea');
        }).then(function(){
            let typePromise = page.type('.ui-tooltip-wrapper textarea',answer);
            return typePromise;
        }).then(function(){
            let holdControl = page.keyboard.down('Control');
            return holdControl;
        }).then(function(){
            let pressA = page.keyboard.press('A');
            return pressA;
        }).then(function(){
            let pressX = page.keyboard.press('X');
            return pressX;
        }).then(function(){
            let upControl = page.keyboard.up('Control');
            return upControl;
        }).then(function(){
            return waitAndClick('.monaco-editor.no-user-select.vs');
        }).then(function(){
            let holdControl = page.keyboard.down('Control');
            return holdControl;  
        }).then(function(){
            let pressA = page.keyboard.press('A');
            return pressA;
        }).then(function(){
            let pressV = page.keyboard.press('V');
            return pressV;
        }).then(function(){
            let upControl = page.keyboard.up('Control');
            return upControl;
        }).then(function(){
            return waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled');
        }).then(function(){
            console.log("questions submitted success");
            resolve();
        })
    })
}
