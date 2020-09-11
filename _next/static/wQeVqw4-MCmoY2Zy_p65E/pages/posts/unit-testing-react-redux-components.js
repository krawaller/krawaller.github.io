(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{OG40:function(e,t,a){"use strict";a.r(t);var l=a("q1tI"),n=a.n(l),s=a("JRaF"),r=(a("YFqc"),{url:"unit-testing-react-redux-components",id:"unittestingreactredux",type:"post",title:"Unit testing ReactRedux components",date:"2020-09-07",tags:["react","redux","testing","jest"],author:"david",excerpt:"A convenient approach for testing React components connected via ReactRedux",folder:"/Users/davidwaller/gitreps/mine/blog2/sources/2020-09-07_test_reactredux",hasStaticContent:!1,headlines:[{level:3,text:"Premise",id:"premise"},{level:3,text:"Test subject",id:"test-subject"},{level:3,text:"Arranging - how not to do it",id:"arranging-how-not-to-do-it"},{level:3,text:"Arranging - another way of how not to do it",id:"arranging-another-way-of-how-not-to-do-it"},{level:3,text:"Arranging, yet another way of not doing it.",id:"arranging-yet-another-way-of-not-doing-it"},{level:3,text:"Arranging, how to actually do it",id:"arranging-how-to-actually-do-it"},{level:3,text:"Acting - rendering strategies",id:"acting-rendering-strategies"},{level:3,text:"Helpers, part 1 - testRender",id:"helpers-part-1-testrender"},{level:3,text:"Asserting render",id:"asserting-render"},{level:3,text:"Acting behaviour",id:"acting-behaviour"},{level:3,text:"Asserting behaviour, how not to do it",id:"asserting-behaviour-how-not-to-do-it"},{level:3,text:"Asserting behaviour, how still not to do it",id:"asserting-behaviour-how-still-not-to-do-it"},{level:3,text:"Asserting behaviour, how to do it",id:"asserting-behaviour-how-to-do-it"},{level:3,text:"Helpers, part 2 - testStore",id:"helpers-part-2-teststore"},{level:3,text:"The full unit test",id:"the-full-unit-test"},{level:3,text:"Wrapping up",id:"wrapping-up"},{level:3,text:"PS",id:"ps"}]});t.default=function(){return n.a.createElement(s.a,{kind:"post",data:r,title:"Unit testing ReactRedux components",summary:"A convenient approach for testing React components connected via ReactRedux",headlines:[{level:3,text:"Premise",id:"premise"},{level:3,text:"Test subject",id:"test-subject"},{level:3,text:"Arranging - how not to do it",id:"arranging-how-not-to-do-it"},{level:3,text:"Arranging - another way of how not to do it",id:"arranging-another-way-of-how-not-to-do-it"},{level:3,text:"Arranging, yet another way of not doing it.",id:"arranging-yet-another-way-of-not-doing-it"},{level:3,text:"Arranging, how to actually do it",id:"arranging-how-to-actually-do-it"},{level:3,text:"Acting - rendering strategies",id:"acting-rendering-strategies"},{level:3,text:"Helpers, part 1 - testRender",id:"helpers-part-1-testrender"},{level:3,text:"Asserting render",id:"asserting-render"},{level:3,text:"Acting behaviour",id:"acting-behaviour"},{level:3,text:"Asserting behaviour, how not to do it",id:"asserting-behaviour-how-not-to-do-it"},{level:3,text:"Asserting behaviour, how still not to do it",id:"asserting-behaviour-how-still-not-to-do-it"},{level:3,text:"Asserting behaviour, how to do it",id:"asserting-behaviour-how-to-do-it"},{level:3,text:"Helpers, part 2 - testStore",id:"helpers-part-2-teststore"},{level:3,text:"The full unit test",id:"the-full-unit-test"},{level:3,text:"Wrapping up",id:"wrapping-up"},{level:3,text:"PS",id:"ps"}],tags:["react","redux","testing","jest"]},n.a.createElement("div",{className:"post","data-postid":"unittestingreactredux"},n.a.createElement("h3",{id:"premise"},"Premise"),n.a.createElement("p",null,"This article explores how to test a React component that is connected to Redux via ",n.a.createElement("code",null,"ReactRedux"),"."),n.a.createElement("p",null,"In doing that we will also establish some patterns for making good tests in general."),n.a.createElement("h3",{id:"test-subject"},"Test subject"),n.a.createElement("p",null,"Here's the (semi-)imaginary component that we want to test:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"export")," ",n.a.createElement("span",{className:"hljs-keyword"},"const")," CurrentLegoSetImage = ",n.a.createElement("span",{className:"hljs-function"},"() =>")," {",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"const")," set = useSelector(selectCurrentSet);",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"const")," dispatch = useDispatch();",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"const")," zoomHandler = ",n.a.createElement("span",{className:"hljs-function"},"() =>")," dispatch(zoomToImage(set.imgUrl));",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"return")," (",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"xml"},n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"div")," ",n.a.createElement("span",{className:"hljs-attr"},"className"),"=",n.a.createElement("span",{className:"hljs-string"},'"legoImg"'),">"),n.a.createElement("br",null),"      ",n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"img")," ",n.a.createElement("span",{className:"hljs-attr"},"onClick"),"=",n.a.createElement("span",{className:"hljs-string"},"{zoomHandler}")," ",n.a.createElement("span",{className:"hljs-attr"},"src"),"=",n.a.createElement("span",{className:"hljs-string"},"{set.imgUrl}")," ",n.a.createElement("span",{className:"hljs-attr"},"data-testid"),"=",n.a.createElement("span",{className:"hljs-string"},'"setimg"')," />"),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-tag"},"</",n.a.createElement("span",{className:"hljs-name"},"div"),">")),n.a.createElement("br",null),"  );",n.a.createElement("br",null),"};")),n.a.createElement("p",null,"Looking at the code, there seems to be two pieces of functionality we could cover with unit tests:"),n.a.createElement("ol",null,n.a.createElement("li",null,"it renders the current set image"),n.a.createElement("li",null,"it dispatches correct action when image is clicked")),n.a.createElement("p",null,"Let's begin with the first one!"),n.a.createElement("h3",{id:"arranging---how-not-to-do-it"},"Arranging - how not to do it"),n.a.createElement("p",null,"So - how do we test that the component renders the current set image?"),n.a.createElement("p",null,"A na\xefve approach would be to notice this line..."),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," set = useSelector(selectCurrentSet);")),n.a.createElement("p",null,"...and decide to simply mock ",n.a.createElement("code",null,"selectCurrentSet")," to return a fixture set."),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"jest.mock(",n.a.createElement("span",{className:"hljs-string"},'"../selectors"'),", ",n.a.createElement("span",{className:"hljs-function"},"() =>")," ({",n.a.createElement("br",null),"  ...jest.requireActual(",n.a.createElement("span",{className:"hljs-string"},'"../selectors"'),"),",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"selectCurrentSet"),": jest.fn().mockReturnValue(fixtureSet),",n.a.createElement("br",null),"}));")),n.a.createElement("p",null,"But this has big downside; we have now made assumptions about the component implementation in our test. If we change the component to use a different selector, the test will stop working."),n.a.createElement("p",null,"Mocking ",n.a.createElement("code",null,"useSelector")," isn't better. We're still in implementation detail land, as we then assume we're dealing with a hook component and not a class component using the ReactRedux ",n.a.createElement("code",null,".connect")," method."),n.a.createElement("h3",{id:"arranging---another-way-of-how-not-to-do-it"},"Arranging - another way of how not to do it"),n.a.createElement("p",null,"We don't want our test to mess with how the component connects to the store. Instead we want to ensure our store gets the state we need, and then let the component do its thing."),n.a.createElement("p",null,"So we could hand-craft the app state we need:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," testAppState = {",n.a.createElement("br",null),"  ...defaultAppState,",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"sets"),": {",n.a.createElement("br",null),"    ...defaultAppState.sets,",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-attr"},"data"),": {",n.a.createElement("br",null),"      [fixtureSet.id]: fixtureSet, ",n.a.createElement("span",{className:"hljs-comment"},"// injecting the fixture set into the data"),n.a.createElement("br",null),"    },",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"ui"),": {",n.a.createElement("br",null),"    ...defaultAppState.ui,",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-attr"},"currentSetId"),": fixtureSet.id, ",n.a.createElement("span",{className:"hljs-comment"},'// setting our fixture set as the "current" set'),n.a.createElement("br",null),"  },",n.a.createElement("br",null),"};")),n.a.createElement("p",null,"And then use that state to seed a new store instance:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," store = createStore(rootReducer, testAppState);")),n.a.createElement("p",null,"Now we can use that store in our test, and things should be dandy."),n.a.createElement("p",null,"But, this still isn't ideal!"),n.a.createElement("ul",null,n.a.createElement("li",null,"We're depending on knowing the shape of the state (granted, not a biggie if we're using TS, but still inelegant)"),n.a.createElement("li",null,"We run the risk of testing a scenario that isn't achievable in actual app usage, which could mean the test is pointless")),n.a.createElement("h3",{id:"arranging-yet-another-way-of-not-doing-it"},"Arranging, yet another way of not doing it."),n.a.createElement("p",null,"Instead, we want to get our fixture set into place the same way it normally would get there - by firing actions!"),n.a.createElement("p",null,"So, what if we do this?"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-comment"},"// injecting the fixture set into the data"),n.a.createElement("br",null),"store.dispatch({",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"type"),": LOAD_SETS_SUCCESS,",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"payload"),": {",n.a.createElement("br",null),"    [fixtureSet.id]: fixtureSet,",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"});",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-comment"},'// setting our fixture set as the "current" set'),n.a.createElement("br",null),"store.dispatch({",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"type"),": SET_CURRENT_SET,",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"payload"),": {",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-attr"},"id"),": fixtureSet.id,",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"});")),n.a.createElement("p",null,"Now our state will contain the correct state!"),n.a.createElement("p",null,"This still isn't ideal though - we have hand-crafted actions, which should only ever be done in action creators."),n.a.createElement("h3",{id:"arranging-how-to-actually-do-it"},"Arranging, how to actually do it"),n.a.createElement("p",null,"Therefore we refactor our previous failing into this:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"store.dispatch(loadSetsSuccess({ [fixtureSet.id]: fixtureSet }));",n.a.createElement("br",null),"store.dispatch(setCurrentSet(fixtureSet.id));")),n.a.createElement("p",null,"Now we're truly using the same API versus the Redux layer as a user using the app!"),n.a.createElement("p",null,"It also makes the test setup very readable, if you've named your action creators appropriately."),n.a.createElement("h3",{id:"acting---rendering-strategies"},"Acting - rendering strategies"),n.a.createElement("p",null,"Now our test wants to render our component within the context of that store. How do we do that?"),n.a.createElement("p",null,"As a reminder, this is what a ",n.a.createElement("code",null,"testing-library")," React component unit test usually looks like:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"import")," { render } ",n.a.createElement("span",{className:"hljs-keyword"},"from")," ",n.a.createElement("span",{className:"hljs-string"},'"@testing-library/react"'),";",n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-comment"},"// ...and inside a single test:"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," testLibAPI = render(",n.a.createElement("span",{className:"xml"},n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"CurrentLegoSetImage")," />")),");",n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-comment"},"// ...and now we use stuff from testLibAPI to assert things"))),n.a.createElement("p",null,"The simplest way to use the store with our test state would be to wrap the JSX given to the test library ",n.a.createElement("code",null,"render")," function with the ReactRedux store provider:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," testLibAPI = render(",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"xml"},n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"Provider")," ",n.a.createElement("span",{className:"hljs-attr"},"store"),"=",n.a.createElement("span",{className:"hljs-string"},"{store}"),">"),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"CurrentLegoSetImage")," />"),n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-tag"},"</",n.a.createElement("span",{className:"hljs-name"},"Provider"),">")),n.a.createElement("br",null),");")),n.a.createElement("p",null,"But having to do this for every single test render would grow old pretty fast!"),n.a.createElement("h3",{id:"helpers-part-1---testrender"},"Helpers, part 1 - testRender"),n.a.createElement("p",null,"Let's make a helper function that does the provider wrapping for you:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"import")," { render } ",n.a.createElement("span",{className:"hljs-keyword"},"from")," ",n.a.createElement("span",{className:"hljs-string"},'"@testing-library/react"'),";",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"import")," { Provider } ",n.a.createElement("span",{className:"hljs-keyword"},"from")," ",n.a.createElement("span",{className:"hljs-string"},'"react-redux"'),";",n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"export")," ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function")," ",n.a.createElement("span",{className:"hljs-title"},"testRender"),"(",n.a.createElement("span",{className:"hljs-params"},"jsx, { store, ...otherOpts }"),") "),"{",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"return")," render(",n.a.createElement("span",{className:"xml"},n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"Provider")," ",n.a.createElement("span",{className:"hljs-attr"},"store"),"=",n.a.createElement("span",{className:"hljs-string"},"{store}"),">"),"{jsx}",n.a.createElement("span",{className:"hljs-tag"},"</",n.a.createElement("span",{className:"hljs-name"},"Provider"),">")),", otherOpts);",n.a.createElement("br",null),"}")),n.a.createElement("p",null,"Now our test becomes this instead:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," testLibAPI = testRender(",n.a.createElement("span",{className:"xml"},n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"MyComponent")," ",n.a.createElement("span",{className:"hljs-attr"},"some"),"=",n.a.createElement("span",{className:"hljs-string"},"{props}"),">"),", { store });"))),n.a.createElement("p",null,"We still have to pass in our ",n.a.createElement("code",null,"store")," among the other options for every render, but I prefer that to some magical ",n.a.createElement("code",null,"beforeEach")," dance (which could mean leaking state between tests)."),n.a.createElement("h3",{id:"asserting-render"},"Asserting render"),n.a.createElement("p",null,"With what we've talked about so far, we have enough to write a full test for ensuring that ",n.a.createElement("code",null,"CurrentLegoSetImage")," renders the correct image:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"describe(",n.a.createElement("span",{className:"hljs-string"},'"The CurrentLegoSetImage component"'),", ",n.a.createElement("span",{className:"hljs-function"},"() =>")," {",n.a.createElement("br",null),"  it(",n.a.createElement("span",{className:"hljs-string"},'"shows the correct image"'),", ",n.a.createElement("span",{className:"hljs-function"},"() =>")," {",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-comment"},"// Arrange"),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"const")," store = makeStore(); ",n.a.createElement("span",{className:"hljs-comment"},"// same func we use in the actual app, gives us a normal Redux store"),n.a.createElement("br",null),"    store.dispatch(loadSetsSuccess({ [fixtureSet.id]: fixtureSet }));",n.a.createElement("br",null),"    store.dispatch(setCurrentSet(fixtureSet.id));",n.a.createElement("br",null),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-comment"},"// Act"),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"const")," { getByTestId } = testRender(",n.a.createElement("span",{className:"xml"},n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"LegoSetImage")," />")),", { store });",n.a.createElement("br",null),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-comment"},"// Assert"),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"const")," img = getByTestId(",n.a.createElement("span",{className:"hljs-string"},'"setimg"'),");",n.a.createElement("br",null),"    expect(img).toHaveAttribute(",n.a.createElement("span",{className:"hljs-string"},'"src"'),", fixtureSet.imgUrl);",n.a.createElement("br",null),"  });",n.a.createElement("br",null),"});")),n.a.createElement("p",null,"Readable, no assumptions about implementation detail, no mocking or other magic."),n.a.createElement("h3",{id:"acting-behaviour"},"Acting behaviour"),n.a.createElement("p",null,"But, that was just the first half of the testing done. As we said initially we also need to test the zooming functionality!"),n.a.createElement("p",null,"Here's the code in the component that we want to test:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," zoomHandler = ",n.a.createElement("span",{className:"hljs-function"},"() =>")," dispatch(zoomToImage(set.imgUrl));")),n.a.createElement("p",null,"In other words, we want to ensure that when the image is clicked, a zoom happens."),n.a.createElement("p",null,"Doing the click in our test is easy enough. We get hold of the ",n.a.createElement("code",null,"fireEvent")," helper from the testing library..."),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"import")," { fireEvent } ",n.a.createElement("span",{className:"hljs-keyword"},"from")," ",n.a.createElement("span",{className:"hljs-string"},'"@testing-library/react"'),";")),n.a.createElement("p",null,"...and then simply use that to fire the click on the rendered ",n.a.createElement("code",null,"img")," element in our unit test:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," { getByTestId } = testRender(",n.a.createElement("span",{className:"xml"},n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"LegoSetImage")," />")),", { store });",n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," img = getByTestId(",n.a.createElement("span",{className:"hljs-string"},'"setimg"'),");",n.a.createElement("br",null),"fireEvent.click(img);")),n.a.createElement("p",null,"But, then what? What should we actually test for now?"),n.a.createElement("h3",{id:"asserting-behaviour-how-not-to-do-it"},"Asserting behaviour, how not to do it"),n.a.createElement("p",null,"One option could be to check the store state after the event:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"expect(store.getState().ui.zoomedImage).toBe(fixtureSet.imgUrl);")),n.a.createElement("p",null,"This isn't ideal though - now we're testing the behaviour of the ",n.a.createElement("code",null,"zoomToImage")," action, not the component. Likely the code we just wrote is identical to a unit test for ",n.a.createElement("code",null,"zoomToImage")," elsewhere, which isn't very DRY."),n.a.createElement("h3",{id:"asserting-behaviour-how-still-not-to-do-it"},"Asserting behaviour, how still not to do it"),n.a.createElement("p",null,"Instead, we just want to assert that the correct action was fired to the store! If ",n.a.createElement("code",null,"store.dispatch")," was wrapped in a spy, we could do something like this:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," zoomAction = {",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"type"),": ZOOM_TO_IMAGE_URL,",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-attr"},"payload"),": {",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-attr"},"url"),": fixtureSet.imgUrl,",n.a.createElement("br",null),"  },",n.a.createElement("br",null),"};",n.a.createElement("br",null),"expect(store.dispatch).toHaveBeenCalledWith(zoomAction);")),n.a.createElement("p",null,"Now we're not testing the consequence of the zoom, we're just ensuring that the zoom happened. Which is exactly what we wanted!"),n.a.createElement("p",null,"But, of course, we re-committed our earlier sin of handcrafting action objects."),n.a.createElement("h3",{id:"asserting-behaviour-how-to-do-it"},"Asserting behaviour, how to do it"),n.a.createElement("p",null,"Here's the final version where we use the action creator in the assertion:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," zoomAction = zoomToImage(fixtureSet.imgUrl);",n.a.createElement("br",null),"expect(store.dispatch).toHaveBeenCalledWith(zoomAction);")),n.a.createElement("p",null,"Much like when we rephrased the acting part we find that through using action creators we get very readable tests! And, as we've already established, it also has the added benefit of actually testing the correct API surface."),n.a.createElement("h3",{id:"helpers-part-2---teststore"},"Helpers, part 2 - testStore"),n.a.createElement("p",null,"But now we've just been imagining that ",n.a.createElement("code",null,"store.dispatch")," is wrapped in a spy. How do we accomplish that?"),n.a.createElement("p",null,"Remember how we made a thin ",n.a.createElement("code",null,"testRender")," wrapper around ",n.a.createElement("code",null,"render")," from the testing library? In the same vein we can make a ",n.a.createElement("code",null,"makeTestStore")," wrapper around ",n.a.createElement("code",null,"makeStore")," from our app!"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"const")," makeTestStore = ",n.a.createElement("span",{className:"hljs-function"},"(",n.a.createElement("span",{className:"hljs-params"},"store"),") =>")," {",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"const")," store = makeStore();",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"const")," origDispatch = store.dispatch;",n.a.createElement("br",null),"  store.dispatch = jest.fn(origDispatch);",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"return")," store;",n.a.createElement("br",null),"};")),n.a.createElement("p",null,"Again, ",n.a.createElement("code",null,"makeStore")," here is just the main store constructor function that I use in my app. It likely looks something like this:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-keyword"},"import")," { createStore } ",n.a.createElement("span",{className:"hljs-keyword"},"from")," ",n.a.createElement("span",{className:"hljs-string"},'"redux"'),";",n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-keyword"},"const")," makeStore = ",n.a.createElement("span",{className:"hljs-function"},"() =>")," {",n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-comment"},"// ...code here to create enhancers and the other stuff..."),n.a.createElement("br",null),"  ",n.a.createElement("span",{className:"hljs-keyword"},"return")," createStore(rootReducer, initialAppState, compose(...enhancers));",n.a.createElement("br",null),"};")),n.a.createElement("h3",{id:"the-full-unit-test"},"The full unit test"),n.a.createElement("p",null,"If we piece everything together, here's the full test for our component:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"describe(",n.a.createElement("span",{className:"hljs-string"},'"The CurrentLegoSetImage component"'),", ",n.a.createElement("span",{className:"hljs-function"},"() =>")," {",n.a.createElement("br",null),"  it(",n.a.createElement("span",{className:"hljs-string"},'"shows the correct image and zooms on click"'),", ",n.a.createElement("span",{className:"hljs-function"},"() =>")," {",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-comment"},"// Arrange"),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"const")," store = makeTestStore();",n.a.createElement("br",null),"    store.dispatch(loadSetsSuccess({ [fixtureSet.id]: fixtureSet }));",n.a.createElement("br",null),"    store.dispatch(setCurrentSet(fixtureSet.id));",n.a.createElement("br",null),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-comment"},"// Act"),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"const")," { getByTestId } = testRender(",n.a.createElement("span",{className:"xml"},n.a.createElement("span",{className:"hljs-tag"},"<",n.a.createElement("span",{className:"hljs-name"},"LegoSetImage")," />")),", { store });",n.a.createElement("br",null),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-comment"},"// Assert"),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"const")," img = getByTestId(",n.a.createElement("span",{className:"hljs-string"},'"setimg"'),");",n.a.createElement("br",null),"    expect(img).toHaveAttribute(",n.a.createElement("span",{className:"hljs-string"},'"src"'),", fixtureSet.imgUrl);",n.a.createElement("br",null),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-comment"},"// Act"),n.a.createElement("br",null),"    fireEvent.click(getByTestId(",n.a.createElement("span",{className:"hljs-string"},'"setimg"'),"));",n.a.createElement("br",null),n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-comment"},"// Assert"),n.a.createElement("br",null),"    expect(store.dispatch).toHaveBeenCalledWith(zoomImage(setImageUrl));",n.a.createElement("br",null),"  });",n.a.createElement("br",null),"});")),n.a.createElement("p",null,"Purists might argue that this test should be split in two, but, you get the idea!"),n.a.createElement("h3",{id:"wrapping-up"},"Wrapping up"),n.a.createElement("p",null,"To bring things home; the main point of this article is to try to test the API surface of the Redux layer, however we connect our React tree to it."),n.a.createElement("p",null,"We strive to avoid testing implementation detail, which I feel we achieved. Our final test version is almost completely independent of ",n.a.createElement("code",null,"ReactRedux")," - if we were to change it out for another bridging solution, the only change we'd need to make is to swap out ",n.a.createElement("code",null,"Provider")," in ",n.a.createElement("code",null,"testRender"),"!"),n.a.createElement("p",null,"And, perhaps most importantly; testing your component with this strategy also means you end up with very readable and robust tests!"),n.a.createElement("h3",{id:"ps"},"PS"),n.a.createElement("p",null,"One could absolutely discuss whether the functionality in this rather trivial component is worth testing. I argue it is, but at the same time I can understand taking a more pragmatic approach and choosing one's battles more strategically."),n.a.createElement("p",null,"But that's a topic for another article!")),n.a.createElement("hr",null))}},"gYs+":function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/unit-testing-react-redux-components",function(){var e=a("OG40");return{page:e.default||e}}])}},[["gYs+",1,0]]]);