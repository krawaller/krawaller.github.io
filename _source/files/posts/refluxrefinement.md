---
title: Reflux refinement
author: David
tags: [react,reflux]
date: 2014-10-31
excerpt: "Looking at some improvements in newer Reflux versions"
type: post
---

###Flux &gt; Reflux?

In a [somewhat recent post](../react-js-architecture-flux-vs-reflux) I walked through how much simpler the codebase of a small React app became when I switched out [Flux](http://facebook.github.io/react/docs/flux-overview.html) for [Reflux](https://github.com/spoike/refluxjs).

However, I kind of glossed over that in one of the comparisons Flux actually "won" by a single LOC! It was the one comparing components listening to store changes:

```
// Flux version
var Cart = React.createClass({
  componentDidMount:function(){
    appStore.addChangeListener(this._onStuffChange)
  },
  // rest redacted
});

// Reflux version
var Cart = React.createClass({
  mixins: [Reflux.ListenerMixin],
  componentDidMount: function() {
    this.listenTo(appStore, this._onStuffChange);
  },
  // rest redacted
});
```

In the Reflux we need the additional `mixins` row, which makes it even more boilerplaty than the Flux version!

###Throwing Mixin into the mixer

Let's take a peek at the internals of `ListenerMixin` to see what's going on there. Here's the full object:

```javascript
ListenerMixin = {
    componentWillMount: function() {
        this.subscriptions = [];
    },
    listenTo: function(listenable, callback, defaultCallback) {
        var unsubscribe = listenable.listen(callback, this);
        this.subscriptions.push(unsubscribe);
        _.handleDefaultCallback(this, listenable, defaultCallback);
    },
    componentWillUnmount: function() {
        this.subscriptions.forEach(function(unsubscribe) {
            unsubscribe();
        });
        this.subscriptions = [];
    }
};
```

As you can see it supplies the `listenTo` method we used, as well as two life cycle methods, `componentWillMount` and `componentWillUnmount`, dealing with setup and teardown of the listener.

Note the cleverness of the Reflux listenables - a call to their `listen` method returns an `unsubscribe` function, which takes care of all the cleanup for you when called.

###Using a factory call as a mixin

Looking at the source code got me thinking - why couldn't the mixin provide the `componentDidMount` call too? Well, that's where the call to `listenTo` happens, which needs a reference to the listenable and some callbacks.

So how about we give those to a factory instead, which then bakes out a mixin for us? After several iterations and thoughtful input from Reflux creator Mikael, we now have a mixin factory which imports the listening functionality and sets up the listener to the given listenable. 

This means that this verbose Reflux version that lost to Flux...

```
var Cart = React.createClass({
  mixins: [Reflux.ListenerMixin],
  componentDidMount: function() {
    this.listenTo(appStore, this._onStuffChange);
  },
  // rest redacted
});
```

...can now be reduced to this:

```javascript
var Cart = React.createClass({
  mixins: [Reflux.listenTo(appStore,'_onStuffChange')],
  // rest redacted
});
```

Three lines shorter than the Flux version! Mission accomplished! 

Note how we can't use `this._onStuffChange` as an argument to the factory call, as `this` doesn't point to the instance at this point in time.

The idea of using mixin factories have also been used in other places in the new Reflux version.

###Connecting state

Consider what might be going on in `_onStuffChange` in the above example. A very common scenario when a React component listens to a Reflux Store is that we want to update the state of the component with the data sent from the store.

Since this is such a prevalent use case, Reflux now has a convenience method for this. Instead of the listenTo factory we can use the connect factory:

```
var Cart = React.createClass({
  mixins: [Reflux.connect(appStore)],
  // rest redacted (and doesn't need to contain a callback at all)
});
```

This will set the state of the component to whatever is transmitted from the store. If you want the store data as a property of your state, you can instead do `connect(publisher,propname)`.

###Much wants more

The [previous post](../react-js-architecture-flux-vs-reflux) also contained a Store comparison, which Reflux won by a wide margin. However, the winning code was still rather verbose:

```javascript
Reflux.createStore({
  init: function() {
    this.listenTo(actions.addItem,_addItem);
    this.listenTo(actions.removeItem,_removeItem);
    this.listenTo(actions.increaseItem,_increaseItem);
    this.listenTo(actions.decreaseItem,_decreaseItem);
  },
  // rest redacted
});
```

The new version introduces a `listenToMany` function which can be given an object where the values are publishers and the keys are assumed to correspond to methods on the listening object. If `_addItem`, `_removeItem` etc were local methods, that means the above code could be reduced to this:

```javascript
Reflux.createStore({
  init: function() {
    this.listenToMany({
        _addItem:actions.addItem,
        _removeItem:actions.removeItem,
        _increaseItem:actions.increaseItem,
        _decreaseItem:actions.decreaseItem
    );
  },
  // rest redacted
});
```
Somewhat elegant, but still very noisy. However, if we change the callback names to correspond to the action names, we could simply do this:

```javascript
Reflux.createStore({
  init: function() {
    this.listenToMany(actions);
  },
  // rest redacted
});
```

Now things are really beginning to shine! As an added bonus you can call your method `onActionname`, and Reflux will realise it is a callback for `actionname`.

But we're not done yet! We can make it leaner still through the new `listenables` property:

```javascript
Reflux.createStore({
  listenables: actions,
  // rest redacted
});
```

###Wrapping up

What I'm really trying to say is this; Reflux has grown by leaps and bounds, meaning your code will shrink proportionally! Old API:s have gotten more powerful, and new functionality has been added.

I'm still amazed at the power of Mikael's simpler Flux model, and if you haven't tried Reflux out yet I strongly encourage you to do so!