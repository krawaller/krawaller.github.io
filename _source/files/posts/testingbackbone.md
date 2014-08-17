---
type: post
title: "Testing Backbone Objects"
date: 2013-02-23
tags: [Backbone,Jasmine,Testing,Sinon]
author: David
excerpt: My thoughts on how to test Backbone objects without instantiating them. We also discuss testing methods involving chaining syntax and DOM manipulation
---


### Troll bait (or "How not to do it")

Here's a blanket statement to flame against:

> _Instantiating Backbone views/models/collections in order to test them is an **antipattern**!_

Why? When we try to test an instance, we're faced with two main problems:

*    It will likely **require lots of setup**, as we have to call the constructor with some reasonable data.
*    When testing some aspect of the instance, it is **hard to make the test independent** of other functionality aspects.

### How to do it

So, then, how should it be done? Here's the approach I use when testing a method on a Backbone object:

1.    First we must of course **analyse what the method actually does** (or is supposed to do, if we're doing true BDD and writing the tests first).
2.    Start the test by **storing the method** to test by stealing it from the constructor prototype.
3.    If the method touches `this` (which is almost always the case in a Backbone object) I **create a custom context** object containing stubs, spies and dummy data as needed.
4.    I create eventual **parameter** data.
5.    I'll then **call the method on the custom context**.
6.    Following that I can **test the result**...
7.    ...check that the **context was manipulated** in the expected way...
8.    ...and also if my **spies where called in the correct way**.

### A small case study

As an example, consider the (adapted) following view that a student of mine had in a recent project:

```
var AddRecipeView = Backbone.View.extend({

  initialize: function(opts) {
    this.model = new DishModel();
    this.render()
      // Listen to model validation errors
      .listenTo(this.model, 'invalid', this.renderErrors)
      .listenTo(this.model, 'change', this.checkErrorField)
  },

  // ...rest of functionality edited out...
});
```

Using the test philosophy outlined above, how would we test the `initialize` function? Here's one suggestion, using [Jasmine][1], [Sinon][2] and [Jasmine-sinon][3] custom matchers.


####1: Analysis

First we analyse what the method is supposed to do:

*    It adds a Dishmodel instance to the context
*    It calls the render function
*    It sets two event listeners

These three things, and _only_ these, are what we should aim to test!

####2: Access the method

We start the testcode by capturing the method to test from the constructor prototype:

```
var initialize = AddRecipeView.prototype.initialize;
```

####3: Context

We need to create a context with stubs for `listenTo` and `render`. As the method uses a chaining syntax, we must also have these stubs return our custom context. Finally we need to have some dummy data in `.renderErrors` and `.checkErrorField`, in order to be able to test if those properties were passed to `listenTo`. Here's the full fake context:

```
var context = {
    listenTo: sinon.stub().returns(context),
    render: sinon.stub().returns(context),
    renderErrors: "RENDERFUNC",
    checkErrorField: "CHECKSTUFF"
};
```

####4: Parameter data

The initialize method doesn't take any arguments, so we don't need to decide on any data for that.

####5: Execute the method

Now we execute the method on our fake context:

```
var result = initialize.call(context);
```

####6: Test the result

As the initialize method isn't supposed to return anything, we don't need to test the result.

####7: Check context manipulation

The method was supposed to add a dishmodel instance to the `.model` property, so let's make sure that happened:

```
it("should set a Dishmodel instance on .model",function(){
    expect(context.model instanceof Dishmodel).toBe(true);
});
```

####8: Check method calls

Finally we need to make sure that other functions were called as expected. First we check for the expected call to `render`:

```
it("should call render",function(){
    expect(context.render).toHaveBeenCalledOnce();
});
```

And finally we test if the two event listeners were set:

```
it("added the event listeners",function(){
    expect(context.listenTo).toHaveBeenCalledTwice();
    expect(context.listenTo.firstCall.args).toEqual([
    	context.model,"invalid",context.renderErrors
    ]);
    expect(context.listenTo.secondCall.args).toEqual([
    	context.model,"change",context.checkErrorField
    ]);
});
```

####End result

To save you scrolling back and forth, here's the `initialize` source again:

```
var AddRecipeView = Backbone.View.extend({

  initialize: function(opts) {
    this.model = new DishModel();
    this.render()
      // Listen to model validation errors
      .listenTo(this.model, 'invalid', this.renderErrors)
      .listenTo(this.model, 'change', this.checkErrorField)
  },

  // ...rest of functionality edited out...
});
```

...and here's the test code in full:

```
describe("the initialize function",function(){
    var initialize = AddRecipeView.prototype.initialize,
        context = {
            listenTo: sinon.stub().returns(context),
            render: sinon.stub().returns(context),
            renderErrors: "RENDERFUNC",
            checkErrorField: "CHECKSTUFF"
        };
    initialize.call(context);
    it("should set a Dishmodel instance on .model",function(){
        expect(context.model instanceof Dishmodel).toBe(true);
    });
    it("should call render",function(){
        expect(context.render).toHaveBeenCalledOnce();
    });
    it("called listenTo correctly",function(){
        expect(context.listenTo).toHaveBeenCalledTwice();
        expect(context.listenTo.firstCall.args).toEqual([
        	context.model,"invalid",context.renderErrors
        ]);
        expect(context.listenTo.secondCall.args).toEqual([
        	context.model,"change",context.checkErrorField
        ]);
    });
});
```

All tests control one specific expected behaviour of the method, and nothing else. We're not even depending on any Backbone functionality, which is one of the badges to strive for when unit testing your Backbone apps! Achieving that will make the test simpler, smaller and less fragile.

### Case study #2 - Testing DOM methods

The same approach can be adopted even when DOM manipulation is involved. Here is the `renderErrors` method of the same view:


```
var AddRecipeView = Backbone.View.extend({

	// ...other functionality edited out...

	renderErrors: function(model) {
		this.$('.errors').html('');
		_.each(model.validationError, function(error) {
			this.$('.errors').append(error.message + '<br>');
		});
	},

	// ...other functionality edited out...

});
```

How to test that? There's even quirkier chaining going on, and we're manipulating the DOM. Is testing this really feasible without instantiating the view?

Here's what I did, using the same approach as before:

```
describe("the renderError function",function(){
    var renderErr = AddRecipeView.prototype.renderErrors,
        model = {validationError:[
        	{message:"err1"},{message:"err2"},{message:"err3"}
        ]},
        $el = {
            html: sinon.spy(),
            append: sinon.spy()
        },
        context = {
            $: sinon.stub().returns($el);
        };
    renderErr.call(context,model);
    it("should use the correct selector",function(){
        expect(context.$).toHaveBeenAlwaysCalledWith(".errors");
    });
    it("should have cleared the previous html",function(){
        expect($el.html).toHaveBeenCalledWith("");
    });
    it("appends each errormsg",function(){
        expect($el.append).toHaveBeenCalledThrice();
        expect($el.append.firstCall.args).toEqual([
        	model.validationError[0].message+"<br>"
        ]);
        expect($el.append.secondCall.args).toEqual([
        	model.validationError[1].message+"<br>"
        ]);
        expect($el.append.thirdCall.args).toEqual([
        	model.validationError[2].message+"<br>"
        ]);
    });
});
```

In order to deal with the chain, I made a dummy object for the element (`$el`), and then I made the spy for the scoped selector `$` return that dummy. This deals with the chaining problem, but is perhaps a bit too implementation specific - for example, the student might change from using `this.$(selector)` to `this.$el.find(selector)`, in which case my test would fail. It will however keep working even if he starts caching the result from `this.$(selector)`, which he should of course do.

Apart from the danger of becoming implementation specific, I find that this fake chain approach mostly works very well!

As for the DOM, the secret to testing it is NOT to test it. Here I stub out the relevant methods, and then simply check that they're called correctly. No special measure needs to be taken just because they're functions that are supposed to affect the DOM. I find this approach much easier than actually making sure that the correct html was set. In fact, I'll go as far as to end this post with another bit of troll bait:

> _Testing if `this.$el.html() === expectedHtml` is an **antipattern**!_


[1]:[http://pivotal.github.com/jasmine/]
[2]:[http://sinonjs.org/]
[3]:[https://github.com/froots/jasmine-sinon]
