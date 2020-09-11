(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"Nf/3":function(e,a,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/a-library-webworker-wrapper",function(){var e=l("OvSC");return{page:e.default||e}}])},OvSC:function(e,a,l){"use strict";l.r(a);var t=l("q1tI"),r=l.n(t),n=l("JRaF"),s=(l("YFqc"),{url:"a-library-webworker-wrapper",id:"webworkers",type:"post",title:"A library webworker wrapper",date:"2017-03-07",tags:["webworker"],author:"david",excerpt:"Presenting a tool to create an asynchronous webworker version of a library",folder:"/Users/davidwaller/gitreps/mine/blog2/sources/2017-03-07_webworkers",hasStaticContent:!0,headlines:[{level:3,text:"The premise",id:"the-premise"},{level:3,text:"Meet WorkerWrapper",id:"meet-workerwrapper"},{level:3,text:"Usage",id:"usage"},{level:3,text:"See it in action",id:"see-it-in-action"},{level:3,text:"Under the hood of the wrapper",id:"under-the-hood-of-the-wrapper"},{level:3,text:"Wrapping up",id:"wrapping-up"}]});a.default=function(){return r.a.createElement(n.a,{kind:"post",data:s,title:"A library webworker wrapper",summary:"Presenting a tool to create an asynchronous webworker version of a library",headlines:[{level:3,text:"The premise",id:"the-premise"},{level:3,text:"Meet WorkerWrapper",id:"meet-workerwrapper"},{level:3,text:"Usage",id:"usage"},{level:3,text:"See it in action",id:"see-it-in-action"},{level:3,text:"Under the hood of the wrapper",id:"under-the-hood-of-the-wrapper"},{level:3,text:"Wrapping up",id:"wrapping-up"}],tags:["webworker"]},r.a.createElement("div",{className:"post","data-postid":"webworkers"},r.a.createElement("h3",{id:"the-premise"},"The premise"),r.a.createElement("p",null,"Imagine you have a library, consisting of an ",r.a.createElement("strong",null,"object with a bunch of methods"),". Some or all of those are heavy, and will lock up the thread for a while."),r.a.createElement("pre",null,r.a.createElement("code",{className:"hljs language-javascript"},r.a.createElement("span",{className:"hljs-keyword"},"var")," myHeavyLib = {",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-attr"},"aHeavyMethod"),": ",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function"),"(",r.a.createElement("span",{className:"hljs-params"},"arg1, arg2"),") "),"{",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-comment"},"// extremely heavy computing left out here"),r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"return")," arg1 + arg2;",r.a.createElement("br",null),"  },",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-attr"},"anotherHeavyMethod"),": ",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function"),"(",r.a.createElement("span",{className:"hljs-params"},"arg1, arg2"),") "),"{",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-comment"},"// extremely heavy computing left out here"),r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"return")," arg1 + arg2;",r.a.createElement("br",null),"  }",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-comment"},"// etc"),r.a.createElement("br",null),"};")),r.a.createElement("p",null,"If we're using this library in a web app, this won't be a nice user experience. We should fix that by ",r.a.createElement("strong",null,"delegating the heavy lifting to a Web worker"),"."),r.a.createElement("p",null,"This situation happened to me very recently, and instead of just webworkerifying my library, I generalised prematurely and made a ",r.a.createElement("strong",null,"tool to webworkerify any library"),"!"),r.a.createElement("h3",{id:"meet-workerwrapper"},"Meet WorkerWrapper"),r.a.createElement("p",null,"I made a command line tool I call WorkerWrapper. Feed it a library..."),r.a.createElement("p",null,r.a.createElement("img",{src:"/static/posts/a-library-webworker-wrapper/diagrams/workerwrapper.svg",alt:""})),r.a.createElement("p",null,"...and it will ",r.a.createElement("strong",null,"generate two files"),". First off an ",r.a.createElement("strong",null,"async version")," of the library. This is a very small file that gives you an object containing the same method names as the library, but they now return promises that resolves when a webworker gets the result from the real method."),r.a.createElement("pre",null,r.a.createElement("code",{className:"hljs language-javascript"},r.a.createElement("span",{className:"hljs-keyword"},"var")," asyncVersion = {",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-attr"},"aHeavyMethod"),": ",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function"),"(",r.a.createElement("span",{className:"hljs-params"},"arg1, arg2"),") "),"{",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-comment"},"// wrapping magic left out here"),r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"return")," promise;",r.a.createElement("br",null),"  },",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-attr"},"anotherHeavyMethod"),": ",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function"),"(",r.a.createElement("span",{className:"hljs-params"},"arg1, arg2"),") "),"{",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-comment"},"// wrapping magic left out here"),r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"return")," promise;",r.a.createElement("br",null),"  }",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-comment"},"// etc"),r.a.createElement("br",null),"};")),r.a.createElement("p",null,"The async version then spawns web workers from the ",r.a.createElement("strong",null,"worker version"),", which is really just the library with a web worker facade on top."),r.a.createElement("h3",{id:"usage"},"Usage"),r.a.createElement("p",null,"Say our heavy lib is at ",r.a.createElement("code",null,"lib/heavylib.js"),"."),r.a.createElement("p",null,"We would then ",r.a.createElement("strong",null,"include WorkerWrapper")," as a dependency in ",r.a.createElement("code",null,"package.json"),", and add a ",r.a.createElement("strong",null,"script using the ",r.a.createElement("code",null,"workerwrap")," command")," that WorkerWrapper exposes:"),r.a.createElement("pre",null,r.a.createElement("code",{className:"hljs"},"{",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-attr"},'"dependencies"'),": {",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-attr"},'"workerwrapper"'),": ",r.a.createElement("span",{className:"hljs-string"},'"github:krawaller/workerwrapper"'),r.a.createElement("br",null),"  },",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-attr"},'"scripts"'),": {",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-attr"},'"wrap"'),": ",r.a.createElement("span",{className:"hljs-string"},'"workerwrap lib/heavylib.js"'),r.a.createElement("br",null),"  }",r.a.createElement("br",null),"}")),r.a.createElement("p",null,"The command just takes one parameter, namely the relative path to the library to be wrapped."),r.a.createElement("p",null,"Now ",r.a.createElement("code",null,"heavylib_worker.js")," and ",r.a.createElement("code",null,"heavylib_async.js")," will be created next to ",r.a.createElement("code",null,"heavylib.js"),". I consume ",r.a.createElement("code",null,"heavylib_async.js")," in my app."),r.a.createElement("p",null,"However! In order to allow setup with the worker file, ",r.a.createElement("code",null,"heavylib_async.js")," doesn't export the wrapped library directly, but a function!"),r.a.createElement("pre",null,r.a.createElement("code",{className:"hljs"},r.a.createElement("span",{className:"hljs-built_in"},"module"),".exports = ",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function"),"(",r.a.createElement("span",{className:"hljs-params"},"pathToWorkerFile, numberOfWorkers"),")"),"{",r.a.createElement("br",null),r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-comment"},"// ...wrapping magic here..."),r.a.createElement("br",null),r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"return")," wrappedLib;",r.a.createElement("br",null),"}")),r.a.createElement("p",null,"You call this function with a relative path to where you've placed the worker file, as well as the number of parallel webworkers you want spun up."),r.a.createElement("h3",{id:"see-it-in-action"},"See it in action"),r.a.createElement("p",null,"In the live app below I've wrapped this silly library:"),r.a.createElement("pre",null,r.a.createElement("code",{className:"hljs"},r.a.createElement("span",{className:"hljs-keyword"},"var")," heavyLib = {",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-attr"},"aHeavyMethod"),": ",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function"),"(",r.a.createElement("span",{className:"hljs-params"},"arg1,arg2"),")"),"{",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-built_in"},"console"),".log(",r.a.createElement("span",{className:"hljs-string"},'"aHeavyMethod called in lib"'),");",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"for"),"(",r.a.createElement("span",{className:"hljs-keyword"},"var")," a=",r.a.createElement("span",{className:"hljs-number"},"0"),"; a<",r.a.createElement("span",{className:"hljs-number"},"70000"),"; a++){",r.a.createElement("br",null),"      ",r.a.createElement("span",{className:"hljs-keyword"},"for"),"(",r.a.createElement("span",{className:"hljs-keyword"},"var")," b=",r.a.createElement("span",{className:"hljs-number"},"0"),"; b<",r.a.createElement("span",{className:"hljs-number"},"70000"),"; b++){",r.a.createElement("br",null),"      }",r.a.createElement("br",null),"    }",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"return")," arg1 + arg2;",r.a.createElement("br",null),"  }",r.a.createElement("br",null),"}")),r.a.createElement("p",null,"On my machine the method takes around 2 seconds. Experiment with hitting the single-worker and multi-worker versions multiple times in quick succession, and you'll see the benefits of parallel workers!"),r.a.createElement("iframe",{src:"https://blog.krawaller.se/workerdemo/index.html",style:{height:500,width:"100%"}}),r.a.createElement("p",null,"You can run the demo in a standalone tab ",r.a.createElement("a",{href:"https://blog.krawaller.se/workerdemo/"},"here"),", and the demo source code is ",r.a.createElement("a",{href:"https://github.com/krawaller/workerdemo"},"here"),"."),r.a.createElement("h3",{id:"under-the-hood-of-the-wrapper"},"Under the hood of the wrapper"),r.a.createElement("p",null,"You can peruse the full source code for the tool ",r.a.createElement("a",{href:"https://github.com/krawaller/workerwrapper"},"here"),", but in short, the script doing the wrapping works with ",r.a.createElement("strong",null,"two template files"),"."),r.a.createElement("p",null,"Here's the one for the async version:"),r.a.createElement("pre",null,r.a.createElement("code",{className:"hljs"},r.a.createElement("span",{className:"hljs-built_in"},"module"),".exports = ",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function"),"(",r.a.createElement("span",{className:"hljs-params"},"pathToLib, nbrOfWorkers"),")"),"{",r.a.createElement("br",null),r.a.createElement("br",null),"  nbrOfWorkers = nbrOfWorkers || ",r.a.createElement("span",{className:"hljs-number"},"1"),";",r.a.createElement("br",null),r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-keyword"},"var")," workerListeners = {};",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-keyword"},"var")," freeWorkers = [];",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-keyword"},"var")," busyWorkers = [];",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-keyword"},"var")," nextCallId = ",r.a.createElement("span",{className:"hljs-number"},"0"),";",r.a.createElement("br",null),r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function")," ",r.a.createElement("span",{className:"hljs-title"},"freeUpWorker"),"(",r.a.createElement("span",{className:"hljs-params"},"worker"),")"),"{",r.a.createElement("br",null),"    busyWorkers = busyWorkers.filter(",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function"),"(",r.a.createElement("span",{className:"hljs-params"},"w"),")"),"{ ",r.a.createElement("span",{className:"hljs-keyword"},"return")," w !== worker; });",r.a.createElement("br",null),"    freeWorkers.push(worker);",r.a.createElement("br",null),"  }",r.a.createElement("br",null),r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function")," ",r.a.createElement("span",{className:"hljs-title"},"requestWorker"),"(",r.a.createElement("span",{className:"hljs-params"}),")"),"{",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"var")," worker = (freeWorkers.length ? freeWorkers : busyWorkers).shift();",r.a.createElement("br",null),"    busyWorkers.push(worker);",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"return")," worker;",r.a.createElement("br",null),"  }",r.a.createElement("br",null),r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function")," ",r.a.createElement("span",{className:"hljs-title"},"workerMessageHandler"),"(",r.a.createElement("span",{className:"hljs-params"},"e"),")"),"{",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"var")," resultid = e.data[",r.a.createElement("span",{className:"hljs-number"},"0"),"];",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"var")," result = e.data[",r.a.createElement("span",{className:"hljs-number"},"1"),"];",r.a.createElement("br",null),"    workerListeners[resultid](result);",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"delete")," workerListeners[resultid];",r.a.createElement("br",null),"    freeUpWorker(",r.a.createElement("span",{className:"hljs-keyword"},"this"),");",r.a.createElement("br",null),"  }",r.a.createElement("br",null),r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function")," ",r.a.createElement("span",{className:"hljs-title"},"libMethod"),"(",r.a.createElement("span",{className:"hljs-params"},"method"),")"),"{",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"var")," args = ",r.a.createElement("span",{className:"hljs-built_in"},"Array"),".prototype.slice.call(",r.a.createElement("span",{className:"hljs-built_in"},"arguments"),").slice(",r.a.createElement("span",{className:"hljs-number"},"1"),");",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"return")," ",r.a.createElement("span",{className:"hljs-keyword"},"new")," ",r.a.createElement("span",{className:"hljs-built_in"},"Promise"),"(",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function"),"(",r.a.createElement("span",{className:"hljs-params"},"resolve,reject"),")"),"{",r.a.createElement("br",null),"      ",r.a.createElement("span",{className:"hljs-keyword"},"var")," callid = ++nextCallId;",r.a.createElement("br",null),"      ",r.a.createElement("span",{className:"hljs-keyword"},"var")," worker = requestWorker();",r.a.createElement("br",null),"      worker.postMessage([method,callid,args]);",r.a.createElement("br",null),"      workerListeners[callid] = resolve;",r.a.createElement("br",null),"    });",r.a.createElement("br",null),"  }",r.a.createElement("br",null),r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-keyword"},"for"),"(",r.a.createElement("span",{className:"hljs-keyword"},"var")," i=",r.a.createElement("span",{className:"hljs-number"},"0"),"; i<nbrOfWorkers; i++){",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"var")," worker = ",r.a.createElement("span",{className:"hljs-keyword"},"new")," Worker(pathToLib);",r.a.createElement("br",null),"    worker.onmessage = workerMessageHandler;",r.a.createElement("br",null),"    freeUpWorker(worker);",r.a.createElement("br",null),"  }",r.a.createElement("br",null),r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-keyword"},"return")," LIB_METHODS.reduce(",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function"),"(",r.a.createElement("span",{className:"hljs-params"},"mem,method"),")"),"{",r.a.createElement("br",null),"    mem[method] = libMethod.bind(",r.a.createElement("span",{className:"hljs-literal"},"null"),",method);",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-keyword"},"return")," mem;",r.a.createElement("br",null),"  },{});",r.a.createElement("br",null),r.a.createElement("br",null),"};")),r.a.createElement("p",null,"Notice the ",r.a.createElement("code",null,"LIB_METHODS")," at the bottom, which the build script replaces with an array of the methods in the library to be wrapped:"),r.a.createElement("pre",null,r.a.createElement("code",{className:"hljs"},"fs.writeFileSync(",r.a.createElement("br",null),"  pathToLibDir + ",r.a.createElement("span",{className:"hljs-string"},"'/'"),"+libName+",r.a.createElement("span",{className:"hljs-string"},"'_async.js'"),",",r.a.createElement("br",null),"  wrapperTemplate.replace(",r.a.createElement("span",{className:"hljs-string"},"'LIB_METHODS'"),", JSON.stringify(Object.keys(",r.a.createElement("span",{className:"hljs-class"},r.a.createElement("span",{className:"hljs-keyword"},"lib"),")))"),r.a.createElement("br",null),");")),r.a.createElement("p",null,"The template to the worker file is much simpler:"),r.a.createElement("pre",null,r.a.createElement("code",{className:"hljs"},r.a.createElement("span",{className:"hljs-keyword"},"var")," lib = ",r.a.createElement("span",{className:"hljs-built_in"},"require"),"(",r.a.createElement("span",{className:"hljs-string"},"'PATH_TO_LIB'"),");",r.a.createElement("br",null),r.a.createElement("br",null),"onmessage = ",r.a.createElement("span",{className:"hljs-function"},r.a.createElement("span",{className:"hljs-keyword"},"function"),"(",r.a.createElement("span",{className:"hljs-params"},"e"),")"),"{",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-keyword"},"var")," method = e.data[",r.a.createElement("span",{className:"hljs-number"},"0"),"];",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-keyword"},"var")," callid = e.data[",r.a.createElement("span",{className:"hljs-number"},"1"),"];",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-keyword"},"var")," args = e.data[",r.a.createElement("span",{className:"hljs-number"},"2"),"];",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-keyword"},"var")," result = lib[method].apply(lib,args);",r.a.createElement("br",null),"  postMessage([callid,result]);",r.a.createElement("br",null),"}")),r.a.createElement("p",null,"The script uses webpack to bundle the library into the template."),r.a.createElement("pre",null,r.a.createElement("code",{className:"hljs"},"fs.writeFileSync(pathToTempFile, workerTemplate.",r.a.createElement("span",{className:"hljs-meta"},"replace"),"(",r.a.createElement("span",{className:"hljs-string"},"'PATH_TO_LIB'"),", pathToLib));",r.a.createElement("br",null),r.a.createElement("br",null),"var compiler = webpack({",r.a.createElement("br",null),"  entry: pathToTempFile,",r.a.createElement("br",null),"  ",r.a.createElement("span",{className:"hljs-meta"},"output"),": {",r.a.createElement("br",null),"    path: pathToLibDir,",r.a.createElement("br",null),"    ",r.a.createElement("span",{className:"hljs-meta"},"filename"),": ",r.a.createElement("span",{className:"hljs-meta"},"libName")," + ",r.a.createElement("span",{className:"hljs-string"},"'_worker.js'"),r.a.createElement("br",null),"  },",r.a.createElement("br",null),"  resolve: {",r.a.createElement("br",null),"    extensions: [",r.a.createElement("span",{className:"hljs-string"},'".js"'),"]",r.a.createElement("br",null),"  }",r.a.createElement("br",null),"});",r.a.createElement("br",null),r.a.createElement("br",null),"compiler.r",r.a.createElement("span",{className:"hljs-meta"},"un("),"functi",r.a.createElement("span",{className:"hljs-meta"},"on("),"err,stats){",r.a.createElement("br",null),"  var ",r.a.createElement("span",{className:"hljs-meta"},"message")," = stats.toString(",r.a.createElement("span",{className:"hljs-string"},'"errors-only"'),") || ",r.a.createElement("span",{className:"hljs-string"},"'Webworker file created at '"),"+pathToLibDir+",r.a.createElement("span",{className:"hljs-string"},"'/'"),"+",r.a.createElement("span",{className:"hljs-meta"},"libName")," + ",r.a.createElement("span",{className:"hljs-string"},"'_worker.js'"),";",r.a.createElement("br",null),"  console",r.a.createElement("span",{className:"hljs-meta"},".log("),r.a.createElement("span",{className:"hljs-meta"},"message"),");",r.a.createElement("br",null),"  fs.unlinkSync(pathToTempFile);",r.a.createElement("br",null),"});")),r.a.createElement("p",null,"Refer to the ",r.a.createElement("a",{href:"https://github.com/krawaller/workerwrapper"},"source code")," for the full truth."),r.a.createElement("h3",{id:"wrapping-up"},"Wrapping up"),r.a.createElement("p",null,"Pun very much intented."),r.a.createElement("p",null,"Is a stand-alone tool to do this really needed? Likely not, but I had fun, and it felt good to be able to remove all the wrapping code from the repo of the library I was working on."),r.a.createElement("p",null,"Which is also the library I should immediately go back to work on, if I want to keep my job.")),r.a.createElement("hr",null))}}},[["Nf/3",1,0]]]);