(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{LzJH:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/react-js-architecture-flux-vs-reflux",function(){var e=t("ypdZ");return{page:e.default||e}}])},ypdZ:function(e,a,t){"use strict";t.r(a);var l=t("q1tI"),n=t.n(l),s=t("JRaF"),r=t("YFqc"),c=t.n(r),m={url:"react-js-architecture-flux-vs-reflux",id:"fluxvsreflux",title:"React.js architecture - Flux VS Reflux",author:"david",tags:["react","reflux"],date:"2014-09-06",excerpt:"Comparing two architectures for React.js apps: Flux, and the Reflux adaption",type:"post",folder:"/Users/davidwaller/gitreps/mine/blog2/sources/2014-09-06_fluxvsreflux",hasStaticContent:!0,headlines:[{level:3,text:"Flustered with Flux",id:"flustered-with-flux"},{level:3,text:"Discovering Reflux",id:"discovering-reflux"},{level:3,text:"Flux VS Reflux",id:"flux-vs-reflux"},{level:3,text:"Comparing dependencies",id:"comparing-dependencies"},{level:3,text:"Comparing component calling actions",id:"comparing-component-calling-actions"},{level:3,text:"Comparing component listening to store changes",id:"comparing-component-listening-to-store-changes"},{level:3,text:"Comparing stores",id:"comparing-stores"},{level:3,text:"Comparing actions",id:"comparing-actions"},{level:3,text:"Comparing AppDispatchers",id:"comparing-appdispatchers"},{level:3,text:"Wrapping up",id:"wrapping-up"}]};a.default=function(){return n.a.createElement(s.a,{kind:"post",data:m,title:"React.js architecture - Flux VS Reflux",summary:"Comparing two architectures for React.js apps: Flux, and the Reflux adaption",headlines:[{level:3,text:"Flustered with Flux",id:"flustered-with-flux"},{level:3,text:"Discovering Reflux",id:"discovering-reflux"},{level:3,text:"Flux VS Reflux",id:"flux-vs-reflux"},{level:3,text:"Comparing dependencies",id:"comparing-dependencies"},{level:3,text:"Comparing component calling actions",id:"comparing-component-calling-actions"},{level:3,text:"Comparing component listening to store changes",id:"comparing-component-listening-to-store-changes"},{level:3,text:"Comparing stores",id:"comparing-stores"},{level:3,text:"Comparing actions",id:"comparing-actions"},{level:3,text:"Comparing AppDispatchers",id:"comparing-appdispatchers"},{level:3,text:"Wrapping up",id:"wrapping-up"}],tags:["react","reflux"]},n.a.createElement("div",{className:"post","data-postid":"fluxvsreflux"},n.a.createElement("p",null,n.a.createElement("span",{style:{color:"red"}},n.a.createElement("strong",null,"NOTE:")," Reflux has gotten even leaner since this post was written. Read the ",n.a.createElement(c.a,{href:"/posts/reflux-refinement",prefetch:!0},n.a.createElement("a",null,"follow-up post"))," for more details!")),n.a.createElement("p",null,n.a.createElement("span",{style:{color:"red"}},n.a.createElement("strong",null,"NOTE2:")," It was fun while it lasted but now I'm really smitten with ",n.a.createElement(c.a,{href:"/posts/a-react-redux-example-app",prefetch:!0},n.a.createElement("a",null,"a new shiny toy - Redux")),"!")),n.a.createElement("h3",{id:"flustered-with-flux"},"Flustered with Flux"),n.a.createElement("p",null,"Recently I've been trying to wrap my brain around using the ",n.a.createElement("a",{href:"http://facebook.github.io/react/docs/flux-overview.html"},"Flux architecture")," in a React.js app. I watched the vids, read the blogs, went through ",n.a.createElement("a",{href:"https://egghead.io/series/react-flux-architecture"},"Egghead's excellent tutorial series")," on the subject, but still didn't feel entirely comfortable."),n.a.createElement("p",null,"One of the big wins of React for me was how easy it was to grasp. Understand the difference between properties and state, and BOOM - you're done. While with Angular, for example, you have to grokk all of ",n.a.createElement("a",{href:"https://docs.angularjs.org/guide/concepts"},"this")," before you can even get started."),n.a.createElement("p",null,"Flux goes a long way to destroy the React advantage, as it comes with a high cognitive price tag much like Angular et al. Here's Facebook's picture to explain the Flux way:"),n.a.createElement("p",null,n.a.createElement("img",{src:"/static/posts/react-js-architecture-flux-vs-reflux/img/flux-diagram.png",alt:"Flux architecture"})),n.a.createElement("p",null,"Maybe I'm not the sharpest bulb in the box, but this diagram just doesn't speak to me!"),n.a.createElement("h3",{id:"discovering-reflux"},"Discovering Reflux"),n.a.createElement("p",null,"Looking for options I came across ",n.a.createElement("a",{href:"https://github.com/spoike/refluxjs"},"Reflux")," by ",n.a.createElement("a",{href:"http://spoike.ghost.io/"},"Mikael Brassman a.k.a. Spoike"),", and was immediately smitten! Reflux takes the Flux approach and streamlines it, making it both easier to work with and easier to grasp."),n.a.createElement("p",null,"The official docs and a quick perusal of the ",n.a.createElement("a",{href:"https://github.com/spoike/refluxjs-todo"},"Reflux implementation of the TodoMVC app")," was a great primer, as there really isn't much to it. Still I wanted to explore the difference with regards to Flux more concretely!"),n.a.createElement("h3",{id:"flux-vs-reflux"},"Flux VS Reflux"),n.a.createElement("p",null,"While following along with Egghead's tutorial I had just built a small Flux app, so I decided to Refluxify it and see what happened. And it really felt like a big win! The code was shorter, the modules fewer and the couplings easier to track."),n.a.createElement("p",null,"Granted, I don't know if Egghead's code is the best possible example of Flux architecture, but I feel most of their stuff has a very high level of quality so it should be somewhat representative."),n.a.createElement("p",null,"Either way I thought the switch-out was interesting, and will be walking through it below."),n.a.createElement("h3",{id:"comparing-dependencies"},"Comparing dependencies"),n.a.createElement("p",null,"First off, using Reflux means requiring the ",n.a.createElement("code",null,"Reflux")," library, installable by npm as usual. Flux is pitched as an architecture and not a library, but you need the ",n.a.createElement("a",{href:"https://github.com/facebook/flux/blob/master/src/Dispatcher.js"},"Dispatcher")," which you then adapt to your app."),n.a.createElement("p",null,"Thus the net effect is really that in the Reflux version I change out ",n.a.createElement("code",null,"Dispatcher")," for ",n.a.createElement("code",null,"Reflux"),"."),n.a.createElement("h3",{id:"comparing-component-calling-actions"},"Comparing component calling actions"),n.a.createElement("p",null,"For components calling actions, the code is completely identical. Here's a button increasing the quoty for an item in the shopping cart."),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"var")," Increase = React.createClass({",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"handleClick"),": ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"}),") "),"{",n.a.createElement("br",null),"    appActions.increaseItem(",n.a.createElement("span",{className:"hljs-keyword"},"this"),".props.index);",n.a.createElement("br",null),"  }",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-comment"},"// rest redacted"),n.a.createElement("br",null),"});")),n.a.createElement("p",null,"The Flux and Reflux versions are exactly the same, apart from requiring different versions of ",n.a.createElement("code",null,"appActions"),". All they do is call the relevant action function, in this case with an index as data."),n.a.createElement("h3",{id:"comparing-component-listening-to-store-changes"},"Comparing component listening to store changes"),n.a.createElement("p",null,"Now let's compare components who are listening to changes from a store, where there are slight differences between Flux and Reflux. First the Flux version:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},n.a.createElement("span",{className:"hljs-keyword"},"var")," Cart = React.createClass({",n.a.createElement("br",null),"  componentDidMount:",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),n.a.createElement("span",{className:"hljs-params"},"()")),"{",n.a.createElement("br",null),"    appStore.addChangeListener(",n.a.createElement("span",{className:"hljs-keyword"},"this"),"._onStuffChange)",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-comment"},"// rest redacted"),n.a.createElement("br",null),"});")),n.a.createElement("p",null,"In ",n.a.createElement("code",null,"componentDidMount")," we add a change listener, which then takes care of the rest."),n.a.createElement("p",null,"Now for the Reflux version:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},n.a.createElement("span",{className:"hljs-keyword"},"var")," Cart = React.createClass({",n.a.createElement("br",null),"  mixins: [Reflux.ListenerMixin],",n.a.createElement("br",null),"  componentDidMount: ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),n.a.createElement("span",{className:"hljs-params"},"()")," "),"{",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"this"),".listenTo(appStore, ",n.a.createElement("span",{className:"hljs-keyword"},"this"),"._onStuffChange);",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-comment"},"// rest redacted"),n.a.createElement("br",null),"});")),n.a.createElement("p",null,"The versions are still very similar. The Reflux version uses a ",n.a.createElement("code",null,"ListenerMixin")," which supplies a ",n.a.createElement("code",null,".listenTo")," method, which is called in ",n.a.createElement("code",null,"componentDidMount")," with the store as an argument. Other than that the code is the same as for the Flux version."),n.a.createElement("h3",{id:"comparing-stores"},"Comparing stores"),n.a.createElement("p",null,"Now for the interesting stuff! Below is the code for the Flux store."),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"var")," appStore = merge(EventEmitter.prototype, {",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"emitChange"),":",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"}),")"),"{",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"this"),".emit(CHANGE_EVENT)",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"addChangeListener"),":",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"callback"),")"),"{",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-comment"},"//this.on(CHANGE_EVENT, callback)"),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"this"),".addListener(CHANGE_EVENT, callback)",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"removeChangeListener"),":",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"callback"),")"),"{",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"this"),".removeListener(CHANGE_EVENT, callback)",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"dispatcherIndex"),":AppDispatcher.register(",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"payload"),")"),"{",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"var")," action = payload.action;",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"switch"),"(action.actionType){",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-keyword"},"case")," AppConstants.ADD_ITEM:",n.a.createElement("br",null),"        _addItem(payload.action.item);",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"break"),";",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-keyword"},"case")," AppConstants.REMOVE_ITEM:",n.a.createElement("br",null),"        _removeItem(payload.action.index);",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"break"),";",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-keyword"},"case")," AppConstants.INCREASE_ITEM:",n.a.createElement("br",null),"        _increaseItem(payload.action.index);",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"break"),";",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-keyword"},"case")," AppConstants.DECREASE_ITEM:",n.a.createElement("br",null),"        _decreaseItem(payload.action.index);",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"break"),";",n.a.createElement("br",null),"    }",n.a.createElement("br",null),"    appStore.emitChange();",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"return")," ",n.a.createElement("span",{className:"hljs-literal"},"true"),";",n.a.createElement("br",null),"  }),",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-comment"},"// rest redacted"),n.a.createElement("br",null),");")),n.a.createElement("p",null,"And here's the corresponding Reflux store:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"Reflux.createStore({",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"init"),": ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"}),") "),"{",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"this"),".listenTo(actions.addItem, _addItem);",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"this"),".listenTo(actions.removeItem, _removeItem);",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"this"),".listenTo(actions.increaseItem, _increaseItem);",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"this"),".listenTo(actions.decreaseItem, _decreaseItem);",n.a.createElement("br",null),"  }",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-comment"},"// rest redacted"),n.a.createElement("br",null),"});")),n.a.createElement("p",null,"The simpler structure of Reflux is beginning to shine!"),n.a.createElement("h3",{id:"comparing-actions"},"Comparing actions"),n.a.createElement("p",null,"The actions in the Flux version are rather verbose:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"var")," appActions = {",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"addItem"),": ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"item"),") "),"{",n.a.createElement("br",null),"    AppDispatcher.handleViewAction({",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-attr"},"actionType"),": AppConstants.ADD_ITEM,",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-attr"},"item"),": item",n.a.createElement("br",null),"    });",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"removeItem"),": ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"index"),") "),"{",n.a.createElement("br",null),"    AppDispatcher.handleViewAction({",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-attr"},"actionType"),": AppConstants.REMOVE_ITEM,",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-attr"},"index"),": index",n.a.createElement("br",null),"    });",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"decreaseItem"),": ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"index"),") "),"{",n.a.createElement("br",null),"    AppDispatcher.handleViewAction({",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-attr"},"actionType"),": AppConstants.DECREASE_ITEM,",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-attr"},"index"),": index",n.a.createElement("br",null),"    });",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"increaseItem"),": ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"index"),") "),"{",n.a.createElement("br",null),"    AppDispatcher.handleViewAction({",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-attr"},"actionType"),": AppConstants.INCREASE_ITEM,",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-attr"},"index"),": index",n.a.createElement("br",null),"    });",n.a.createElement("br",null),"  }",n.a.createElement("br",null),"};")),n.a.createElement("p",null,"While in Reflux they're absolutely not:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"var")," appActions = Reflux.createActions([",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-string"},'"addItem"'),",",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-string"},'"removeItem"'),",",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-string"},'"decreaseItem"'),",",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-string"},'"increaseItem"'),n.a.createElement("br",null),"]);")),n.a.createElement("h3",{id:"comparing-appdispatchers"},"Comparing AppDispatchers"),n.a.createElement("p",null,"Fist the Flux version:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"var")," AppDispatcher = merge(Dispatcher.prototype, {",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"handleViewAction"),": ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"action"),") "),"{",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"this"),".dispatch({",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-attr"},"source"),": ",n.a.createElement("span",{className:"hljs-string"},'"VIEW_ACTION"'),",",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-attr"},"action"),": action",n.a.createElement("br",null),"    });",n.a.createElement("br",null),"  }",n.a.createElement("br",null),"});")),n.a.createElement("p",null,"And now the Reflux version:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-comment"},"// Unicorns and rainbows!"))),n.a.createElement("p",null,"That's right - Reflux does away entirely with the concept of an app-specific dispatcher."),n.a.createElement("h3",{id:"wrapping-up"},"Wrapping up"),n.a.createElement("p",null,"Probably Flux proponents can find many things being not entirely fair in this comparison, but for me, changing to Reflux made me breathe easier. The code is sleek, and I have a firm grasp of how the parts are wired. Components listen to stores and call actions. Stores listen to actions and toot when they're updated. Simple as that!"),n.a.createElement("img",{src:"/static/posts/react-js-architecture-flux-vs-reflux/img/reflux-flow.jpg",style:{marginLeft:"4em",maxHeight:300}}),n.a.createElement("p",null,"I've glanced at some other Flux-inspired libraries, of which there are many. So far Reflux seems to be the most solid option, and I'm excited to follow along in its continued development!")),n.a.createElement("hr",null))}}},[["LzJH",1,0]]]);