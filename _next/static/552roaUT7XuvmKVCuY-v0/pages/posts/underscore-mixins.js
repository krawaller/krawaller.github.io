(window.webpackJsonp=window.webpackJsonp||[]).push([[154],{eM6I:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/underscore-mixins",function(){var e=t("rQiD");return{page:e.default||e}}])},rQiD:function(e,a,t){"use strict";t.r(a);var l=t("q1tI"),n=t.n(l),s=t("JRaF"),r=(t("YFqc"),{url:"underscore-mixins",id:"underscoremixins",type:"post",title:"Underscore mixins",date:"2014-05-07",tags:["Underscore"],author:"david",excerpt:"Some methods I usually mix into Underscore",folder:"/Users/davidwaller/gitreps/mine/blog2/sources/2014-05-07_underscoremixins",hasStaticContent:!1,headlines:[{level:3,text:"`ensureArray(val,emptyel)`",id:"ensurearrayvalemptyel"},{level:3,text:"`mapObj(obj,iterator,context)`",id:"mapobjobjiteratorcontext"},{level:3,text:"`extendProp(obj,propname,source,source,...)`",id:"extendpropobjpropnamesourcesource"},{level:3,text:"`combine(array,array,...)`",id:"combinearrayarray"},{level:3,text:"Mixing it in",id:"mixing-it-in"}]});a.default=function(){return n.a.createElement(s.a,{kind:"post",data:r,title:"Underscore mixins",summary:"Some methods I usually mix into Underscore",headlines:[{level:3,text:"`ensureArray(val,emptyel)`",id:"ensurearrayvalemptyel"},{level:3,text:"`mapObj(obj,iterator,context)`",id:"mapobjobjiteratorcontext"},{level:3,text:"`extendProp(obj,propname,source,source,...)`",id:"extendpropobjpropnamesourcesource"},{level:3,text:"`combine(array,array,...)`",id:"combinearrayarray"},{level:3,text:"Mixing it in",id:"mixing-it-in"}],tags:["Underscore"]},n.a.createElement("div",{className:"post","data-postid":"underscoremixins"},n.a.createElement("p",null,"Here are some methods I usually mix into Underscore:"),n.a.createElement("h3",{id:"ensurearrayvalemptyel"},n.a.createElement("code",null,"ensureArray(val,emptyel)")),n.a.createElement("p",null,"This method always gives you back an array. There are four different scenarios:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-comment"},"// when passed an array, we get that array back:"),n.a.createElement("br",null),"_.ensureArray([",n.a.createElement("span",{className:"hljs-number"},"1"),",",n.a.createElement("span",{className:"hljs-number"},"2"),",",n.a.createElement("span",{className:"hljs-number"},"3"),"]); ",n.a.createElement("span",{className:"hljs-comment"},"// => [1,2,3]"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-comment"},"// when passed a truthy value that isn't an array,"),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-comment"},"// you get that value wrapped in an array:"),n.a.createElement("br",null),"_.ensureArray(",n.a.createElement("span",{className:"hljs-number"},"1"),"); ",n.a.createElement("span",{className:"hljs-comment"},"// => [1]"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-comment"},"// when passed a falsy value, we get an empty array:"),n.a.createElement("br",null),"_.ensureArray(undefvar); ",n.a.createElement("span",{className:"hljs-comment"},"// => []"),n.a.createElement("br",null),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-comment"},"// when passed a falsy value and the optional `emptyel` parameter,"),n.a.createElement("br",null),n.a.createElement("span",{className:"hljs-comment"},"// we get that parameter in an array:"),n.a.createElement("br",null),"_.ensureArray(undefvar,x); ",n.a.createElement("span",{className:"hljs-comment"},"// => [x]"))),n.a.createElement("p",null,"The point of the method is of course to safely use an API that expects an array when you're not sure exactly what you've got. Here's the source code:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),n.a.createElement("span",{className:"hljs-params"},"(o,e)"),"{ ",n.a.createElement("span",{className:"hljs-title"},"return")," ",n.a.createElement("span",{className:"hljs-title"},"o")," ? ",n.a.createElement("span",{className:"hljs-params"},"[]"),".",n.a.createElement("span",{className:"hljs-title"},"concat"),n.a.createElement("span",{className:"hljs-params"},"(o)")," : ",n.a.createElement("span",{className:"hljs-title"},"e")," ? ",n.a.createElement("span",{className:"hljs-params"},"[e]")," : ",n.a.createElement("span",{className:"hljs-params"},"[]"),";}"),n.a.createElement("br",null))),n.a.createElement("p",null,"A ",n.a.createElement("a",{href:"https://github.com/jashkenas/underscore/pull/816"},"pull request")," to add this into Underscore proper was shot down by Ashkenas for being too special case and because there are other object types too with the same problem. I agree with the first sentiment but not the second; We can easily ensure booleans (",n.a.createElement("code",null,"!!x"),"), strings (",n.a.createElement("code",null,'""+x'),") and numbers (",n.a.createElement("code",null,"+x"),"), but arrays alone require logic! Converting to objects will always be domain-specific so they don't really play into this discussion."),n.a.createElement("h3",{id:"mapobjobjiteratorcontext"},n.a.createElement("code",null,"mapObj(obj,iterator,context)")),n.a.createElement("p",null,"The ",n.a.createElement("code",null,"mapObj")," follows the filosophy of ",n.a.createElement("code",null,"map"),", but returns an object instead of an array. Here's a silly example:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},n.a.createElement("span",{className:"hljs-keyword"},"var")," obj = {a:",n.a.createElement("span",{className:"hljs-number"},"1"),",b:",n.a.createElement("span",{className:"hljs-number"},"2"),"}, ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"fn")," = ",n.a.createElement("span",{className:"hljs-title"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"i"),")"),"{",n.a.createElement("span",{className:"hljs-keyword"},"return")," i*",n.a.createElement("span",{className:"hljs-number"},"3"),";};",n.a.createElement("br",null),n.a.createElement("br",null),"mapObj(obj,",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"fn"),")"),"; ",n.a.createElement("span",{className:"hljs-comment"},"// => {a:3,b:6}"))),n.a.createElement("p",null,"There's been lots of pull requests and issues asking for this feature, but as it can be nicely composed and is considered to be a rare use case it has been denied. I however find myself very frequently needing to map objects, so being able to do that in a simple function call cleans up the codebase nicely. Here's the source:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"obj,iterator,context"),")"),"{",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"var")," keys = _.keys(obj);",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"return")," _.reduce(_.map(obj,iterator,context),",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"memo,val,i"),")"),"{",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"return")," _.extend(_.object([keys[i]],[val]),memo);",n.a.createElement("br",null),"    },{});",n.a.createElement("br",null),"}")),n.a.createElement("p",null,"If you're using Lo-Dash then there is already a function called ",n.a.createElement("a",{href:"http://lodash.com/docs#mapValues"},n.a.createElement("code",null,"mapValues"))," that does all of the above and more!"),n.a.createElement("h3",{id:"extendpropobjpropnamesourcesource"},n.a.createElement("code",null,"extendProp(obj,propname,source,source,...)")),n.a.createElement("p",null,"This is a utility method for exending an object which is the property of another object, which works even if the property doesn't exist. Doing this:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},"_.extend(obj[propname],source,source,...);")),n.a.createElement("p",null,"...would fail if the ",n.a.createElement("code",null,"propname")," property is undefined.Here's the source:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"}),")"),"{",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"var")," obj = ",n.a.createElement("span",{className:"hljs-built_in"},"arguments"),"[",n.a.createElement("span",{className:"hljs-number"},"0"),"], propname = ",n.a.createElement("span",{className:"hljs-built_in"},"arguments"),"[",n.a.createElement("span",{className:"hljs-number"},"1"),"], sources = ",n.a.createElement("span",{className:"hljs-built_in"},"Array"),".prototype.slice.call(",n.a.createElement("span",{className:"hljs-built_in"},"arguments"),", ",n.a.createElement("span",{className:"hljs-number"},"2"),");",n.a.createElement("br",null),"    obj[propname] = _.extend.apply(",n.a.createElement("span",{className:"hljs-built_in"},"this"),",[obj[propname]||{}].concat(sources));",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"return")," obj;",n.a.createElement("br",null),"}",n.a.createElement("br",null))),n.a.createElement("p",null,"As the parent object is returned we can chain more operations on the target object."),n.a.createElement("h3",{id:"combinearrayarray"},n.a.createElement("code",null,"combine(array,array,...)")),n.a.createElement("p",null,"This method creates an array with all possible combinations from the given arrays, taking one element from each per combination. Here's an example:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},'_.combine([1,2,3],["a","b"],[\u201dfoo","bar","baz"]);',n.a.createElement("br",null),'// => [ [1,"a","foo"],[1,"a","bar"],[1,"a","baz"],[1,"b","foo"],[1,"b","bar"],[1,"b","baz"],[2,"a","foo"],[2,"a","bar"],[2,"a","baz"],[2,"b","foo"],[2,"b","bar"],[2,"b","baz"]]')),n.a.createElement("p",null,"The number of combinations will equal the product of the lengths of the given arrays, and each combination will contain as many elements as the number of arrays you fed into ",n.a.createElement("code",null,"combine"),"."),n.a.createElement("p",null,"This isn't something you'll need every day (which is why it was ",n.a.createElement("a",{href:"https://github.com/jashkenas/underscore/pull/1788"},"shot down from Underscore"),"), but when you do need it, doing it manually is very verbose so a helper really cleans up the code (which is why I ",n.a.createElement("a",{href:"https://github.com/documentcloud/underscore-contrib/pull/168"},"tried to sell it to Underscore-contrib")," instead)."),n.a.createElement("p",null,"Here's the source code:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs language-javascript"},n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"}),")"),"{",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-keyword"},"return")," _.reduce(",n.a.createElement("span",{className:"hljs-built_in"},"Array"),".prototype.slice.call(",n.a.createElement("span",{className:"hljs-built_in"},"arguments"),", ",n.a.createElement("span",{className:"hljs-number"},"1"),"),",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"ret,newarr"),")"),"{",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"return")," _.reduce(ret,",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"memo,oldi"),")"),"{",n.a.createElement("br",null),"            ",n.a.createElement("span",{className:"hljs-keyword"},"return")," memo.concat(_.map(newarr,",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"newi"),")"),"{",n.a.createElement("br",null),"                ",n.a.createElement("span",{className:"hljs-keyword"},"return")," oldi.concat(newi);",n.a.createElement("br",null),"            }));",n.a.createElement("br",null),"        },[]);",n.a.createElement("br",null),"    },_.map(",n.a.createElement("span",{className:"hljs-built_in"},"arguments"),"[",n.a.createElement("span",{className:"hljs-number"},"0"),"],",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"i"),")"),"{",n.a.createElement("span",{className:"hljs-keyword"},"return")," [i];}));",n.a.createElement("br",null),"}")),n.a.createElement("h3",{id:"mixing-it-in"},"Mixing it in"),n.a.createElement("p",null,"The methods are added to underscore through the ",n.a.createElement("code",null,"mixin")," method:"),n.a.createElement("pre",null,n.a.createElement("code",{className:"hljs"},"_.mixin({",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-attr"},"ensureArray"),": ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"o,e"),")"),"{ ",n.a.createElement("span",{className:"hljs-keyword"},"return")," o ? [].concat(o) : e ? [e] : [];},",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-attr"},"mapObj"),": ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"obj,iterator,context"),")"),"{",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"var")," keys = _.keys(obj);",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"return")," _.reduce(_.map(obj,iterator,context),",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"memo,val,i"),")"),"{",n.a.createElement("br",null),"            ",n.a.createElement("span",{className:"hljs-keyword"},"return")," _.extend(_.object([keys[i]],[val]),memo);",n.a.createElement("br",null),"        },{});",n.a.createElement("br",null),"    },",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-attr"},"extendProp"),": ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"}),")"),"{",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"var")," obj = ",n.a.createElement("span",{className:"hljs-built_in"},"arguments"),"[",n.a.createElement("span",{className:"hljs-number"},"0"),"], propname = ",n.a.createElement("span",{className:"hljs-built_in"},"arguments"),"[",n.a.createElement("span",{className:"hljs-number"},"1"),"], sources = ",n.a.createElement("span",{className:"hljs-built_in"},"Array"),".prototype.slice.call(",n.a.createElement("span",{className:"hljs-built_in"},"arguments"),", ",n.a.createElement("span",{className:"hljs-number"},"2"),");",n.a.createElement("br",null),"        obj[propname] = _.extend.apply(",n.a.createElement("span",{className:"hljs-built_in"},"this"),",[obj[propname]||{}].concat(sources));",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"return")," obj;",n.a.createElement("br",null),"    },",n.a.createElement("br",null),"    ",n.a.createElement("span",{className:"hljs-attr"},"combine"),": ",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"}),")"),"{",n.a.createElement("br",null),"        ",n.a.createElement("span",{className:"hljs-keyword"},"return")," _.reduce(",n.a.createElement("span",{className:"hljs-built_in"},"Array"),".prototype.slice.call(",n.a.createElement("span",{className:"hljs-built_in"},"arguments"),", ",n.a.createElement("span",{className:"hljs-number"},"1"),"),",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"ret,newarr"),")"),"{",n.a.createElement("br",null),"            ",n.a.createElement("span",{className:"hljs-keyword"},"return")," _.reduce(ret,",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"memo,oldi"),")"),"{",n.a.createElement("br",null),"                ",n.a.createElement("span",{className:"hljs-keyword"},"return")," memo.concat(_.map(newarr,",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"newi"),")"),"{",n.a.createElement("br",null),"                    ",n.a.createElement("span",{className:"hljs-keyword"},"return")," oldi.concat(newi);",n.a.createElement("br",null),"                }));",n.a.createElement("br",null),"            },[]);",n.a.createElement("br",null),"        },_.map(",n.a.createElement("span",{className:"hljs-built_in"},"arguments"),"[",n.a.createElement("span",{className:"hljs-number"},"0"),"],",n.a.createElement("span",{className:"hljs-function"},n.a.createElement("span",{className:"hljs-keyword"},"function"),"(",n.a.createElement("span",{className:"hljs-params"},"i"),")"),"{",n.a.createElement("span",{className:"hljs-keyword"},"return")," [i];}));",n.a.createElement("br",null),"    }",n.a.createElement("br",null),"});"))),n.a.createElement("hr",null))}}},[["eM6I",1,0]]]);