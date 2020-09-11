(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{"7Vme":function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/a-redux-typescript-setup",function(){var e=t("WoIt");return{page:e.default||e}}])},WoIt:function(e,a,t){"use strict";t.r(a);var l=t("q1tI"),n=t.n(l),s=t("JRaF"),r=(t("YFqc"),{url:"a-redux-typescript-setup",id:"reduxtypescript",type:"post",title:"A Redux-TypeScript setup",date:"2017-05-18",tags:["redux","typescript"],author:"david",excerpt:"Walking through a Redux-TypeScript scaffold, set up for maximal in-editor help from minimal typing",folder:"/Users/davidwaller/gitreps/mine/blog2/sources/2017-05-18_reduxtypescript",hasStaticContent:!0,headlines:[{level:3,text:"The premise",id:"the-premise"},{level:3,text:"The scaffold state",id:"the-scaffold-state"},{level:3,text:"Action creators",id:"action-creators"},{level:3,text:"Thunk actions",id:"thunk-actions"},{level:3,text:"Reducer",id:"reducer"},{level:3,text:"The store",id:"the-store"},{level:3,text:"Wrapping up",id:"wrapping-up"}]});a.default=function(){return n.a.createElement(s.a,{kind:"post",data:r,title:"A Redux-TypeScript setup",summary:"Walking through a Redux-TypeScript scaffold, set up for maximal in-editor help from minimal typing",headlines:[{level:3,text:"The premise",id:"the-premise"},{level:3,text:"The scaffold state",id:"the-scaffold-state"},{level:3,text:"Action creators",id:"action-creators"},{level:3,text:"Thunk actions",id:"thunk-actions"},{level:3,text:"Reducer",id:"reducer"},{level:3,text:"The store",id:"the-store"},{level:3,text:"Wrapping up",id:"wrapping-up"}],tags:["redux","typescript"]},n.a.createElement("div",{className:"post","data-postid":"reduxtypescript"},n.a.createElement("h3",{id:"the-premise"},"The premise"),n.a.createElement("p",null,"This post will explore a Redux TypeScript setup, using a tiny project as an example. My intention was to use this as a starting point whenever I start a new project, which so far has worked very well."),n.a.createElement("p",null,"Apart from Redux we'll also use ",n.a.createElement("code",null,"redux-actions")," and ",n.a.createElement("code",null,"redux-thunk"),"."),n.a.createElement("p",null,"There's also a React part to this project, but I'll leave exploring that to an upcoming post. This one will revolve solely around TypeScript and Redux."),n.a.createElement("h3",{id:"the-scaffold-state"},"The scaffold state"),n.a.createElement("p",null,"Here's the ",n.a.createElement("code",null,"AppState")," for my little example project:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"type")," AppState = {",n.a.createElement("br",null),"  messaging: MessagingState;",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-comment"},"/* ...imagine other domains here... */"),n.a.createElement("br",null),"};")),n.a.createElement("p",null,"Normally an app state would of course contain lots of top-level keys, but here I just have ",n.a.createElement("code",null,"messaging"),", meant to deal with app-wide feedback to the user. While skinny, this will still be enough to get the TypeScript setup points across."),n.a.createElement("p",null,n.a.createElement("code",null,"MessagingState")," looks like this:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"type")," MessagingState = {",n.a.createElement("br",null),"  lastMessage: ",n.a.createElement("span",{className:"hljs-built_in"},"number"),";",n.a.createElement("br",null),"  messages: UIMessage[];",n.a.createElement("br",null),"};")),n.a.createElement("p",null,"In other words, ",n.a.createElement("code",null,"appState.messaging.messages")," is an array of ",n.a.createElement("code",null,"UIMessage")," feedback items. They look like this..."),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"type")," UIMessage = {",n.a.createElement("br",null),"  id: ",n.a.createElement("span",{className:"hljs-built_in"},"number"),";",n.a.createElement("br",null),"  text: ",n.a.createElement("span",{className:"hljs-built_in"},"string"),";",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"type"),": UIMessageType;",n.a.createElement("br",null),"};")),n.a.createElement("p",null,"...and ",n.a.createElement("code",null,"UIMessageType")," is simply an enum:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"type")," UIMessageType = ",n.a.createElement("span",{className:"hljs-string"},"'info'")," | ",n.a.createElement("span",{className:"hljs-string"},"'success'")," | ",n.a.createElement("span",{className:"hljs-string"},"'error'"),";")),n.a.createElement("p",null,"The ",n.a.createElement("code",null,"lastMessage")," part of ",n.a.createElement("code",null,"MessagingState")," is used to create the ID for new messages, as well as fetching a reference to the last one. Normally I'd do that as a computed property with ",n.a.createElement("a",{href:"https://github.com/reactjs/reselect"},"Reselect"),", but I didn't want to muddy the waters too much here."),n.a.createElement("p",null,"Finally we make an ",n.a.createElement("code",null,"initialState")," to seed our store with, containing a welcoming UI message:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," initialState: AppState = {",n.a.createElement("br",null),"  messaging: {",n.a.createElement("br",null),"    messages: [{",n.a.createElement("span",{className:"hljs-keyword"},"type"),": ",n.a.createElement("span",{className:"hljs-string"},"'info'"),", text: ",n.a.createElement("span",{className:"hljs-string"},"'Welcome!'"),", id: ",n.a.createElement("span",{className:"hljs-number"},"1"),"}],",n.a.createElement("br",null),"    lastMessage: ",n.a.createElement("span",{className:"hljs-number"},"1"),n.a.createElement("br",null),"  }",n.a.createElement("br",null),"};")),n.a.createElement("h3",{id:"action-creators"},"Action creators"),n.a.createElement("p",null,"I wanted to use ",n.a.createElement("a",{href:"https://github.com/acdlite/redux-actions"},"Redux-Actions"),", a pretty neat helper library to reduce boilerplate. Make sure to also get the ",n.a.createElement("a",{href:"https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/redux-actions/index.d.ts"},"typings")," (",n.a.createElement("code",null,"@types/redux-actions"),")."),n.a.createElement("p",null,n.a.createElement("code",null,"ReduxActions")," uses the ",n.a.createElement("a",{href:"https://github.com/acdlite/flux-standard-action"},"Flux Standard Action")," format, meaning an action looks like this:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"interface")," Action<Payload> {",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"type"),": ",n.a.createElement("span",{className:"hljs-built_in"},"string"),";",n.a.createElement("br",null),"  payload?: Payload;",n.a.createElement("br",null),"  error?: ",n.a.createElement("span",{className:"hljs-built_in"},"boolean"),";",n.a.createElement("br",null),"}")),n.a.createElement("p",null,"In other words, eventual data passed with the action should go in the ",n.a.createElement("code",null,"payload")," prop. The advantage of that is that we can simplify the API of action creators, as has been done in ",n.a.createElement("code",null,"ReduxActions")," with the ",n.a.createElement("code",null,"createAction")," helper."),n.a.createElement("p",null,"In my simple scaffolding app there are only two possible actions; ",n.a.createElement("strong",null,"adding a message")," and ",n.a.createElement("strong",null,"removing a message"),"."),n.a.createElement("p",null,"Here's ",n.a.createElement("code",null,"addUIMessage(text, type)"),":"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"type")," addUIMessagePayload = {",n.a.createElement("br",null),"  text: ",n.a.createElement("span",{className:"hljs-built_in"},"string"),";",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"type"),": UIMessageType;",n.a.createElement("br",null),"};",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," addUIMessage = createAction<addUIMessagePayload, ",n.a.createElement("span",{className:"hljs-built_in"},"string"),", UIMessageType>(",n.a.createElement("br",null),"  ADD_UI_MESSAGE, ",n.a.createElement("span",{className:"hljs-function"},"(",n.a.createElement("span",{className:"hljs-params"},"text, ",n.a.createElement("span",{className:"hljs-keyword"},"type")),") =>")," ({text, ",n.a.createElement("span",{className:"hljs-keyword"},"type"),"})",n.a.createElement("br",null),");")),n.a.createElement("p",null,"The ",n.a.createElement("code",null,"ADD_UI_MESSAGE")," variable is merely a constant with the string, presumably imported from a ",n.a.createElement("code",null,"constants")," file."),n.a.createElement("p",null,"The signature of ",n.a.createElement("code",null,"createAction")," looks like this:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},"createAction<TPayload, TArg1, TArg2, ...>",n.a.createElement("span",{className:"hljs-function"},"(",n.a.createElement("span",{className:"hljs-params"},n.a.createElement("br",null),"  STRINGCONSTANT, arg1, arg2, ...",n.a.createElement("br",null)),") =>")," TPayload")),n.a.createElement("p",null,"Note how the creator just needs to return the payload, not the full action object."),n.a.createElement("p",null,"We ",n.a.createElement("code",null,"dismissUIMessage(id)")," like this:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"type")," dismissUIMessagePayload = ",n.a.createElement("span",{className:"hljs-built_in"},"number"),";",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," dismissUIMessage = createAction<dismissUIMessagePayload, ",n.a.createElement("span",{className:"hljs-built_in"},"number"),">(",n.a.createElement("br",null),"  DISMISS_UI_MESSAGE, ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-params"},"id")," =>")," id",n.a.createElement("br",null),");")),n.a.createElement("p",null,"Here the payload is just the id of the message to dismiss."),n.a.createElement("p",null,"The ",n.a.createElement("code",null,"createAction")," helper also does another clever thing - it sets up the ",n.a.createElement("code",null,".toString")," method on the creator to return the action string type. In other words:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},"dismissUIMessage.toString() ",n.a.createElement("span",{className:"hljs-comment"},"// DISMISS_UI_MESSAGE"))),n.a.createElement("p",null,"We'll utilise this fact later on."),n.a.createElement("h3",{id:"thunk-actions"},"Thunk actions"),n.a.createElement("p",null,"What about creating thunks to work with the ",n.a.createElement("a",{href:"https://github.com/gaearon/redux-thunk"},"ReduxThunk")," middleware? Say we want to add a third action creator, ",n.a.createElement("code",null,"addTempUIMessage(text, type)"),", which adds a message that dismisses itself after a few seconds. Implementing it is easy enough, but how do we get type support?"),n.a.createElement("p",null,"Here's what it looks like with the official ",n.a.createElement("a",{href:"https://github.com/gaearon/redux-thunk/blob/master/index.d.ts"},"ReduxThunk typings")," (bundled with the library so no ",n.a.createElement("code",null,"@types")," required):"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},n.a.createElement("span",{className:"hljs-keyword"},"import")," { ThunkAction } ",n.a.createElement("span",{className:"hljs-keyword"},"from")," ",n.a.createElement("span",{className:"hljs-string"},"'redux-thunk'"),";",n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," addTempUIMessage = ",n.a.createElement("br",null),"  (text: ",n.a.createElement("span",{className:"hljs-built_in"},"string"),", ",n.a.createElement("span",{className:"hljs-keyword"},"type"),": UIMessageType): ThunkAction<",n.a.createElement("span",{className:"hljs-literal"},"null"),", IState, ",n.a.createElement("span",{className:"hljs-literal"},"null"),"> =>",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-function"},"(",n.a.createElement("span",{className:"hljs-params"},"dispatch, getState"),") =>")," {",n.a.createElement("br",null),"      dispatch(addUIMessage(text, ",n.a.createElement("span",{className:"hljs-keyword"},"type"),"));",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-keyword"},"let")," id = getState().messaging.lastMessage;",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-built_in"},"setTimeout"),"(",n.a.createElement("span",{className:"hljs-function"},"() =>")," dispatch(dismissUIMessage(id)), ",n.a.createElement("span",{className:"hljs-number"},"2000"),");",n.a.createElement("br",null),"    };")),n.a.createElement("p",null,"Under the hood ",n.a.createElement("code",null,"ThunkAction")," uses the ",n.a.createElement("a",{href:"https://github.com/reactjs/redux/blob/master/index.d.ts"},"official Redux typings"),", which also comes bundled."),n.a.createElement("p",null,"The ",n.a.createElement("code",null,"ThunkAction")," gets ",n.a.createElement("code",null,"<ReturnVal, AppState, ExtraAPI>")," passed in. Some like to have ",n.a.createElement("code",null,"ReturnVal")," be a promise, and ",n.a.createElement("code",null,"ExtraAPI")," deals with the ",n.a.createElement("a",{href:"https://twitter.com/dan_abramov/status/730053481919303685"},"new ",n.a.createElement("code",null,"thunk.withExtraArgument(api)")," feature")," added last year."),n.a.createElement("p",null,"The main win from using ",n.a.createElement("code",null,"ThunkAction")," is that it will correctly type ",n.a.createElement("code",null,"dispatch"),", ",n.a.createElement("code",null,"getState")," and the return value of ",n.a.createElement("code",null,"getState"),":"),n.a.createElement("p",null,n.a.createElement("img",{src:"/static/posts/a-redux-typescript-setup/img/rearedtyp_thunk.png",alt:""})),n.a.createElement("p",null,"I had good help of the discussion in ",n.a.createElement("a",{href:"https://github.com/gaearon/redux-thunk/issues/103"},"this ",n.a.createElement("code",null,"redux-thunk")," issue")," when wrapping my brain around this."),n.a.createElement("p",null,"Since it is likely my thunk creators will all look the same, I set up an app-specific helper type..."),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},n.a.createElement("span",{className:"hljs-class"},n.a.createElement("span",{className:"hljs-keyword"},"type")," ",n.a.createElement("span",{className:"hljs-title"},"Thunk")," "),"= ThunkAction<",n.a.createElement("span",{className:"hljs-keyword"},"void"),", AppState, ",n.a.createElement("span",{className:"hljs-keyword"},"void"),">;")),n.a.createElement("p",null,"...which makes the code prettier still:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},n.a.createElement("span",{className:"hljs-keyword"},"const")," addTempUIMessage = ",n.a.createElement("br",null),"  (text: ",n.a.createElement("span",{className:"hljs-built_in"},"string"),", ",n.a.createElement("span",{className:"hljs-keyword"},"type"),": UIMessageType): ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-params"},"Thunk")," =>"),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-comment"},"// ...rest same as before"))),n.a.createElement("h3",{id:"reducer"},"Reducer"),n.a.createElement("p",null,"We build our top-level reducer by combining subreducers for each domain as usual:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"import")," { combineReducers } ",n.a.createElement("span",{className:"hljs-keyword"},"from")," ",n.a.createElement("span",{className:"hljs-string"},"'redux'"),";",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," reducer = combineReducers<AppState>({",n.a.createElement("br",null),"  messaging: messagingReducer,",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-comment"},"// ...imagine lots more reducers here..."),n.a.createElement("br",null),"});")),n.a.createElement("p",null,"Note how the Redux typings let us pass our ",n.a.createElement("code",null,"AppState")," type to ",n.a.createElement("code",null,"combineReducers"),"."),n.a.createElement("p",null,"So how are the individual reducers constructed? In bare-bones Redux we simply make a pure function with a big ",n.a.createElement("code",null,"switch")," statement. ",n.a.createElement("code",null,"ReduxActions")," however has a ",n.a.createElement("code",null,"handleActions")," helper that makes for less cruft. Here's how we can use that to make a reducer dealing with the two message-related actions:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," messagingReducer = handleActions<MessagingState>(",n.a.createElement("br",null),"  {",n.a.createElement("br",null),"    [addUIMessage.toString()]: (state, action: Action<addUIMessagePayload>): ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-params"},"MessagingState")," =>")," ({",n.a.createElement("br",null),"      nextId: state.nextId + ",n.a.createElement("span",{className:"hljs-number"},"1"),",",n.a.createElement("br",null),"      messages: [{...action.payload, id: state.nextId}].concat(state.messages)",n.a.createElement("br",null),"    }),",n.a.createElement("br",null),"    [dismissUIMessage.toString()]: (state, action: Action<dismissUIMessagePayload>): ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-params"},"MessagingState")," =>")," ({",n.a.createElement("br",null),"      ...state,",n.a.createElement("br",null),"      messages: state.messages.filter(",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-params"},"m")," =>")," m.id !== action.payload)",n.a.createElement("br",null),"    })",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"  initialState.messaging",n.a.createElement("br",null),");")),n.a.createElement("p",null,"Note how we use the ",n.a.createElement("code",null,".toString")," of the action creators, saving us from having to import the constants."),n.a.createElement("p",null,"And through the ",n.a.createElement("code",null,"Action<actionCreatorPayload>")," typing we get the correct type for ",n.a.createElement("code",null,"action.payload")," inside the handler:"),n.a.createElement("p",null,n.a.createElement("img",{src:"/static/posts/a-redux-typescript-setup/img/rearedtyp_reducer1.png",alt:""})),n.a.createElement("p",null,"This is kind of neat, but there are still two drawbacks here:"),n.a.createElement("ul",null,n.a.createElement("li",null,"The typings don't cascade, we have to add ",n.a.createElement("code",null,"MessagingState")," at the top and at every individual handler"),n.a.createElement("li",null,"We have to reference the action creators in both the key and the value, leaving room for mismatches.")),n.a.createElement("p",null,"The first point is discussed in ",n.a.createElement("a",{href:"https://github.com/acdlite/redux-actions/issues/84"},"this ReduxActions PR"),", where ",n.a.createElement("a",{href:"https://github.com/leonyu"},"Leon Yu")," explains that the dictionary form prevents type cascade. He then suggests a builder-like solution, which also happens to solve the second point!"),n.a.createElement("p",null,"Here's how my implementation of his idea is used:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," messagingReducer = buildReducer<MessagingState>()",n.a.createElement("br",null),"  .handle(addUIMessage, ",n.a.createElement("span",{className:"hljs-function"},"(",n.a.createElement("span",{className:"hljs-params"},"state, action"),") =>")," ({",n.a.createElement("br",null),"    lastMessage: state.lastMessage + ",n.a.createElement("span",{className:"hljs-number"},"1"),",",n.a.createElement("br",null),"    messages: [{...action.payload, id: state.lastMessage + ",n.a.createElement("span",{className:"hljs-number"},"1"),"}].concat(state.messages)",n.a.createElement("br",null),"  }))",n.a.createElement("br",null),"  .handle(dismissUIMessage, ",n.a.createElement("span",{className:"hljs-function"},"(",n.a.createElement("span",{className:"hljs-params"},"state, action"),") =>")," ({",n.a.createElement("br",null),"    ...state,",n.a.createElement("br",null),"    messages: state.messages.filter(",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-params"},"m")," =>")," m.id !== action.payload)",n.a.createElement("br",null),"  }))",n.a.createElement("br",null),"  .done();")),n.a.createElement("p",null,"Far fewer typings (we don't even need to import the action payload types!), no room to connect the wrong handler with the wrong type, and still full support for state, payload and return type:"),n.a.createElement("p",null,n.a.createElement("img",{src:"/static/posts/a-redux-typescript-setup/img/rearedtyp_reducer2.png",alt:""})),n.a.createElement("p",null,"Granted, having to call ",n.a.createElement("code",null,".done()")," at the end might feel a bit boilerplaty, but I still much prefer this helper to the ",n.a.createElement("code",null,"handleActions")," one from ",n.a.createElement("code",null,"ReduxActions")," shown earlier."),n.a.createElement("p",null,"Here's the source code for the ",n.a.createElement("code",null,"buildReducer")," helper:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"import")," { Reducer, Action } ",n.a.createElement("span",{className:"hljs-keyword"},"from")," ",n.a.createElement("span",{className:"hljs-string"},"'redux-actions'"),";",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"import")," { ActionCreator } ",n.a.createElement("span",{className:"hljs-keyword"},"from")," ",n.a.createElement("span",{className:"hljs-string"},"'redux'"),";",n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"type")," builderObject<TState> = {",n.a.createElement("br",null),"  handle: <TPayload>",n.a.createElement("span",{className:"hljs-function"},"(",n.a.createElement("span",{className:"hljs-params"},n.a.createElement("br",null),"    creator: ActionCreator<Action<TPayload>>,",n.a.createElement("br",null),"    reducer: Reducer<TState, TPayload>",n.a.createElement("br",null),"  "),") =>")," builderObject<TState>,",n.a.createElement("br",null),"  done: ",n.a.createElement("span",{className:"hljs-function"},"() =>")," Reducer<TState, Action<",n.a.createElement("span",{className:"hljs-built_in"},"any"),">>",n.a.createElement("br",null),"};",n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function")," ",n.a.createElement("span",{className:"hljs-title"},"buildReducer"),"<",n.a.createElement("span",{className:"hljs-title"},"TState"),">(",n.a.createElement("span",{className:"hljs-params"}),"): ",n.a.createElement("span",{className:"hljs-title"},"builderObject"),"<",n.a.createElement("span",{className:"hljs-title"},"TState"),"> "),"{",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"let")," map: { [action: ",n.a.createElement("span",{className:"hljs-built_in"},"string"),"]: Reducer<TState, ",n.a.createElement("span",{className:"hljs-built_in"},"any"),">; } = {};",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"return")," {",n.a.createElement("br",null),"    handle(creator, reducer) {",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-keyword"},"const")," ",n.a.createElement("span",{className:"hljs-keyword"},"type")," = creator.toString();",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-keyword"},"if")," (map[",n.a.createElement("span",{className:"hljs-keyword"},"type"),"]) {",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"throw")," ",n.a.createElement("span",{className:"hljs-keyword"},"new")," ",n.a.createElement("span",{className:"hljs-built_in"},"Error")," (",n.a.createElement("span",{className:"hljs-string"},"`Already handling an action with type ",n.a.createElement("span",{className:"hljs-subst"},"${",n.a.createElement("span",{className:"hljs-keyword"},"type"),"}"),"`"),");",n.a.createElement("br",null),"      }",n.a.createElement("br",null),"      map[",n.a.createElement("span",{className:"hljs-keyword"},"type"),"] = reducer;",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-keyword"},"return")," ",n.a.createElement("span",{className:"hljs-built_in"},"this"),";",n.a.createElement("br",null),"    },",n.a.createElement("br",null),"    done() {",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-keyword"},"const")," mapClone = ",n.a.createElement("span",{className:"hljs-built_in"},"Object"),".assign({}, map);",n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-keyword"},"return")," ",n.a.createElement("span",{className:"hljs-function"},"(",n.a.createElement("span",{className:"hljs-params"},"state: TState = {} ",n.a.createElement("span",{className:"hljs-keyword"},"as")," ",n.a.createElement("span",{className:"hljs-built_in"},"any"),", action: Action<",n.a.createElement("span",{className:"hljs-built_in"},"any"),">"),") =>")," {",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"let")," handler = mapClone[action.type];",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"return")," handler ? handler(state, action) : state;",n.a.createElement("br",null),"      };",n.a.createElement("br",null),"    }",n.a.createElement("br",null),"  };",n.a.createElement("br",null),"}")),n.a.createElement("h3",{id:"the-store"},"The store"),n.a.createElement("p",null,"If we just create the store directly with ",n.a.createElement("code",null,"createStore"),", the type will be inferred from the reducer (even if we didn't have initial state):"),n.a.createElement("p",null,n.a.createElement("img",{src:"/static/posts/a-redux-typescript-setup/img/rearedtyp_store.png",alt:""})),n.a.createElement("p",null,"When using an enhancer such as created by ",n.a.createElement("code",null,"applyMiddleware"),", we must type the variable ourselves:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},"const store: Store<AppState> = apply",n.a.createElement("span",{className:"hljs-constructor"},"Middleware(",n.a.createElement("span",{className:"hljs-params"},"thunk"),", ",n.a.createElement("span",{className:"hljs-params"},"logger"),")"),"(createStore)(reducer, initialState);")),n.a.createElement("p",null,"But since that's only ever done once, that isn't really an issue."),n.a.createElement("p",null,"As for the middlewares themselves, Redux has a ",n.a.createElement("code",null,"MiddlewareAPI<S>")," typing. So with a tiny app-specific helper type..."),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},n.a.createElement("span",{className:"hljs-keyword"},"type")," ",n.a.createElement("span",{className:"hljs-type"},"API "),"= MiddlewareAPI<AppState>;")),n.a.createElement("p",null,"...we can type the middlewares:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},n.a.createElement("span",{className:"hljs-keyword"},"import")," {  }",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," logger = ",n.a.createElement("span",{className:"hljs-function"},"(",n.a.createElement("span",{className:"hljs-params"},"api: API"),") =>")," ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-params"},"next")," =>")," ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-params"},"action")," =>")," {",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-built_in"},"console"),".log(",n.a.createElement("span",{className:"hljs-string"},"'dispatching'"),", action.type, action);",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"let")," result = next(action);",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-built_in"},"console"),".log(",n.a.createElement("span",{className:"hljs-string"},"'next state'"),", api.getState());",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"return")," result;",n.a.createElement("br",null),"};")),n.a.createElement("h3",{id:"wrapping-up"},"Wrapping up"),n.a.createElement("p",null,"I'm pretty happy with this setup - not much typings necessary, but I still get full TypeScript support throughout."),n.a.createElement("p",null,"There are some itches I'd like to scratch further. For example, having to feed the action creator argument types up top to ",n.a.createElement("code",null,"createAction")," is a bit iffy:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," addUIMessage = createAction<addUIMessagePayload, ",n.a.createElement("span",{className:"hljs-built_in"},"string"),", UIMessageType>(",n.a.createElement("br",null),"  ADD_UI_MESSAGE, ",n.a.createElement("span",{className:"hljs-function"},"(",n.a.createElement("span",{className:"hljs-params"},"text, ",n.a.createElement("span",{className:"hljs-keyword"},"type")),") =>")," ({text, ",n.a.createElement("span",{className:"hljs-keyword"},"type"),"})",n.a.createElement("br",null),");")),n.a.createElement("p",null,"I would much prefer to do this:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-typescript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," addUIMessage = createAction<addUIMessagePayload>(",n.a.createElement("br",null),"  ADD_UI_MESSAGE, ",n.a.createElement("span",{className:"hljs-function"},"(",n.a.createElement("span",{className:"hljs-params"},"text: ",n.a.createElement("span",{className:"hljs-built_in"},"string"),", ",n.a.createElement("span",{className:"hljs-keyword"},"type"),": UIMessageType"),") =>")," ({text, ",n.a.createElement("span",{className:"hljs-keyword"},"type"),"})",n.a.createElement("br",null),");")),n.a.createElement("p",null,"This should be doable, I need to explore further."),n.a.createElement("p",null,"Also I'm looking at exposing the actions on the store instance instead of having a ",n.a.createElement("code",null,"dispatch")," function and a separate ",n.a.createElement("code",null,"action")," object. Why let the user ever dispatch anything except what is born from an action creator?"),n.a.createElement("p",null,"Finally the ",n.a.createElement("code",null,"Middleware")," typings are lacking. I'd like to do something like this up top:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},n.a.createElement("span",{className:"hljs-keyword"},"const")," logger: Middleware<AppState> = ",n.a.createElement("span",{className:"hljs-comment"},"// ..."))),n.a.createElement("p",null,"...and just have everything below it, including ",n.a.createElement("code",null,"next")," and ",n.a.createElement("code",null,"action"),", be correctly inferred. But as middlewares are few and one-off, setting that up isn't really a priority."),n.a.createElement("p",null,"Anyhow - I hope this setup is of use to you too, and if you have any feedback, please do comment or reach out! "),n.a.createElement("p",null,"And as initially stated, I'll detail the React parts of my setup in an upcoming post.")),n.a.createElement("hr",null))}}},[["7Vme",1,0]]]);