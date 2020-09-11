(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{KcjN:function(e,a,t){"use strict";t.r(a);var l=t("q1tI"),s=t.n(l),n=t("JRaF"),r=(t("YFqc"),{url:"a-react-app-demonstrating-css3-flexbox",id:"flexdemo",title:"A React app demonstrating CSS3 flexbox",author:"david",tags:["css","css3","flexbox","react","case study","underscore"],date:"2015-03-29",excerpt:"Presenting and dissecting a React-built CSS flexbox demonstration app",type:"post",folder:"/Users/davidwaller/gitreps/mine/blog2/sources/2015-03-29_flexdemo",hasStaticContent:!0,headlines:[{level:3,text:"Exploring Flexbox",id:"exploring-flexbox"},{level:3,text:"Components",id:"components"},{level:3,text:"Demo",id:"demo"},{level:3,text:"Child",id:"child"},{level:3,text:"Form",id:"form"},{level:3,text:"Dropdown",id:"dropdown"},{level:3,text:"Wrapping up",id:"wrapping-up"}]});a.default=function(){return s.a.createElement(n.a,{kind:"post",data:r,title:"A React app demonstrating CSS3 flexbox",summary:"Presenting and dissecting a React-built CSS flexbox demonstration app",headlines:[{level:3,text:"Exploring Flexbox",id:"exploring-flexbox"},{level:3,text:"Components",id:"components"},{level:3,text:"Demo",id:"demo"},{level:3,text:"Child",id:"child"},{level:3,text:"Form",id:"form"},{level:3,text:"Dropdown",id:"dropdown"},{level:3,text:"Wrapping up",id:"wrapping-up"}],tags:["css","css3","flexbox","react","case study","underscore"]},s.a.createElement("div",{className:"post","data-postid":"flexdemo"},s.a.createElement("h3",{id:"exploring-flexbox"},"Exploring Flexbox"),s.a.createElement("p",null,"Like everyone else I've been playing around with the newly released ",s.a.createElement("a",{href:"http://facebook.github.io/react-native/"},"React Native"),". Buckets of fun! But I was quickly made aware that I still haven't really understood ",s.a.createElement("a",{href:"https://css-tricks.com/snippets/css/a-guide-to-flexbox/"},"flexbox"),", which React Native uses for layout."),s.a.createElement("p",null,"In order to alleviate that I built an interactive demo app where you can change the related props for the container and the children, and see first hand what the resulting layout looks like. This helped me a lot, so I share it here hoping it can help you too! You can try it out below, and it is also published ",s.a.createElement("a",{href:""},"here"),"."),s.a.createElement("iframe",{src:"https://blog.krawaller.se/flexboxdemo/index.html",style:{height:440,width:"100%"}}),s.a.createElement("p",null,"Putting the demo app together was a lot of fun! I used React (of course), and it turned out to be a great fit for this particular project. Throughout the rest of this post I'll walk through the ",s.a.createElement("a",{href:""},"source code"),"."),s.a.createElement("h3",{id:"components"},"Components"),s.a.createElement("p",null,"The app is made up by four components:"),s.a.createElement("p",null,s.a.createElement("img",{src:"/static/posts/a-react-app-demonstrating-css3-flexbox/img/flexboxcomp.jpg",alt:"components"})),s.a.createElement("p",null,"The top level ",s.a.createElement("code",null,"Demo")," component uses ",s.a.createElement("code",null,"Child")," to display the flex children. It also renders the two ",s.a.createElement("code",null,"Form"),"s, who in turn uses ",s.a.createElement("code",null,"Dropdown")," for each individual control."),s.a.createElement("h3",{id:"demo"},"Demo"),s.a.createElement("p",null,"Let's first look at the ",s.a.createElement("code",null,"Demo")," component. The file (",s.a.createElement("a",{href:"https://github.com/krawaller/flexboxdemo/blob/gh-pages/src/demo.js"},"demo.js"),") contains the regular class definition as well as the flex data blueprint:"),s.a.createElement("pre",null,s.a.createElement("code",{className:"hljs language-javascript"},s.a.createElement("span",{className:"hljs-keyword"},"var")," parentoptions = {",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"flexDirection"),": [",s.a.createElement("span",{className:"hljs-string"},'"row"'),",",s.a.createElement("span",{className:"hljs-string"},'"row-reverse"'),",",s.a.createElement("span",{className:"hljs-string"},'"column"'),",",s.a.createElement("span",{className:"hljs-string"},'"column-reverse"'),"],",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"justifyContent"),": [",s.a.createElement("span",{className:"hljs-string"},'"flex-start"'),",",s.a.createElement("span",{className:"hljs-string"},'"flex-end"'),",",s.a.createElement("span",{className:"hljs-string"},'"center"'),",",s.a.createElement("span",{className:"hljs-string"},'"space-between"'),",",s.a.createElement("span",{className:"hljs-string"},'"space-around"'),"],",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"alignItems"),": [",s.a.createElement("span",{className:"hljs-string"},'"flex-start"'),",",s.a.createElement("span",{className:"hljs-string"},'"flex-end"'),",",s.a.createElement("span",{className:"hljs-string"},'"center"'),",",s.a.createElement("span",{className:"hljs-string"},'"stretch"'),",",s.a.createElement("span",{className:"hljs-string"},'"baseline"'),"],",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"flexWrap"),": [",s.a.createElement("span",{className:"hljs-string"},'"nowrap"'),",",s.a.createElement("span",{className:"hljs-string"},'"wrap"'),",",s.a.createElement("span",{className:"hljs-string"},'"wrap-reverse"'),"],",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"alignContent"),": [",s.a.createElement("span",{className:"hljs-string"},'"flex-start"'),",",s.a.createElement("span",{className:"hljs-string"},'"flex-end"'),",",s.a.createElement("span",{className:"hljs-string"},'"center"'),",",s.a.createElement("span",{className:"hljs-string"},'"stretch"'),",",s.a.createElement("span",{className:"hljs-string"},'"space-between"'),",",s.a.createElement("span",{className:"hljs-string"},'"space-around"'),"]",s.a.createElement("br",null),"};",s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("span",{className:"hljs-keyword"},"var")," childoptions = {",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"alignSelf"),": [",s.a.createElement("span",{className:"hljs-string"},'"auto"'),",",s.a.createElement("span",{className:"hljs-string"},'"flex-start"'),",",s.a.createElement("span",{className:"hljs-string"},'"flex-end"'),",",s.a.createElement("span",{className:"hljs-string"},'"center"'),",",s.a.createElement("span",{className:"hljs-string"},'"baseline"'),",",s.a.createElement("span",{className:"hljs-string"},'"stretch"'),"],",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"flexGrow"),": _.range(",s.a.createElement("span",{className:"hljs-number"},"0"),",",s.a.createElement("span",{className:"hljs-number"},"6"),"),",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"order"),": _.range(",s.a.createElement("span",{className:"hljs-number"},"-10"),",",s.a.createElement("span",{className:"hljs-number"},"11"),")",s.a.createElement("br",null),"};",s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("span",{className:"hljs-keyword"},"var")," Demo = React.createClass({",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"getInitialState"),": ",s.a.createElement("span",{className:"hljs-function"},s.a.createElement("span",{className:"hljs-keyword"},"function"),"(",s.a.createElement("span",{className:"hljs-params"}),")"),"{...},",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"setValue"),": ",s.a.createElement("span",{className:"hljs-function"},s.a.createElement("span",{className:"hljs-keyword"},"function"),"(",s.a.createElement("span",{className:"hljs-params"}),")"),"{...},",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"render"),": ",s.a.createElement("span",{className:"hljs-function"},s.a.createElement("span",{className:"hljs-keyword"},"function"),"(",s.a.createElement("span",{className:"hljs-params"}),")"),"{...}",s.a.createElement("br",null),"});")),s.a.createElement("p",null,"These are used to build the initial state of the component:"),s.a.createElement("pre",null,s.a.createElement("code",{className:"hljs language-javascript"},"getInitialState: ",s.a.createElement("span",{className:"hljs-function"},s.a.createElement("span",{className:"hljs-keyword"},"function"),"(",s.a.createElement("span",{className:"hljs-params"}),")"),"{",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-keyword"},"return")," {",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"parent"),": _.mapValues(parentoptions,_.first),",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"children"),": _.range(",s.a.createElement("span",{className:"hljs-number"},"1"),",",s.a.createElement("span",{className:"hljs-number"},"5"),").map(",s.a.createElement("span",{className:"hljs-function"},s.a.createElement("span",{className:"hljs-keyword"},"function"),"(",s.a.createElement("span",{className:"hljs-params"},"n"),")"),"{",s.a.createElement("br",null),"      ",s.a.createElement("span",{className:"hljs-keyword"},"return")," _.extend(_.mapValues(childoptions,_.first),{ ",s.a.createElement("span",{className:"hljs-attr"},"ID"),": n, ",s.a.createElement("span",{className:"hljs-attr"},"order"),": ",s.a.createElement("span",{className:"hljs-number"},"0"),", ",s.a.createElement("span",{className:"hljs-attr"},"flexGrow"),": ",s.a.createElement("span",{className:"hljs-number"},"0")," });",s.a.createElement("br",null),"    }),",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"selectedId"),": ",s.a.createElement("span",{className:"hljs-number"},"0"),s.a.createElement("br",null),"  };",s.a.createElement("br",null),"}")),s.a.createElement("p",null,"As you can see we have three state variables:"),s.a.createElement("ul",null,s.a.createElement("li",null,s.a.createElement("code",null,"parent")," contains the currently selected container options. To begin with we select the first option from each array of property values."),s.a.createElement("li",null,s.a.createElement("code",null,"children")," contains an array with an option object for each child. Again we use the first option as default except for ",s.a.createElement("code",null,"flexGrow")," and ",s.a.createElement("code",null,"order"),". Each child is also given a unique id."),s.a.createElement("li",null,s.a.createElement("code",null,"selectedId")," contains the position of the currently selected child.")),s.a.createElement("p",null,"The app implements a bare-bones cursor, similar to ",s.a.createElement("a",{href:"https://github.com/dustingetz/react-cursor"},"React cursor")," or ",s.a.createElement("a",{href:"https://github.com/mquan/cortex"},"Cortex"),". The child components will get callbacks that when called update ",s.a.createElement("code",null,"Demo"),"'s state. This is implemented through the ",s.a.createElement("code",null,"setValues")," method:"),s.a.createElement("pre",null,s.a.createElement("code",{className:"hljs language-javascript"},"setValue: ",s.a.createElement("span",{className:"hljs-function"},s.a.createElement("span",{className:"hljs-keyword"},"function"),"(",s.a.createElement("span",{className:"hljs-params"}),")"),"{",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-keyword"},"var")," arr = ",s.a.createElement("span",{className:"hljs-built_in"},"Array"),".prototype.slice.call(",s.a.createElement("span",{className:"hljs-built_in"},"arguments"),"),",s.a.createElement("br",null),"      val = arr.pop(),",s.a.createElement("br",null),"      prop = arr.pop(),",s.a.createElement("br",null),"      clone = _.cloneDeep(",s.a.createElement("span",{className:"hljs-built_in"},"this"),".state),",s.a.createElement("br",null),"      pointer = clone;",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-keyword"},"while"),"(arr.length) pointer = pointer[arr.shift()];",s.a.createElement("br",null),"  pointer[prop] = _.isFinite(",s.a.createElement("span",{className:"hljs-built_in"},"parseInt"),"(val)) ? ",s.a.createElement("span",{className:"hljs-built_in"},"parseInt"),"(val) : val;",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-built_in"},"this"),".setState(clone);",s.a.createElement("br",null),"}")),s.a.createElement("p",null,"If we did ",s.a.createElement("code",null,'setValue("children",0,"alignSelf","stretch")'),", then that would equal ",s.a.createElement("code",null,'this.state["children"][0]["alignSelf"] = "stretch"'),"."),s.a.createElement("p",null,"Inside the ",s.a.createElement("code",null,"render")," method of ",s.a.createElement("code",null,"Demo")," we pass callbacks to the child components tied to ",s.a.createElement("code",null,"setValue"),", with the arguments partly prefilled."),s.a.createElement("pre",null,s.a.createElement("code",{className:"hljs language-javascript"},"  render: ",s.a.createElement("span",{className:"hljs-function"},s.a.createElement("span",{className:"hljs-keyword"},"function"),"(",s.a.createElement("span",{className:"hljs-params"}),")"),"{",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-keyword"},"var")," s = ",s.a.createElement("span",{className:"hljs-built_in"},"this"),".state, child = s.selectedId, cbmaker = ",s.a.createElement("span",{className:"hljs-built_in"},"Function"),".prototype.bind.bind(",s.a.createElement("span",{className:"hljs-built_in"},"this"),".setValue,",s.a.createElement("span",{className:"hljs-built_in"},"this"),");",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-keyword"},"return")," (",s.a.createElement("br",null),"      ",s.a.createElement("span",{className:"xml"},s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"div")," ",s.a.createElement("span",{className:"hljs-attr"},"className"),"=",s.a.createElement("span",{className:"hljs-string"},'"wrapper"')," ",s.a.createElement("span",{className:"hljs-attr"},"key"),"=",s.a.createElement("span",{className:"hljs-string"},"{Date()}"),">"),s.a.createElement("br",null),"        ",s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"div")," ",s.a.createElement("span",{className:"hljs-attr"},"className"),"=",s.a.createElement("span",{className:"hljs-string"},'"explanation"'),">"),"...",s.a.createElement("span",{className:"hljs-tag"},"</",s.a.createElement("span",{className:"hljs-name"},"div"),">"),s.a.createElement("br",null),"        ",s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"div")," ",s.a.createElement("span",{className:"hljs-attr"},"className"),"=",s.a.createElement("span",{className:"hljs-string"},'"forms"'),">"),s.a.createElement("br",null),"          ",s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"Form")," ",s.a.createElement("span",{className:"hljs-attr"},"title"),"=",s.a.createElement("span",{className:"hljs-string"},'"container"')," ",s.a.createElement("span",{className:"hljs-attr"},"options"),"=",s.a.createElement("span",{className:"hljs-string"},"{parentoptions}")," ",s.a.createElement("span",{className:"hljs-attr"},"values"),"=",s.a.createElement("span",{className:"hljs-string"},"{s.parent}")," ",s.a.createElement("span",{className:"hljs-attr"},"callback"),"=",s.a.createElement("span",{className:"hljs-string"},"{cbmaker("),'"',s.a.createElement("span",{className:"hljs-attr"},"parent"),'")} />'),s.a.createElement("br",null),"          ",s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"Form")," ",s.a.createElement("span",{className:"hljs-attr"},"title"),"=",s.a.createElement("span",{className:"hljs-string"},"{"),'"',s.a.createElement("span",{className:"hljs-attr"},"child"),' #"+(',s.a.createElement("span",{className:"hljs-attr"},"child"),"+",s.a.createElement("span",{className:"hljs-attr"},"1"),")} ",s.a.createElement("span",{className:"hljs-attr"},"options"),"=",s.a.createElement("span",{className:"hljs-string"},"{childoptions}")," ",s.a.createElement("span",{className:"hljs-attr"},"values"),"=",s.a.createElement("span",{className:"hljs-string"},"{s.children[child]}")," ",s.a.createElement("span",{className:"hljs-attr"},"callback"),"=",s.a.createElement("span",{className:"hljs-string"},"{cbmaker("),'"',s.a.createElement("span",{className:"hljs-attr"},"children"),'",',s.a.createElement("span",{className:"hljs-attr"},"child"),")} />"),s.a.createElement("br",null),"        ",s.a.createElement("span",{className:"hljs-tag"},"</",s.a.createElement("span",{className:"hljs-name"},"div"),">"),s.a.createElement("br",null),"        ",s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"div")," ",s.a.createElement("span",{className:"hljs-attr"},"className"),"=",s.a.createElement("span",{className:"hljs-string"},'"container"')," ",s.a.createElement("span",{className:"hljs-attr"},"style"),"=",s.a.createElement("span",{className:"hljs-string"},"{s.parent}"),">"),s.a.createElement("br",null),"          {s.children.map(function(c,n){",s.a.createElement("br",null),"            return ",s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"Child")," ",s.a.createElement("span",{className:"hljs-attr"},"key"),"=",s.a.createElement("span",{className:"hljs-string"},"{c.ID}")," ",s.a.createElement("span",{className:"hljs-attr"},"def"),"=",s.a.createElement("span",{className:"hljs-string"},"{c}")," ",s.a.createElement("span",{className:"hljs-attr"},"selected"),"=",s.a.createElement("span",{className:"hljs-string"},"{n"),"===",s.a.createElement("span",{className:"hljs-string"},"child}")," ",s.a.createElement("span",{className:"hljs-attr"},"callback"),"=",s.a.createElement("span",{className:"hljs-string"},"{cbmaker("),'"',s.a.createElement("span",{className:"hljs-attr"},"selectedId"),'",',s.a.createElement("span",{className:"hljs-attr"},"n"),")} />"),";",s.a.createElement("br",null),"          },this)}",s.a.createElement("br",null),"        ",s.a.createElement("span",{className:"hljs-tag"},"</",s.a.createElement("span",{className:"hljs-name"},"div"),">"),s.a.createElement("br",null),"      ",s.a.createElement("span",{className:"hljs-tag"},"</",s.a.createElement("span",{className:"hljs-name"},"div"),">")),s.a.createElement("br",null),"    );",s.a.createElement("br",null),"  }")),s.a.createElement("p",null,"Yes, I did feel rather smug when using ",s.a.createElement("code",null,"bind")," on ",s.a.createElement("code",null,"bind")," to define ",s.a.createElement("code",null,"cbmaker"),". :)"),s.a.createElement("h3",{id:"child"},"Child"),s.a.createElement("p",null,"The ",s.a.createElement("a",{href:"https://github.com/krawaller/flexboxdemo/blob/gh-pages/src/child.js"},s.a.createElement("code",null,"Child")," component")," is rather simple - it receives an object of styles which it should apply, and also write out."),s.a.createElement("pre",null,s.a.createElement("code",{className:"hljs language-javascript"},s.a.createElement("span",{className:"hljs-keyword"},"var")," Child = React.createClass({",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"propTypes"),": {",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"def"),": ptypes.objectOf(ptypes.oneOfType([ptypes.string, ptypes.number]))",s.a.createElement("br",null),"      .isRequired,",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"selected"),": ptypes.bool,",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"callback"),": ptypes.func.isRequired",s.a.createElement("br",null),"  },",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"render"),": ",s.a.createElement("span",{className:"hljs-function"},s.a.createElement("span",{className:"hljs-keyword"},"function"),"(",s.a.createElement("span",{className:"hljs-params"}),") "),"{",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-keyword"},"var")," p = ",s.a.createElement("span",{className:"hljs-built_in"},"this"),".props;",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-keyword"},"return")," (",s.a.createElement("br",null),"      ",s.a.createElement("span",{className:"xml"},s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"div"),s.a.createElement("br",null),"        ",s.a.createElement("span",{className:"hljs-attr"},"onClick"),"=",s.a.createElement("span",{className:"hljs-string"},"{_.ary(p.callback,")," ",s.a.createElement("span",{className:"hljs-attr"},"0"),")}",s.a.createElement("br",null),"        ",s.a.createElement("span",{className:"hljs-attr"},"style"),"=",s.a.createElement("span",{className:"hljs-string"},"{p.def}"),s.a.createElement("br",null),"        ",s.a.createElement("span",{className:"hljs-attr"},"className"),"=",s.a.createElement("span",{className:"hljs-string"},"{"),'"',s.a.createElement("span",{className:"hljs-attr"},"child"),'" + (',s.a.createElement("span",{className:"hljs-attr"},"p.selected"),' ? " ',s.a.createElement("span",{className:"hljs-attr"},"selectedchild"),'" ',s.a.createElement("span",{className:"hljs-attr"},":"),' "")}',s.a.createElement("br",null),"      >"),s.a.createElement("br",null),"        {_.map(",s.a.createElement("br",null),"          p.def,",s.a.createElement("br",null),"          function(val, key) {",s.a.createElement("br",null),"            return (",s.a.createElement("br",null),"              ",s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"div")," ",s.a.createElement("span",{className:"hljs-attr"},"key"),"=",s.a.createElement("span",{className:"hljs-string"},"{key}"),">"),s.a.createElement("br",null),"                {key}: {val}",s.a.createElement("br",null),"              ",s.a.createElement("span",{className:"hljs-tag"},"</",s.a.createElement("span",{className:"hljs-name"},"div"),">"),s.a.createElement("br",null),"            );",s.a.createElement("br",null),"          },",s.a.createElement("br",null),"          this",s.a.createElement("br",null),"        )}",s.a.createElement("br",null),"      ",s.a.createElement("span",{className:"hljs-tag"},"</",s.a.createElement("span",{className:"hljs-name"},"div"),">")),s.a.createElement("br",null),"    );",s.a.createElement("br",null),"  }",s.a.createElement("br",null),"});")),s.a.createElement("p",null,"Notice how we must do ",s.a.createElement("code",null,"_.ary(p.callback,0)")," to prevent the click event from being passed along, messing up the ",s.a.createElement("code",null,"setValue")," call in ",s.a.createElement("code",null,"Demo"),"."),s.a.createElement("h3",{id:"form"},"Form"),s.a.createElement("p",null,"The ",s.a.createElement("a",{href:"https://github.com/krawaller/flexboxdemo/blob/gh-pages/src/form.js"},s.a.createElement("code",null,"Form")," component")," take an ",s.a.createElement("code",null,"options")," object, a ",s.a.createElement("code",null,"values")," object containing the currently selected options, a ",s.a.createElement("code",null,"title")," and a ",s.a.createElement("code",null,"callback"),". It will then use a ",s.a.createElement("code",null,"Dropdown")," component for each property in ",s.a.createElement("code",null,"options"),"/",s.a.createElement("code",null,"values"),"."),s.a.createElement("pre",null,s.a.createElement("code",{className:"hljs language-javascript"},s.a.createElement("span",{className:"hljs-keyword"},"var")," Form = React.createClass({",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"propTypes"),": {",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"options"),": ptypes.objectOf(",s.a.createElement("br",null),"      ptypes.arrayOf(ptypes.oneOfType([ptypes.string, ptypes.number]))",s.a.createElement("br",null),"    ).isRequired,",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"values"),": ptypes.objectOf(ptypes.oneOfType([ptypes.string, ptypes.number]))",s.a.createElement("br",null),"      .isRequired,",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"title"),": ptypes.string.isRequired,",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"callback"),": ptypes.func.isRequired",s.a.createElement("br",null),"  },",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"render"),": ",s.a.createElement("span",{className:"hljs-function"},s.a.createElement("span",{className:"hljs-keyword"},"function"),"(",s.a.createElement("span",{className:"hljs-params"}),") "),"{",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-keyword"},"var")," p = ",s.a.createElement("span",{className:"hljs-built_in"},"this"),".props;",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-keyword"},"return")," (",s.a.createElement("br",null),"      ",s.a.createElement("span",{className:"xml"},s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"div")," ",s.a.createElement("span",{className:"hljs-attr"},"className"),"=",s.a.createElement("span",{className:"hljs-string"},'"form"'),">"),s.a.createElement("br",null),"        ",s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"strong")," ",s.a.createElement("span",{className:"hljs-attr"},"key"),"=",s.a.createElement("span",{className:"hljs-string"},'"title"'),">"),"{p.title}",s.a.createElement("span",{className:"hljs-tag"},"</",s.a.createElement("span",{className:"hljs-name"},"strong"),">"),s.a.createElement("br",null),"        {_.mapValues(",s.a.createElement("br",null),"          p.options,",s.a.createElement("br",null),"          function(opts, name) {",s.a.createElement("br",null),"            return (",s.a.createElement("br",null),"              ",s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"div")," ",s.a.createElement("span",{className:"hljs-attr"},"key"),"=",s.a.createElement("span",{className:"hljs-string"},"{name}")," ",s.a.createElement("span",{className:"hljs-attr"},"className"),"=",s.a.createElement("span",{className:"hljs-string"},'"formrow"'),">"),s.a.createElement("br",null),"                ",s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"span"),">"),"{name}: ",s.a.createElement("span",{className:"hljs-tag"},"</",s.a.createElement("span",{className:"hljs-name"},"span"),">"),s.a.createElement("br",null),"                ",s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"Dropdown"),s.a.createElement("br",null),"                  ",s.a.createElement("span",{className:"hljs-attr"},"options"),"=",s.a.createElement("span",{className:"hljs-string"},"{opts}"),s.a.createElement("br",null),"                  ",s.a.createElement("span",{className:"hljs-attr"},"current"),"=",s.a.createElement("span",{className:"hljs-string"},"{p.values[name]}"),s.a.createElement("br",null),"                  ",s.a.createElement("span",{className:"hljs-attr"},"callback"),"=",s.a.createElement("span",{className:"hljs-string"},"{p.callback.bind(this,")," ",s.a.createElement("span",{className:"hljs-attr"},"name"),")}",s.a.createElement("br",null),"                />"),s.a.createElement("br",null),"              ",s.a.createElement("span",{className:"hljs-tag"},"</",s.a.createElement("span",{className:"hljs-name"},"div"),">"),s.a.createElement("br",null),"            );",s.a.createElement("br",null),"          },",s.a.createElement("br",null),"          this",s.a.createElement("br",null),"        )}",s.a.createElement("br",null),"      ",s.a.createElement("span",{className:"hljs-tag"},"</",s.a.createElement("span",{className:"hljs-name"},"div"),">")),s.a.createElement("br",null),"    );",s.a.createElement("br",null),"  }",s.a.createElement("br",null),"});")),s.a.createElement("p",null,"Note how it passes ",s.a.createElement("code",null,"callback")," along to each ",s.a.createElement("code",null,"Dropdown")," but curries it further with the property name."),s.a.createElement("h3",{id:"dropdown"},"Dropdown"),s.a.createElement("p",null,"Finally, the ",s.a.createElement("code",null,"Dropdown")," component renders a ",s.a.createElement("code",null,"select")," control with the given values."),s.a.createElement("pre",null,s.a.createElement("code",{className:"hljs language-javascript"},s.a.createElement("span",{className:"hljs-keyword"},"var")," Dropdown = React.createClass({",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"propTypes"),": {",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"options"),": ptypes.arrayOf(ptypes.oneOfType([ptypes.string, ptypes.number]))",s.a.createElement("br",null),"      .isRequired,",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"current"),": ptypes.oneOfType([ptypes.string, ptypes.number]).isRequired,",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-attr"},"callback"),": ptypes.func.isRequired",s.a.createElement("br",null),"  },",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"changeOption"),": ",s.a.createElement("span",{className:"hljs-function"},s.a.createElement("span",{className:"hljs-keyword"},"function"),"(",s.a.createElement("span",{className:"hljs-params"},"e"),") "),"{",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-built_in"},"this"),".props.callback(",s.a.createElement("span",{className:"hljs-built_in"},"this"),".refs.sel.getDOMNode().value);",s.a.createElement("br",null),"  },",s.a.createElement("br",null),"  ",s.a.createElement("span",{className:"hljs-attr"},"render"),": ",s.a.createElement("span",{className:"hljs-function"},s.a.createElement("span",{className:"hljs-keyword"},"function"),"(",s.a.createElement("span",{className:"hljs-params"}),") "),"{",s.a.createElement("br",null),"    ",s.a.createElement("span",{className:"hljs-keyword"},"return")," (",s.a.createElement("br",null),"      ",s.a.createElement("span",{className:"xml"},s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"select"),s.a.createElement("br",null),"        ",s.a.createElement("span",{className:"hljs-attr"},"ref"),"=",s.a.createElement("span",{className:"hljs-string"},'"sel"'),s.a.createElement("br",null),"        ",s.a.createElement("span",{className:"hljs-attr"},"onChange"),"=",s.a.createElement("span",{className:"hljs-string"},"{this.changeOption}"),s.a.createElement("br",null),"        ",s.a.createElement("span",{className:"hljs-attr"},"defaultValue"),"=",s.a.createElement("span",{className:"hljs-string"},"{"),'"" + ',s.a.createElement("span",{className:"hljs-attr"},"this.props.current"),"}",s.a.createElement("br",null),"      >"),s.a.createElement("br",null),"        {this.props.options.map(function(o) {",s.a.createElement("br",null),"          return (",s.a.createElement("br",null),"            ",s.a.createElement("span",{className:"hljs-tag"},"<",s.a.createElement("span",{className:"hljs-name"},"option")," ",s.a.createElement("span",{className:"hljs-attr"},"key"),"=",s.a.createElement("span",{className:"hljs-string"},"{o}")," ",s.a.createElement("span",{className:"hljs-attr"},"value"),"=",s.a.createElement("span",{className:"hljs-string"},"{o}"),">"),s.a.createElement("br",null),"              {o}",s.a.createElement("br",null),"            ",s.a.createElement("span",{className:"hljs-tag"},"</",s.a.createElement("span",{className:"hljs-name"},"option"),">"),s.a.createElement("br",null),"          );",s.a.createElement("br",null),"        })}",s.a.createElement("br",null),"      ",s.a.createElement("span",{className:"hljs-tag"},"</",s.a.createElement("span",{className:"hljs-name"},"select"),">")),s.a.createElement("br",null),"    );",s.a.createElement("br",null),"  }",s.a.createElement("br",null),"});")),s.a.createElement("p",null,"Calling ",s.a.createElement("code",null,"callback")," with the updated value will result in a curried call to ",s.a.createElement("code",null,"setValue"),"."),s.a.createElement("h3",{id:"wrapping-up"},"Wrapping up"),s.a.createElement("p",null,"Since the demo app by its very nature needed to cascade data changes, it turned out to be a great fit for React. Then again, most apps are!"),s.a.createElement("p",null,"And although flexbox can seem intimidating at first, the model at its heart is really rather simple! Yet hugely powerful, and I think it was a stroke of genious to give it the task of layout in React Native. I've done my fare share of Titanium development, but feel that using flexbox seems superior in every way.")),s.a.createElement("hr",null))}},"sGQ/":function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/a-react-app-demonstrating-css3-flexbox",function(){var e=t("KcjN");return{page:e.default||e}}])}},[["sGQ/",1,0]]]);