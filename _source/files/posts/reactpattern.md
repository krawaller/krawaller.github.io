---
title: A React encapsulation pattern
author: David
tags: [react,underscore]
date: 2014-12-10
excerpt: Exploring how we can encapsulate concerns in React by using mixin factories
type: post
---

###Fruits!

As a first step towards a discussion on an encapsulation pattern using mixin factories, please consider this little object of intellectual fruit opinions:

```javascript
var fruits = {
  apples: "nice",
  oranges: "a hassle to peel",
  bananas: "funny"
};
```

I now want the user to be able to select one a time, something like this:

<iframe src='../../applets/select01.html' style="height:70px;width:100%"></iframe>

What parts are involved in the select bar? Well, we need to:

1.    have an initially selected option
2.    render the bar, highlighting the currently selected option
3.    update state whenever another option is selected

Here's a na&iuml;ve implementation of this component:

```
var Opinion = React.createClass({
  getInitialState: function(){
    return {fruit:"apples"};
  },
  chooseFruit: function(c){
    this.setState({fruit:c});
  },
  render: function(){
    var selector = (
      <div className="btn-group clearfix">
        {_.map(_.keys(fruits),function(c){
          return <button onClick={_.partial(this.chooseFruit,c)} className={'btn btn-default'+(c===this.state.fruit?' active':'')}>{c}</button>
        },this)}
      </div>
    );
    return (
      <div className="center-block" style={{maxWidth:"800px;",padding:"1em;"}}>
        I posit that {selector} are {fruits[this.state.fruit]}!
      </div>
    )
  }
});
```

We provide an initial value through the `getInitialState` method, and have a click handler that updates our state with the clicked option. 

###Vegetables!

Seems clean enough! So, what's wrong with this? Well, not much (and we'll get to that later). But when the vegetables arrive...

```
var vegetables = {
  carrots: "are for bunnies",
  peas: "are perfect for flicking at your mum",
  eggplants: "are just weird"
};
```

...and we now want this...

<iframe src='../../applets/select01v.html' style="height:140px;width:100%"></iframe>

...things get rather messy! Extending `Opinion` using the same approach as before we end up with something like this:

```javascript
var List = React.createClass({
  getInitialState: function(){
    return {fruit:"apples",vegetable:"carrots"};
  },
  chooseFruit: function(c){
    this.setState({fruit:c});
  },
  chooseVegetable: function(c){
    this.setState({vegetable:c});
  },
  render: function(){
    var fruitSelector = (
      <div className="btn-group clearfix">
        {_.map(_.keys(fruits),function(c){
          return <button onClick={_.partial(this.chooseFruit,c)} className={'btn btn-default'+(c===this.state.fruit?' active':'')}>{c}</button>
        },this)}
      </div>
    );
    var veggySelector = (
      <div className="btn-group clearfix">
        {_.map(_.keys(vegetables),function(c){
          return <button onClick={_.partial(this.chooseVegetable,c)} className={'btn btn-default'+(c===this.state.vegetable?' active':'')}>{c}</button>
        },this)}
      </div>
    );
    return (
      <div className="center-block" style={{maxWidth:"800px;",padding:"1em;"}}>
        <div>I posit that {fruitSelector} are {fruits[this.state.fruit]}!</div><br/>
        <div>Also {veggySelector} are {vegetables[this.state.vegetable]}.</div>
      </div>
    )
  }
});
```

This is starting to look decidedly non-dry.

###Componentifying

What springs immediately to mind is of course that we could encapsulate the rendering of the bar into a component! Let's call it `Select`:

```javascript
var Select = React.createClass({
  propTypes: {
    options: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    makeSelection: React.PropTypes.func.isRequired,
    current: React.PropTypes.string.isRequired
  },
  render: function(){
    return (
      <div className="btn-group clearfix">
        {_.map(this.props.options,function(c){
          var handler = _.partial(this.props.makeSelection,c);
          var active = c===this.props.current;
          return <button onClick={handler} className={'btn btn-default'+(active?' active':'')}>{c}</button>
        },this)}
      </div>
    );
  }
});
```

The component expects an **array of options**, a **clickhandler** and the **currenly selected value**. Note how we're using the `_.partial` currying function to call the click handler with the clicked value.

Using this component, `Opinion` can now be reduced to this:

```javascript
var Opinion = React.createClass({
  getInitialState: function(){
    return {fruit:"apples",vegetable:"carrots"};
  },
  chooseFruit: function(c){
    this.setState({fruit:c});
  },
  chooseVegetable: function(c){
    this.setState({vegetable:c});
  },
  render: function(){
    var s = this.state;
    var fruitSelector = <Select options={_.keys(fruits)} current={s.fruit} makeSelection={this.chooseFruit}/>;
    var veggySelector = <Select options={_.keys(vegetables)} current={s.vegetable} makeSelection={this.chooseVegetable}/>;
    return (
      <div className="center-block" style={{maxWidth:"800px;",padding:"1em;"}}>
        <div>I posit that {fruitSelector} are {fruits[s.fruit]}!</div><br/>
        <div>Also {veggySelector} are {vegetables[s.vegetable]}.</div>
      </div>
    )
  }
});
```

