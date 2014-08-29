---
title: Titanium application structure - Learning from Tweetanium
author: David
tags: [titanium]
date: 2011-02-16
excerpt: Dissecting the Titanium application structure demonstrated in Tweetanium 
type: post
---

###Structure woes

Up until recently, like so many other lost souls, we&#8217;ve followed the same Titanium application structure as Appcelerator&#8217;s KitchenSink application. In this paradigm, when you want to open a new window, you&#8217;d typically do something like this:

```
myButton.addEventListener("click",function(){
    Ti.UI.currentTab.open(Ti.UI.createWindow({
        url:'somefile.js',
        importantdata: mydata
    }));
});
```

Inside somefile.js the window would be populated with controls, using the Ti.UI.currentWindow reference. We can access the data from the previous window through win.importantdata.

This approach, even when improved upon, has several disadvantages:

*    If you have a file with application helper functions, you need to import that in every other file that needs the functionality. In my Tristania app for example, pretty much every file starts with Ti.include(&ldquo;../assets/utils.js&rdquo;).
*    Every time a window is meant to be created, the relevant file must be read and code parsed.
*    The structure of the app becomes rather opaque.
*    It is very difficult to unit test this approach.

It all works, sure, but I&#8217;ve never been comfortable with my application structures, feeling there must be a better way. Even though there are (many) ways to improve on the above example, I wanted a different structure paradigm alltogether. Alas, I was too lazy to get around to experiment with it, so &ldquo;it remained but a beautiful thought&rdquo;, as we say in Sweden.

###Tweetanium and Struct

Fortunately, [Kevin Whinnery](http://twitter.com/kevinwhinnery), [Chad Auld](http://twitter.com/chadauld) and the rest of the Appcelerator team have no such character flaws! Recently they [opensourced Tweetanium](http://developer.appcelerator.com/blog/2011/01/tweetanium-source-code-release.html), a fully functioning Twitter client coded with best practices regarding both JavaScript in general and Titanium in particular.

Which was like christmas to me! The only non-Krawaller Titanium source code I&#8217;ve gleaned (with a few none-noteworthy exceptions) is the aforementioned KitchenSink, which &ndash; let&#8217;s be honest &ndash; is not a great piece of work at all. It demonstrates the API very well (which is great since the docs are crap), but as an application example, it leaves me wanting.

So, enter Tweetanium. As soon as you open up the source code, it is evident that they&#8217;re doing things very differently! I have created a stripped-down, barebones version of it called Struct, aiming to expose the new structure paradigm. You&#8217;ll find the git repo [here](https://github.com/krawaller/struct). This is what the app looks like &ndash; isn&#8217;t knowledge beautiful? :)

<img src="../../img/struct1.png" style="width:175px;" />
<img src="../../img/struct2.png" style="width:175px;" />
<img src="../../img/struct3.png" style="width:175px;" />

The main point in the Tweetanium approach is that my various files (like somefile.js in the above example) are not messing with Ti.UI.currentWindow &ndash; instead, it augments a global namespace with a constructor variable. In Struct, I end up with the following global object:

```
var S = {
	os: function(arg){
		// utility function for branching logic depending on os
	},
	app: { // application state variables
		mood: "radiant"
	},
	ui: {
		styles: {
			// various app-wide theme definitions 
		},
		createApplicationWindow: function(){
			// creates the main app window. Called from app.js, will in turn call the
			// other view constructors and populate the window. Defined in
			// applicationwindow.js
		},
		createFooView: function(){
			// creates the red empty Foo view. Defined in fooview.js, used in 
			// createApplicationWindow.
		},
		createBarView: function(){
			// creates the green Bar view containing mood info. Defined in 
			// barview.js, used in createApplicationWindow.
		},
		createBazView: function(){
			// creates the blue Baz view where you can set mood. Defined
			// in bazview.js, used in createApplicationWindow.
		}
	}
};
```

The program flow is that the otherwise pretty empty app.js imports struct.js, which can be considered your main app definition file. This file creates the global namespace and maybe some utility functions, and then includes the other files to populate the rest of the namespace.

This means that as soon as the struct.js file is included, the entire app structure is created in memory. No more parsing of files will be done during the session.

App.js will then call the createApplicationWindow function, call the open method on the returned window, and maybe do some other app initialization stuff. Now the app is up and running! In Struct, app.js looks like this:

```
Ti.include("/struct/struct.js");
 
S.app.mainWindow = S.ui.createApplicationWindow();
S.app.mainWindow.open();
 
S.app.mood = "RADIANT!";
Ti.App.fireEvent("app:mood.update");
setTimeout(function(){
    Ti.App.fireEvent("app:msg",{msg:"Welcome!"});
},1000);
```

So what are the great advantages to this approach? I&#8217;ve already found quite a few, but it boils down to a single keyword: closure. Every single function is executed in the same closure (ok, maybe subclosures, but you get the gist). Read that sentence again until the implications set in.

This is good news from a performance perspective (and most likely stability) &ndash; no more importing the same file a gazillion times! But from an infrastructure point of view its even yummier:

*    As we always have access to the same scope, we can keep app-wide data in a single object, instead of JSON:ing back and forth with Ti.App.Properties.
*    All kinds of other convenience structures are suddenly very easy to build. In Struct there is a global messaging system, using one single view, instantiated only once. Tweetanium does a similar thing with a loader view, and has a 	very neat Model baseclass thing going.
*    You can instantiate all app windows and views immediately, as they all live in the same closure. Windows opened at a later point will also live in the same closure, since that&#8217;s where the constructor function is defined.
*    Creating your own navigation system (&#8220;immersive UI&#8221;, to use Apple&#8217;s lingo) is a breeze. In Struct I&#8217;ve stolen the home-brewed tabs from Tweetanium.

Now, having autopsied Tweetanium, created Struct and looking at the layout before me, it seems very obvious and self-evident. Perhaps it already was to the rest of you, but for me it was a new-found revelation, and I can&#8217;t wait to test it out in our next project! So, for those of you who like me hadn&#8217;t caught on to this train before, check out [Struct](https://github.com/krawaller/struct) &amp; [Tweetanium](http://developer.appcelerator.com/blog/2011/01/tweetanium-mobile.html) and try it out!