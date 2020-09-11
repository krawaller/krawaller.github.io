(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{IUmq:function(e,a,t){"use strict";t.r(a);var l=t("q1tI"),n=t.n(l),s=t("JRaF"),r=(t("YFqc"),{url:"building-todomvc-with-callbags-and-react",id:"callbagreact",type:"post",title:"Building TodoMVC with Callbags and React",date:"2018-05-07",tags:["callbags","react","redux","case study","todomvc"],author:"david",excerpt:"Making a TodoMVC implementation using Callbags and React, introducing the needed tools as we go!",folder:"/Users/davidwaller/gitreps/mine/blog2/sources/2018-05-04_callbagreact",hasStaticContent:!0,headlines:[{level:3,text:"Premise",id:"premise"},{level:3,text:"The old app",id:"the-old-app"},{level:3,text:"The three problems",id:"the-three-problems"},{level:3,text:"Problem 1 - catching DOM events",id:"problem-1-catching-dom-events"},{level:3,text:"Introducing `callbag-from-function`",id:"introducing-callbagfromfunction"},{level:3,text:"Problem 2 - rerendering on new state",id:"problem-2-rerendering-on-new-state"},{level:3,text:"Introducing `callbag-connect-react`",id:"introducing-callbagconnectreact"},{level:3,text:"Problem 3 - other side effects",id:"problem-3-other-side-effects"},{level:3,text:"Introducing signals",id:"introducing-signals"},{level:3,text:"The final result",id:"the-final-result"},{level:3,text:"Wrapping up",id:"wrapping-up"}]});a.default=function(){return n.a.createElement(s.a,{kind:"post",data:r,title:"Building TodoMVC with Callbags and React",summary:"Making a TodoMVC implementation using Callbags and React, introducing the needed tools as we go!",headlines:[{level:3,text:"Premise",id:"premise"},{level:3,text:"The old app",id:"the-old-app"},{level:3,text:"The three problems",id:"the-three-problems"},{level:3,text:"Problem 1 - catching DOM events",id:"problem-1-catching-dom-events"},{level:3,text:"Introducing `callbag-from-function`",id:"introducing-callbagfromfunction"},{level:3,text:"Problem 2 - rerendering on new state",id:"problem-2-rerendering-on-new-state"},{level:3,text:"Introducing `callbag-connect-react`",id:"introducing-callbagconnectreact"},{level:3,text:"Problem 3 - other side effects",id:"problem-3-other-side-effects"},{level:3,text:"Introducing signals",id:"introducing-signals"},{level:3,text:"The final result",id:"the-final-result"},{level:3,text:"Wrapping up",id:"wrapping-up"}],tags:["callbags","react","redux","case study","todomvc"]},n.a.createElement("div",{className:"post","data-postid":"callbagreact"},n.a.createElement("h3",{id:"premise"},"Premise"),n.a.createElement("p",null,"A while back I wrote about a ",n.a.createElement("a",{href:"/dissecting-a-callbag-todomvc-implementation/"},"TodoMVC implementation using Callbags"),". It used ",n.a.createElement("a",{href:"https://github.com/snabbdom/snabbdom"},"SnabbDOM")," for rendering, and thus didn't really need to address the problem of how to marry Callbags with an actual framework."),n.a.createElement("p",null,"In this post we take on that challenge through rewriting the TodoMVC solution to use React instead! The code for the final result is available at ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc-react"},"https://github.com/krawaller/callbag-todomvc-react"),", but we'll walk through the highlights below."),n.a.createElement("h3",{id:"the-old-app"},"The old app"),n.a.createElement("p",null,"Let's begin by reviewing what we already have. The ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc"},"previous implementation")," was built like this..."),n.a.createElement("p",null,n.a.createElement("img",{src:"/static/posts/building-todomvc-with-callbags-and-react/diagrams/callbag-mvi.svg",alt:""})),n.a.createElement("p",null,"...which translates to ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc/blob/master/src/index.js"},"this bootstrapping code"),":"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," actions = makeActions(",n.a.createElement("span",{className:"hljs-built_in"},"window"),", ",n.a.createElement("span",{className:"hljs-built_in"},"window"),".document.getElementById(",n.a.createElement("span",{className:"hljs-string"},"'app'"),"));",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," state = makeStateStream(actions);",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," view = makeViewStream(state);",n.a.createElement("br",null),n.a.createElement("br",null),"makeSideEffects(",n.a.createElement("span",{className:"hljs-built_in"},"window"),", actions, view);")),n.a.createElement("p",null,"Here's a brief rundown of the involved functions:"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"In ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc/blob/master/src/actions.js"},n.a.createElement("code",null,"makeActions"))," we create a bunch of action streams by using ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-from-delegated-event"},n.a.createElement("code",null,"callbag-from-delegated-event")),". Here's an example:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," newTodoActions = pipe(",n.a.createElement("br",null),"  fromDelegatedEvent(root, ",n.a.createElement("span",{className:"hljs-string"},"'.new-todo'"),", ",n.a.createElement("span",{className:"hljs-string"},"'keyup'"),"),",n.a.createElement("br",null),"  filter(",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-params"},"e")," =>")," e.key === ",n.a.createElement("span",{className:"hljs-string"},"'Enter'"),"),",n.a.createElement("br",null),"  mapTo({",n.a.createElement("span",{className:"hljs-attr"},"type"),": ",n.a.createElement("span",{className:"hljs-string"},"'NEWTODO'"),"}),",n.a.createElement("br",null),");")),n.a.createElement("p",null,"The function returns all of the action streams in an object, and throw in an ",n.a.createElement("code",null,"allActions")," stream for good measure.")),n.a.createElement("li",null,n.a.createElement("p",null,"The ",n.a.createElement("a",{href:""},n.a.createElement("code",null,"makeState"))," function turns the actions into a stream of app state:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function")," ",n.a.createElement("span",{className:"hljs-title"},"makeStateStream"),"(",n.a.createElement("span",{className:"hljs-params"},"actions"),")"),"{",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"return")," pipe(",n.a.createElement("br",null),"    actions.allActions,",n.a.createElement("br",null),"    scan(augmenter(reducer), initialState),",n.a.createElement("br",null),"  );",n.a.createElement("br",null),"}")),n.a.createElement("p",null,"The ",n.a.createElement("a",{href:"https://github.com/staltz/callbag-scan"},n.a.createElement("code",null,"callbag-scan"))," operator reduces the stream, which means the end result of this file is a miniature Redux implementation.")),n.a.createElement("li",null,n.a.createElement("p",null,"The ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc/blob/master/src/view.js"},n.a.createElement("code",null,"makeView"))," function simply maps the state emissions to JSX:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function")," ",n.a.createElement("span",{className:"hljs-title"},"makeViewStream"),"(",n.a.createElement("span",{className:"hljs-params"},"state"),")"),"{",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"return")," pipe(",n.a.createElement("br",null),"    state,",n.a.createElement("br",null),"    map(",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-params"},"s")," =>")," (",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"xml"},n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"div"),">"),n.a.createElement("br",null),"        ...",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-tag"},"</",n.a.createElement("span",{className:"hljs-name"},"div"),">")),n.a.createElement("br",null),"    ))",n.a.createElement("br",null),"  );",n.a.createElement("br",null),"}")),n.a.createElement("p",null,"This really is just a templating layer - we're not dealing with event handlers or anything of the sort, we just express what the UI should look like given the state. In other words we could very easily replace SnabbDOM with something like Handlebars.")),n.a.createElement("li",null,n.a.createElement("p",null,"Inside ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc/blob/master/src/sideeffects.js"},n.a.createElement("code",null,"makeSideEffects"))," we do three things:"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"update the DOM for all ",n.a.createElement("code",null,"view")," emissions (using SnabbDOM), getting the DOM reference from ",n.a.createElement("code",null,"window"),":"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},"window",n.a.createElement("span",{className:"hljs-selector-class"},".document"),n.a.createElement("span",{className:"hljs-selector-class"},".getElementById"),"(",n.a.createElement("span",{className:"hljs-string"},"'renderoutput'"),")"))),n.a.createElement("li",null,n.a.createElement("p",null,"focus the edit Todo input on emissions from ",n.a.createElement("code",null,"actions.editActions"),":"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"pipe(",n.a.createElement("br",null),"  actions.editActions,",n.a.createElement("br",null),"  forEach(",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-params"},"()")," =>")," ",n.a.createElement("span",{className:"hljs-built_in"},"window"),".document.querySelector(",n.a.createElement("span",{className:"hljs-string"},'".editing .edit"'),").focus())",n.a.createElement("br",null),");"))),n.a.createElement("li",null,n.a.createElement("p",null,"focus the new Todo input on emissions from a bunch of actions in a similar manner as above"))))),n.a.createElement("h3",{id:"the-three-problems"},"The three problems"),n.a.createElement("p",null,"As you've seen, we're reading and writing to the DOM throughout our solution. Which of course rhymes rather badly with a framework, which wants to own the DOM and expects you to express your intentions through the framework instead!"),n.a.createElement("p",null,"All things considered, we have ",n.a.createElement("strong",null,"3 problems to solve")," in order to be able to use React efficiently:"),n.a.createElement("ol",null,n.a.createElement("li",null,"We need to let React capture our DOM events"),n.a.createElement("li",null,"We need to make React rerender when there's new state"),n.a.createElement("li",null,"We need to make React do the other focusing side effects")),n.a.createElement("p",null,"We'll now walk through these one at a time!"),n.a.createElement("h3",{id:"problem-1---catching-dom-events"},"Problem 1 - catching DOM events"),n.a.createElement("p",null,"Let's start with the events! As you saw above, the action streams are seeded with a source created from ",n.a.createElement("code",null,"fromDelegatedEvent"),", which sets a listener directly on the DOM."),n.a.createElement("p",null,"But, in React we are expected to reference our handlers in the render output!"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-html"},n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"button")," ",n.a.createElement("span",{className:"hljs-attr"},"onClick"),"=",n.a.createElement("span",{className:"hljs-string"},"{this.launchMissile}"),">"),"Launch",n.a.createElement("span",{className:"hljs-tag"},"</",n.a.createElement("span",{className:"hljs-name"},"button"),">"))),n.a.createElement("p",null,"In a situation where we use Redux, we would probably call an action creator in that handler:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"launchMissile(e){",n.a.createElement("br",null),"  boundActionCreators.triggerLaunch();",n.a.createElement("br",null),"}")),n.a.createElement("p",null,"We want to do something very similar now, but, what does that translate to when we have Callbags instead of Redux?"),n.a.createElement("h3",{id:"introducing-callbag-from-function"},"Introducing ",n.a.createElement("code",null,"callbag-from-function")),n.a.createElement("p",null,"There are two facts we cannot escape:"),n.a.createElement("ul",null,n.a.createElement("li",null,"React connects a DOM event with a function"),n.a.createElement("li",null,"The action streams must start with a source")),n.a.createElement("p",null,"In other words - we need the missing piece in this chain:"),n.a.createElement("p",null,n.a.createElement("img",{src:"/static/posts/building-todomvc-with-callbags-and-react/diagrams/callbag-from-function-chain.svg",alt:""})),n.a.createElement("p",null,"To solve this I made ",n.a.createElement("code",null,"callbag-from-function")," - it is a factory function that takes a function (or defaults to the identity function), and returns an emitter and a source:"),n.a.createElement("p",null,n.a.createElement("img",{src:"/static/posts/building-todomvc-with-callbags-and-react/diagrams/callbag-from-function-api.svg",alt:""})),n.a.createElement("p",null,"The emitter behaves exactly like the passed-in function, except it will also make the source emit all returned values."),n.a.createElement("p",null,"In the React version of the app I've added an ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc-react/blob/master/src/data/events.js"},n.a.createElement("code",null,"events.js"))," file looking like this:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"import")," fromFunction ",n.a.createElement("span",{className:"hljs-keyword"},"from")," ",n.a.createElement("span",{className:"hljs-string"},"'callbag-from-function'"),";",n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"export")," ",n.a.createElement("span",{className:"hljs-keyword"},"default")," {",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"clearCompleted"),": fromFunction(),",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-comment"},"// ... lots more ..."),n.a.createElement("br",null),"}")),n.a.createElement("p",null,"In the React app we'd then use the emitter as handler in the JSX output from ",n.a.createElement("code",null,"render"),"..."),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"<button onClick={clearCompleted.emitter}>Clear completed<",n.a.createElement("span",{className:"hljs-regexp"},"/button>"))),n.a.createElement("p",null,"...and in the new version of ",n.a.createElement("code",null,"makeActions")," we'd seed the relevant stream thusly:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," clearCompletedActions = pipe(",n.a.createElement("br",null),"  clearCompleted.source, ",n.a.createElement("span",{className:"hljs-comment"},"// <--- instead of using `fromDelegatedEvent`"),n.a.createElement("br",null),"  mapTo({",n.a.createElement("span",{className:"hljs-attr"},"type"),": ",n.a.createElement("span",{className:"hljs-string"},"'CLEARCOMPLETED'"),"})",n.a.createElement("br",null),");")),n.a.createElement("p",null,"And so we have solved problem number 1 - DOM events are now handled by React, yet still piped into the Callbag layer!"),n.a.createElement("h3",{id:"problem-2---rerendering-on-new-state"},"Problem 2 - rerendering on new state"),n.a.createElement("p",null,"In the earlier solution, rerendering is one of the side effects dealt with in ",n.a.createElement("code",null,"makeSideEffects"),":"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"pipe(",n.a.createElement("br",null),"  withPrevious(view),",n.a.createElement("br",null),"  forEach(",n.a.createElement("span",{className:"hljs-function"},"(",n.a.createElement("span",{className:"hljs-params"},"[cur,prev,isFirst]"),") =>")," {",n.a.createElement("br",null),"    patch(isFirst ? ",n.a.createElement("span",{className:"hljs-built_in"},"window"),".document.getElementById(",n.a.createElement("span",{className:"hljs-string"},"'renderoutput'"),") : prev, cur)",n.a.createElement("br",null),"  })",n.a.createElement("br",null),");")),n.a.createElement("p",null,"There's some SnabbDOM shenanigans going on here, but the essence is that whenever the ",n.a.createElement("code",null,"view")," stream outputs a new VirtualDOM emission, we mutate the DOM."),n.a.createElement("p",null,"In React we instead want our ",n.a.createElement("code",null,"App")," component to rerender, presumably by passing in new props. How do we accomplish that?"),n.a.createElement("h3",{id:"introducing-callbag-connect-react"},"Introducing ",n.a.createElement("code",null,"callbag-connect-react")),n.a.createElement("p",null,"The situation is very similar to using Redux with React - if we have Redux as a data layer, then we want to rerender our React app whenever the store has new data. Commonly we'd use ",n.a.createElement("a",{href:"https://github.com/reactjs/react-redux"},n.a.createElement("code",null,"ReactRedux"))," to automatically pass that data into the top of our component pyramid as props."),n.a.createElement("p",null,"I've created a very similar decorator tool for Callbags, published in the npm package ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-connect-react"},n.a.createElement("code",null,"callbag-connect-react")),". We feed the decorator an object where..."),n.a.createElement("ul",null,n.a.createElement("li",null,"each ",n.a.createElement("strong",null,"key")," is a ",n.a.createElement("strong",null,"prop name")),n.a.createElement("li",null,"each ",n.a.createElement("strong",null,"value")," is a ",n.a.createElement("strong",null,"callbag")," whose emissions will populate the prop named by the key.")),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"@connect({",n.a.createElement("span",{className:"hljs-attr"},"appState"),": stateStream})",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-class"},n.a.createElement("span",{className:"hljs-keyword"},"class")," ",n.a.createElement("span",{className:"hljs-title"},"App")," ",n.a.createElement("span",{className:"hljs-keyword"},"extends")," ",n.a.createElement("span",{className:"hljs-title"},"React"),".",n.a.createElement("span",{className:"hljs-title"},"Component")," "),"{",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-comment"},"// ...implementation using `this.props.appState`"),n.a.createElement("br",null),"}")),n.a.createElement("p",null,"With the above code, the ",n.a.createElement("code",null,"appState")," prop will always update to whatever ",n.a.createElement("code",null,"stateStream")," emits."),n.a.createElement("p",null,"And so we have solved the rendering problem - our React component will now rerender for every new state emission!"),n.a.createElement("h3",{id:"problem-3---other-side-effects"},"Problem 3 - other side effects"),n.a.createElement("p",null,"That took care of one of the side effects, but we have two left; focusing input fields at various points in the component life cycle. They're both very similar, so I'll just talk through one of them here. In the final app they both benefit from the same solution."),n.a.createElement("p",null,"The old code in ",n.a.createElement("code",null,"makeSideEffects")," looks like this:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"pipe(",n.a.createElement("br",null),"  actions.editActions,",n.a.createElement("br",null),"  forEach(",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-params"},"()")," =>")," ",n.a.createElement("span",{className:"hljs-built_in"},"window"),".document.querySelector(",n.a.createElement("span",{className:"hljs-string"},'".editing .edit"'),").focus())",n.a.createElement("br",null),");")),n.a.createElement("p",null,"Here's the kicker - there's ",n.a.createElement("strong",null,"no analogue for this in Redux"),". Redux is built around the notion that we have a single source that is fed into the app, causing a rerender each time. But what we have here is a ",n.a.createElement("em",null,"different")," source, where we want something ",n.a.createElement("em",null,"other than rendering")," to happen."),n.a.createElement("p",null,"We can move the actual focusing call to a ",n.a.createElement("code",null,".focusEditField")," method in the component easily enough:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-class"},n.a.createElement("span",{className:"hljs-keyword"},"class")," ",n.a.createElement("span",{className:"hljs-title"},"App")," ",n.a.createElement("span",{className:"hljs-keyword"},"extends")," ",n.a.createElement("span",{className:"hljs-title"},"React"),".",n.a.createElement("span",{className:"hljs-title"},"Component")," "),"{",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"constructor"),"(props){",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"super"),"(props);",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"this"),".editField = React.createRef();",n.a.createElement("br",null),"  }",n.a.createElement("br",null),"  focusEditField(){",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"this"),".editField.current.focus();",n.a.createElement("br",null),"  }",n.a.createElement("br",null),"  render(){",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"return")," (",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-comment"},"// JSX using `this.editField` as ref for the relevant input element"),n.a.createElement("br",null),"    );",n.a.createElement("br",null),"  }",n.a.createElement("br",null),"}")),n.a.createElement("p",null,"But how do we make it so that ",n.a.createElement("code",null,".focusEditField")," is called when ",n.a.createElement("code",null,"editActions")," emit?"),n.a.createElement("h3",{id:"introducing-signals"},"Introducing signals"),n.a.createElement("p",null,"To handle this I've made ",n.a.createElement("code",null,"connect")," also take a second parameter; an array of what I call ",n.a.createElement("strong",null,"signals"),"."),n.a.createElement("p",null,"Each signal is an ",n.a.createElement("strong",null,"array of two elements"),":"),n.a.createElement("ul",null,n.a.createElement("li",null,"the first is a ",n.a.createElement("strong",null,"callbag source")),n.a.createElement("li",null,"the second is a ",n.a.createElement("strong",null,"callback function")," to be invoked when that source emits. That callback will be invoked with...",n.a.createElement("ul",null,n.a.createElement("li",null,"a reference to the ",n.a.createElement("strong",null,"component instance")),n.a.createElement("li",null,"the ",n.a.createElement("strong",null,"value that was emitted")," from the source (not used below)")))),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"@connect(",n.a.createElement("br",null),"  {",n.a.createElement("span",{className:"hljs-attr"},"appState"),": stateStream},",n.a.createElement("br",null),"  [ [actions.editActions, comp => comp.focusEdit()] ]",n.a.createElement("br",null),")",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-class"},n.a.createElement("span",{className:"hljs-keyword"},"class")," ",n.a.createElement("span",{className:"hljs-title"},"App")," ",n.a.createElement("span",{className:"hljs-keyword"},"extends")," ",n.a.createElement("span",{className:"hljs-title"},"React"),".",n.a.createElement("span",{className:"hljs-title"},"Component")," "),"{",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-comment"},"// ..."),n.a.createElement("br",null),"}")),n.a.createElement("p",null,"Now, whenever ",n.a.createElement("code",null,"editActions")," emit, the ",n.a.createElement("code",null,"focusEdit")," method will be invoked!"),n.a.createElement("p",null,"Note that the signals are nothing like ",n.a.createElement("code",null,"mapDispatchToProps")," from ",n.a.createElement("code",null,"ReactRedux")," - that just lets us dispatch without a (direct) reference to ",n.a.createElement("code",null,"store.dispatch"),". The signals here solve a completely different problem - acting on a stream beyond the first - which, again, is beyond the scope of Redux (without use of exotic middleware)."),n.a.createElement("h3",{id:"the-final-result"},"The final result"),n.a.createElement("p",null,"The ",n.a.createElement("strong",null,"old app")," had this flow..."),n.a.createElement("p",null,n.a.createElement("img",{src:"/static/posts/building-todomvc-with-callbags-and-react/diagrams/callbag-mvi.svg",alt:""})),n.a.createElement("p",null,"...which meant ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc/blob/master/src/index.js"},"this bootstrapping"),":"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," actions = makeActions(",n.a.createElement("span",{className:"hljs-built_in"},"window"),", ",n.a.createElement("span",{className:"hljs-built_in"},"window"),".document.getElementById(",n.a.createElement("span",{className:"hljs-string"},"'app'"),"));",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," state = makeStateStream(actions);",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," view = makeViewStream(state);",n.a.createElement("br",null),n.a.createElement("br",null),"makeSideEffects(",n.a.createElement("span",{className:"hljs-built_in"},"window"),", actions, view);")),n.a.createElement("p",null,"The ",n.a.createElement("strong",null,"new, React-based app")," - with the repo ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc-react"},"https://github.com/krawaller/callbag-todomvc-react")," - ended upp looking like this:"),n.a.createElement("p",null,n.a.createElement("img",{src:"/static/posts/building-todomvc-with-callbags-and-react/diagrams/callbag-mvi-2.svg",alt:""})),n.a.createElement("p",null,"Here's the ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc-react/blob/master/src/index.js"},"new bootstrapping code"),":"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," events = makeEvents();",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," actions = makeActions(events, ",n.a.createElement("span",{className:"hljs-built_in"},"window"),");",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," state = makeStateStream(actions);",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," App = makeApp(state, actions, events);",n.a.createElement("br",null),n.a.createElement("br",null),"ReactDOM.render(",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"xml"},n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"App"),"/>")),",",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-built_in"},"document"),".getElementById(",n.a.createElement("span",{className:"hljs-string"},"'app'"),")",n.a.createElement("br",null),");")),n.a.createElement("p",null,"Let's tour the involved factory functions and compare them to their older counterparts!"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,"The ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc-react/blob/master/src/data/events.js"},n.a.createElement("code",null,"makeEvents"))," function was a new addition, using ",n.a.createElement("code",null,"callbag-from-function")," to create bridges between normal JavaScript functions and callbag sources:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function")," ",n.a.createElement("span",{className:"hljs-title"},"makeEvents"),"(",n.a.createElement("span",{className:"hljs-params"}),")"),"{",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"return")," {",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-attr"},"clearCompleted"),": fromFunction(),",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-attr"},"toggleTodo"),": fromFunction(),",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-comment"},"// ..."),n.a.createElement("br",null),"  };",n.a.createElement("br",null),"}")),n.a.createElement("p",null,"This is (somewhat) comparable to (parts of) the action creator layer in Redux.")),n.a.createElement("li",null,n.a.createElement("p",null,"The ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc-react/blob/master/src/data/actions.js"},n.a.createElement("code",null,"makeActions"))," function is almost exactly the same as before, except we use sources from ",n.a.createElement("code",null,"makeEvents")," to seed the streams instead of setting event handlers ourselves:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," clearCompletedActions = pipe(",n.a.createElement("br",null),"  clearCompleted.source, ",n.a.createElement("span",{className:"hljs-comment"},"// <--- instead of using `fromDelegatedEvent`"),n.a.createElement("br",null),"  mapTo({",n.a.createElement("span",{className:"hljs-attr"},"type"),": ",n.a.createElement("span",{className:"hljs-string"},"'CLEARCOMPLETED'"),"})",n.a.createElement("br",null),");"))),n.a.createElement("li",null,n.a.createElement("p",null,"The new ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc-react/blob/master/src/data/state.js"},n.a.createElement("code",null,"makeState"))," function is completely identical to the old one!")),n.a.createElement("li",null,n.a.createElement("p",null,"The ",n.a.createElement("a",{href:"https://github.com/krawaller/callbag-todomvc-react/blob/master/src/app/index.js"},n.a.createElement("code",null,"makeApp"))," function replaces the old ",n.a.createElement("code",null,"makeView")," and ",n.a.createElement("code",null,"makeSidEffects"),". This makes sense, since..."),n.a.createElement("ul",null,n.a.createElement("li",null,"the ",n.a.createElement("code",null,".render")," method plays the role of ",n.a.createElement("code",null,"makeView"),", turning app state into JSX"),n.a.createElement("li",null,"the ",n.a.createElement("code",null,".connect"),"ed state source triggers the rerender, replacing the first side effect in ",n.a.createElement("code",null,"makeSideEffects")),n.a.createElement("li",null,"the signals take care of the other side effects")),n.a.createElement("p",null,"The ",n.a.createElement("code",null,"makeApp")," function is implemented as a factory that returns the component definition:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function")," ",n.a.createElement("span",{className:"hljs-title"},"makeApp"),"(",n.a.createElement("span",{className:"hljs-params"},"state, actions, events"),")"),"{",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"const")," shouldFocusNew = merge(",n.a.createElement("br",null),"    actions.initActions, actions.deleteActions, actions.confirmEditActions,",n.a.createElement("br",null),"    actions.newTodoActions, actions.cancelEditActions",n.a.createElement("br",null),"  );",n.a.createElement("br",null),n.a.createElement("br",null),"  @connect(",n.a.createElement("br",null),"    {",n.a.createElement("span",{className:"hljs-attr"},"appState"),": stateStream},",n.a.createElement("br",null),"    [",n.a.createElement("br",null),"      [shouldFocusNew, comp => comp.focusNew()],",n.a.createElement("br",null),"      [actions.editActions, comp => comp.focusEdit()]",n.a.createElement("br",null),"    ]",n.a.createElement("br",null),"  )",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-class"},n.a.createElement("span",{className:"hljs-keyword"},"class")," ",n.a.createElement("span",{className:"hljs-title"},"App")," ",n.a.createElement("span",{className:"hljs-keyword"},"extends")," ",n.a.createElement("span",{className:"hljs-title"},"React"),".",n.a.createElement("span",{className:"hljs-title"},"Component")," "),"{ ... }",n.a.createElement("br",null),n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"return")," App;",n.a.createElement("br",null),"}")))),n.a.createElement("h3",{id:"wrapping-up"},"Wrapping up"),n.a.createElement("p",null,"Now we have successfully used callbags in conjunction with a framework! Was this actually a good idea?"),n.a.createElement("p",null,"I feel like there are two separate comparisons to be made:"),n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("p",null,n.a.createElement("strong",null,"SnabbDOM VS React"),": In other words, did we gain anything when switching out a templating solution for a framework (ok, I know not all agree that React can be called a framework...)? Well, maybe we didn't gain much in this small app, but the newer version definitely scales better, and we're touching the DOM way less.")),n.a.createElement("li",null,n.a.createElement("p",null,n.a.createElement("strong",null,"Callbag VS Redux"),": Now this is more relevant - are we better of using Callbags for our data layer as opposed to Redux? This will always be a very subjective discussion, but my main takeaway is that I'm very happy about how easy it is to express ",n.a.createElement("em",null,"other sideeffects")," with callbags."))),n.a.createElement("p",null,"What I definitely do know is that I enjoy juggling callbags very much, and look forward to an opportunity to try it out on a larger scale project. And now that we have a working setup for marrying callbags with React, the threshold for such an adventure is way lower!")),n.a.createElement("hr",null))}},v0Kp:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/building-todomvc-with-callbags-and-react",function(){var e=t("IUmq");return{page:e.default||e}}])}},[["v0Kp",1,0]]]);