That is indeed much better! We still have lots of methods in our class, but the `render` method is far less messy than before.


###Underscore intermission

Before we move on with the React ponderings, let's take an Underscore detour. Since we're already using the `_.partial` curry function inside `Select`, we could do it in `Opinion` too to merge `chooseVegetable(opt)` and `chooseFruit(opt)` into a `choose(prop,opt)` method:

```javascript
var Opinion = React.createClass({
  getInitialState: function(){
    return {fruit:"apples",vegetable:"carrots"};
  },
  choose: function(prop,c){
    this.setState(_.object([prop],[c]));
  },
  render: function(){
    var cb = this.choose, s = this.state;
    var fruitSelector = <Select options={_.keys(fruits)} current={s.fruit} makeSelection={_.partial(cb,"fruit")}/>;
    var veggySelector = <Select options={_.keys(vegetables)} current={s.vegetable} makeSelection={_.partial(cb,"vegetable")}/>;
    return (
      <div className="center-block" style={{maxWidth:"800px;",padding:"1em;"}}>
        <div>I posit that {fruitSelector} are {fruits[s.fruit]}!</div><br/>
        <div>Also {veggySelector} are {vegetables[s.vegetable]}.</div>
      </div>
    )
  }
});
```

Note the calls to `partial` towards the end of the `fruitSelector` and `veggySelector` definitions.

Inside `choose` we use the `_.object` method to create the argument to `setState`. It takes two arrays, one of keys and one of values, and bakes these into an object. Thus calling it with `choose("fruit","apples")` would cause `setState({fruit:"apples"})`. This way we can create objects with a single line of code even when the key is dynamic.

###The actual problem

Now back to React. What was my problem with the code for `Opinion`? Especially the last version looks pretty sleek!

Here's my problem; The seeding of inital values (`getInitialState`) and the click handler (`choose`) are intimately connected to `Select`. None is usable without the other two. This makes me want to package them all together! And since `Select` is a component, it seems logical to somehow shove `choose` and `getInitialState` inside that component definition!

Why is that not easy? Well, because we need to deal with the state of the outer component. Then I remembered - I've been there before! As told in the [Reflux refinement](../reflux-refinement) post, I made a syntax that reduced this:

```
var Cart = React.createClass({
  mixins: [Reflux.ListenerMixin],
  componentDidMount: function() {
    this.listenTo(appStore, this._onStuffChange);
  },
  // rest redacted
});
```

...to this:

```javascript
var Cart = React.createClass({
  mixins: [Reflux.listenTo(appStore,'_onStuffChange')],
  // rest redacted
});
```

Instead of a mixin I made a mixin factory. We pass the factory the data it needs to generate the `componentDidMount` call for you, making the code far less boilerplaty. 


###Tried and trusted

Perchance we could use that same teqnique here? If we try to turn the `Select` component into a mixin factory - what would the resulting mixin need to contain?

*    We need to set the initial value (as currently done in `getInitialState`)
*    We need a clickHandler that updates state (as currently done in `choose`)
*    We need a way to render the select bar (as currently done in the `Select` component)

To provide this, what does the mixin factory need to know?

*    The name of the state property to use
*    The available options
*    What option is initially selected - unless we always start with the first, which I opted for here

Ok, so we'll have a signature like this: `Select(propname,options)`

And the provided mixin object will look like this:

```javascript
{
  getInitialState: function(){
    return {propname:options[0]}
  },
  choose: function(opt){
    this.setState({propname:opt})
  },
  renderbar: function(){
    return (
      <div className="btn-group clearfix">
        // maploop blah blah
      </div>
    );
  }
}
```

###The solution

Here's my Underscore-heavy solution for the factory mixin:

```javascript
var Select = function(name,opts){
  return _.object(["getInitialState","Select"+name.charAt(0).toUpperCase() + name.slice(1)],[
    function(){ return _.object([name],[opts[0]]); },
    function(){
      var me=this;
      return (
        <div style={{display:"inline-block"}} className="btn-group clearfix">
          {_.map(opts,function(g){
            return <button onClick={function(){
              me.setState(_.object([name],[g]));
            }} className={'btn btn-default'+(g===me.state[name]?' active':'')}>{g}</button>
          })}
        </div>
      );
    }
  ]);
};
```

The string dancing up top is to make a better name than `renderbar` - if the propname is `flower`, the bar renderer will be `SelectFlower`.

Here's what `Opinion` looks like when using this mixin factory:

