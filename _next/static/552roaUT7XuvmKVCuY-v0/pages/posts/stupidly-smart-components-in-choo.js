(window.webpackJsonp=window.webpackJsonp||[]).push([[147],{"4ZBk":function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/stupidly-smart-components-in-choo",function(){var e=a("fmIl");return{page:e.default||e}}])},fmIl:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),l=a.n(n),o=a("JRaF"),r=a("YFqc"),s=a.n(r),i={url:"stupidly-smart-components-in-choo",id:"choostupidsmart",type:"post",title:"Stupidly smart components in Choo",date:"2016-07-07",tags:["choo","react","redux"],author:"david",excerpt:"Philosophizing about why smart components in Choo are stupid and why that is a good thing",folder:"/Users/davidwaller/gitreps/mine/blog2/sources/2016-07-07_choostupidsmart",hasStaticContent:!0,headlines:[{level:3,text:"The premise",id:"the-premise"},{level:3,text:"The merits of smart components",id:"the-merits-of-smart-components"},{level:3,text:"The merits of a centralized store",id:"the-merits-of-a-centralized-store"},{level:3,text:"Choo introduction intermission",id:"choo-introduction-intermission"},{level:3,text:"The merits of Choo",id:"the-merits-of-choo"},{level:3,text:"Wrapping up",id:"wrapping-up"}]};t.default=function(){return l.a.createElement(o.a,{kind:"post",data:i,title:"Stupidly smart components in Choo",summary:"Philosophizing about why smart components in Choo are stupid and why that is a good thing",headlines:[{level:3,text:"The premise",id:"the-premise"},{level:3,text:"The merits of smart components",id:"the-merits-of-smart-components"},{level:3,text:"The merits of a centralized store",id:"the-merits-of-a-centralized-store"},{level:3,text:"Choo introduction intermission",id:"choo-introduction-intermission"},{level:3,text:"The merits of Choo",id:"the-merits-of-choo"},{level:3,text:"Wrapping up",id:"wrapping-up"}],tags:["choo","react","redux"]},l.a.createElement("div",{className:"post","data-postid":"choostupidsmart"},l.a.createElement("h3",{id:"the-premise"},"The premise"),l.a.createElement("p",null,"In the aftermath to the ",l.a.createElement(s.a,{href:"/posts/composition-in-cyclejs-choo-react-and-angular2",prefetch:!0},l.a.createElement("a",null,"component composition comparison"))," we did between ",l.a.createElement("a",{href:"https://facebook.github.io/react/"},"React"),", ",l.a.createElement("a",{href:"https://angular.io"},"Angular2"),", ",l.a.createElement("a",{href:"https://github.com/yoshuawuyts/choo"},"Choo")," and ",l.a.createElement("a",{href:"http://cycle.js.org/"},"Cycle"),", I realised something that made my already high esteem for Choo go higher still - ",l.a.createElement("em",null,"smart components in Choo are stupid"),"! This post meanders its way to that point."),l.a.createElement("p",null,"It started when a ",l.a.createElement("a",{href:"https://github.com/yoshuawuyts/choo/issues/131"},"discussion on an unrelated Choo issue")," led to the age-old argument between having smart isolated components versus all state in a central store. Let's begin by reviewing the stances!"),l.a.createElement("h3",{id:"the-merits-of-smart-components"},"The merits of smart components"),l.a.createElement("p",null," Take a traditional React app (or any app, really). Most components are (hopefully) dumb, meaning they have no state of their own - they are just a pure render function acting on props fed by the parent. Easy to use, easy to understand and reason about."),l.a.createElement("p",null," But some components might have state that only they care about, and then it is convenient to let them manage that state. In the framework comparison comparison we created the app running in the iframe below:"),l.a.createElement("iframe",{src:"/static/posts/stupidly-smart-components-in-choo/applets/comparison/index.html",height:"100px",width:"100%"}),l.a.createElement("p",null,"The button is a separate component, meant to be self-contained and portable. It therefore needs to track the current state (waiting or confirming), and handle the events that toggle this. If you want the button in your app, all you need to do is replace your static button with the component and listen to the confirm callbacks. Convenient!"),l.a.createElement("h3",{id:"the-merits-of-a-centralized-store"},"The merits of a centralized store"),l.a.createElement("p",null,"However, if we allow these scattered state machines all around our app, debugging becomes harder and cool stuff like time travel and hot reloading impossible. Solving this is what made ",l.a.createElement("a",{href:"http://redux.js.org/"},"Redux")," popular - by having a ",l.a.createElement("em",null,"single central place to store your data"),", you also get ",l.a.createElement("em",null,"time travel and ridiculously easy debugging for free"),"."),l.a.createElement("p",null,"What you lose, however, is an easy way to encapsulate component concerns. If I was to let Redux manage the state of the button component, the relevant code would be scattered across a view file, a few cases in a reducer somewhere and some action creators somewhere else. ",l.a.createElement("em",null,"Portability is lost"),"."),l.a.createElement("p",null,"Some therefore argue that only ",l.a.createElement("em",null,"app state belongs in Redux"),", while ",l.a.createElement("em",null,"trivial UI state should be kept in components"),". I tend to disagree and side with the centralisers, arguing that the advantages of an omnipotent centralised data store is worth the lost portability."),l.a.createElement("p",null,"For example in my ",l.a.createElement(s.a,{href:"/posts/a-react-redux-firebase-app-with-authentication",prefetch:!0},l.a.createElement("a",null,"React-Redux-Firebase example")),", even the are-we-editing-or-not-flag for every single row is kept in Redux, even though that is really just a UI detail."),l.a.createElement("h3",{id:"choo-introduction-intermission"},"Choo introduction intermission"),l.a.createElement("p",null,"It turns out, however, that ",l.a.createElement("em",null,"in Choo you don't have to choose"),"! Before we get into why, please humor me through this super-quick introduction to Choo."),l.a.createElement("p",null,"Continuing the comparison to Redux, the equivalent to Redux' reducers and action creators in Choo is a ",l.a.createElement("em",null,"centralised model definition"),". Here's a silly example:"),l.a.createElement("pre",null,l.a.createElement("code",{className:"hljs"},"app.model({",l.a.createElement("br",null),"  state: {",l.a.createElement("br",null),"    msg: ",l.a.createElement("span",{className:"hljs-string"},"'hello'"),l.a.createElement("br",null),"  },",l.a.createElement("br",null),"  reducers: {",l.a.createElement("br",null),"    saysth: ",l.a.createElement("span",{className:"hljs-function"},l.a.createElement("span",{className:"hljs-params"},"(data, state)"),"=>")," ({ msg: data.msg }),",l.a.createElement("br",null),"  },",l.a.createElement("br",null),"  effects: {",l.a.createElement("br",null),"    echo: ",l.a.createElement("span",{className:"hljs-function"},l.a.createElement("span",{className:"hljs-params"},"(data, state, send)"),"=>")," {",l.a.createElement("br",null),"      send(",l.a.createElement("span",{className:"hljs-string"},"'saysth'"),",data)",l.a.createElement("br",null),"      ",l.a.createElement("span",{className:"hljs-built_in"},"setTimeout"),"(",l.a.createElement("span",{className:"hljs-function"},l.a.createElement("span",{className:"hljs-params"},"()"),"=>")," { send(",l.a.createElement("span",{className:"hljs-string"},"'saysth'"),",data) },",l.a.createElement("span",{className:"hljs-number"},"1000"),")",l.a.createElement("br",null),"      ",l.a.createElement("span",{className:"hljs-built_in"},"setTimeout"),"(",l.a.createElement("span",{className:"hljs-function"},l.a.createElement("span",{className:"hljs-params"},"()"),"=>")," { send(",l.a.createElement("span",{className:"hljs-string"},"'saysth'"),",data) },",l.a.createElement("span",{className:"hljs-number"},"2000"),")",l.a.createElement("br",null),"    }",l.a.createElement("br",null),"  },",l.a.createElement("br",null),"  subscriptions: [otherComplexStuff]",l.a.createElement("br",null),"})")),l.a.createElement("p",null,"The ",l.a.createElement("code",null,"state")," prop holds the initial state, ",l.a.createElement("code",null,"reducers")," are the same as in Redux, and ",l.a.createElement("code",null,"effects")," handle side effects like Redux' thunked action creators."),l.a.createElement("p",null,"For a full-featured example, check out the ",l.a.createElement("a",{href:"https://github.com/shuhei/todomvc-choo/blob/master/model.js"},"model definition")," of the ",l.a.createElement("a",{href:"http://shuheikagawa.com/todomvc-choo/"},"Choo TodoMVC implementation"),"."),l.a.createElement("p",null,"However, Choo lets you ",l.a.createElement("em",null,"split the model definition into namespaced pieces"),". Here's the code for the Choo version of my confirmation button component:"),l.a.createElement("pre",null,l.a.createElement("code",{className:"hljs"},l.a.createElement("span",{className:"hljs-keyword"},"const")," Confirm = (app,confirmevent)=> {",l.a.createElement("br",null),"  app.model({",l.a.createElement("br",null),"    namespace: 'confButt',",l.a.createElement("br",null),"    ",l.a.createElement("span",{className:"hljs-keyword"},"state"),": { button: 'waiting' },",l.a.createElement("br",null),"    reducers: {",l.a.createElement("br",null),"      maybeSubmit: (action, ",l.a.createElement("span",{className:"hljs-keyword"},"state"),") => ({button: 'confirm'}),",l.a.createElement("br",null),"      cancelSubmit: (action, ",l.a.createElement("span",{className:"hljs-keyword"},"state"),") => ({button: 'waiting'})",l.a.createElement("br",null),"    },",l.a.createElement("br",null),"    effects: {",l.a.createElement("br",null),"      confirmSubmit: (action, ",l.a.createElement("span",{className:"hljs-keyword"},"state"),", send)=> {",l.a.createElement("br",null),"        send('confButt:cancelSubmit')",l.a.createElement("br",null),"        send(confirmevent)",l.a.createElement("br",null),"      }",l.a.createElement("br",null),"    }",l.a.createElement("br",null),"  })",l.a.createElement("br",null),"  return (",l.a.createElement("span",{className:"hljs-keyword"},"state"),", disabled, send) => ",l.a.createElement("span",{className:"hljs-keyword"},"state"),".confButt.button !== 'confirm' ",l.a.createElement("br",null),"    ? choo.view`",l.a.createElement("br",null),"      ",l.a.createElement("span",{className:"hljs-variable"},"<button onclick=${e =>")," send('confButt:maybeSubmit')} disabled=${disabled}>Submit</button>",l.a.createElement("br",null),"    `",l.a.createElement("br",null),"    : choo.view`",l.a.createElement("br",null),"      ",l.a.createElement("span",{className:"hljs-variable"},"<span>"),l.a.createElement("br",null),"        ",l.a.createElement("span",{className:"hljs-variable"},"<button onclick=${e =>")," send('confButt:cancelSubmit')}>Cancel</button>",l.a.createElement("br",null),"        ",l.a.createElement("span",{className:"hljs-variable"},"<button onclick=${e =>")," send('confButt:confirmSubmit')}>Confirm</button>",l.a.createElement("br",null),"      </span>",l.a.createElement("br",null),"    `",l.a.createElement("br",null),"}")),l.a.createElement("p",null,"Side note: there are ",l.a.createElement("a",{href:"https://github.com/yoshuawuyts/choo/issues/131#issuecomment-230811754"},"discussions on better patterns")," than passing the ",l.a.createElement("code",null,"app")," instance around, such as attaching the model as a prop to the renderer instead. More to follow!"),l.a.createElement("p",null,"But in essence, no matter the exact method of encapsulation, ",l.a.createElement("em",null,"a self-contained component is made up by two things")," in Choo:"),l.a.createElement("ul",null,l.a.createElement("li",null,"a namespaced model definition"),l.a.createElement("li",null,"a pure render function")),l.a.createElement("h3",{id:"the-merits-of-choo"},"The merits of Choo"),l.a.createElement("p",null,"Now for the kicker; even though I split my model definition into parts, the ",l.a.createElement("em",null,"data is still stored centrally"),". In an app using the confirm button, if I logged out the app state, I'd still see the confirm button state in there:"),l.a.createElement("pre",null,l.a.createElement("code",{className:"hljs"},"{",l.a.createElement("br",null),"  ",l.a.createElement("span",{className:"hljs-attribute"},"foo"),": ",l.a.createElement("span",{className:"hljs-string"},"'bar'"),",",l.a.createElement("br",null),"  ",l.a.createElement("span",{className:"hljs-attribute"},"confButt"),": {",l.a.createElement("br",null),"    ",l.a.createElement("span",{className:"hljs-attribute"},"button"),": ",l.a.createElement("span",{className:"hljs-string"},"'waiting'"),l.a.createElement("br",null),"  },",l.a.createElement("br",null),"  ",l.a.createElement("span",{className:"hljs-attribute"},"otherStuff"),": { ... },",l.a.createElement("br",null),"  ...",l.a.createElement("br",null),"}")),l.a.createElement("p",null,"Which means I can enjoy time travel, hot reloading and powerful debugging without paying the price of lost component portability!"),l.a.createElement("p",null,"What I do lose is the advantage of having the full definition in one single place, which isn't trivial. Still, I feel that it is worth more to be able to piggyback on the community by dropping in 3rd party complex components. My confirm button is of course a contrived example, but imagine an autocomplete field or some other non-trivial piece of functionality."),l.a.createElement("h3",{id:"wrapping-up"},"Wrapping up"),l.a.createElement("p",null,"Being able to encapsulate component models yet still have a central data storage is something I haven't seen in any other framework, which has enamored me with Choo even more. It truly is a cool piece of software, so try it out if you haven't already!"),l.a.createElement("p",null,"And yes I realise I've ended other posts saying the exact same thing about CycleJS. Heck, go try both! :)")),l.a.createElement("hr",null))}}},[["4ZBk",1,0]]]);