```javascript
var Opinion = React.createClass({
  mixins: [Select("fruit",_.keys(fruits)),Select("vegetable",_.keys(vegetables))],
  render: function(){
    return (
      <div className="center-block" style={{maxWidth:"800px;",padding:"1em;"}}>
        <div>I posit that {this.SelectFruit()} are {fruits[this.state.fruit]}!</div><br/>
        <div>Also {this.SelectVegetable()} are {vegetables[this.state.vegetable]}.</div>
      </div>
    )
  }
});
```

And voil&agrave; - nothing is hanging out of the pants anymore, everything is isolated inside `Select`. Our goal is achieved! 

###Final scare

But as is always the case, the bad guy suddenly rises again! Happily cleaning up my code with the new mixin factory, my crusade suddenly ground to a halt when I arrived at a case where the options depended on the component properties. Translated to our example it would mean that `Opinion` was rendered like this:

```javascript
<Opinion vegetables={vegetables} fruits={fruits}/>
```

The `vegetables` and `fruits` objects are passed as props to `Opinion` by its parent. Thus inside the `Opinion` definition we have no idea what the options are, and we can't make the call to the mixin factory! 

###Passing the instance

Since we depend on the properties, we can't make any call until we have access to them. That smells like we should be doing our thing inside the `componentWillMount` method - at that point we can access `this.props`, and the component isn't yet rendered. So we should be able to do something like this:

```javascript
var Opinion = React.createClass({
  componentWillMount: function(){
    SelectSyntax2("fruit",_.keys(this.props.fruits));
    SelectSyntax2("vegetables",_.keys(this.props.vegetables));
  },
  // rest redacted
});
```

Inside `SelectSyntax2` we must update state to the initial value, and give access to the bar renderer. But hang on, to do that we must access the component instance! Previously we did that through using `this` inside the various methods, since they became methods on the instance. But that's not the case now, and `this` inside `SelectSyntax2` points to god knows what!

Clearly we need to pass the instance into `SelectSyntax2`, giving us the signature `SelectSyntax2(propname,opts,instance)`. That would let us do what we need:

```javascript
function SelectSyntax2(propname,opts,instance){
  instance.setState(_.object([propname],[opts[0]]));
  instance.renderbar = function(){
    return (
      <div style={{display:"inline-block"}} className="btn-group clearfix">
        {_.map(opts,function(g){
          var handler = function(){instance.setState(_.object([name],[g]));};
          var active = g===instance.state[name];
          return <button onClick={handler} className={'btn btn-default'+(active?' active':'')}>{g}</button>
        })}
      </div>
    );
  }
}
```

###2 in 1

Since the two use cases have different signatures, I opted to only have the one method and make it behave differently depending on whether or not the third argument (the instance) was provided. Here's my code:

```javascript
function(name,opts,instance){
  // allow passing opts as an object, if so make the _.keys call here
  var opts = _.isObject(opts) ? _.keys(opts) : opts;
  // build good renderer name
  var rendername = "Select"+name.charAt(0).toUpperCase() + name.slice(1)
  // create the renderer function
  var renderer = function(){
    var me=this;
    return (
      <div style={{display:"inline-block"}} className="btn-group clearfix">
          {_.map(opts,function(g){
            return <button onClick={function(){
              me.setState(_.object([name],[g]));
            }} className={'btn btn-default'+(g===me.state[name]?' active':'')}>{g}</button>
          })}
      </div>
    );
  };
  // second style syntax, attach renderer and set initial value
  if (instance){
    instance[rendername] = renderer;
    instance.setState(_.object([name],[opts[0]]));
  // mixin syntax, return object with getInitialState and renderer
  } else {
    return _.object(
      ["getInitialState", rendername],
      [function(){return _.object([name],[opts[0]])}, renderer]
    );
  }
};
```

It is actually safe to use `this` to access the component even in the second syntax, since the renderer will be called as a method on the instance.

Here's the full code for `Opinion` using the second syntax:

```javascript
var List = React.createClass({
  componentWillMount: function(){
    Select("fruit",this.props.fruits,this);
    Select("vegetable",this.props.vegetables,this);
  },
  render: function(){
    return (
      <div className="center-block" style={{maxWidth:"800px;",padding:"1em;"}}>
        <div>I posit that {this.SelectFruit()} are {fruits[this.state.fruit]}!</div><br/>
        <div>Also {this.SelectVegetable()} are {vegetables[this.state.vegetable]}.</div>
      </div>
    )
  }
});
```

###Wrapping up

As is my habit I took so long detailing the journey that the point risk being lost. The point is this: **Using mixin factories can often be a very powerful way to package concerns together**, especially when you find that using a component forces you to implement cruft methods in the parent.

Since discovering the pattern I've used it in many different places, and it's a tool I'm particularly happy to have in my belt. I hope you find use for it too!
