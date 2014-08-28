---
title: A React.js case study
author: David
tags: [react]
date: 2014-08-28
excerpt: This post dissects a memory game built with React, focusing on structure and the React way of thinking
type: post
---

### The game

The last few days I've been toying with [React.js](http://facebook.github.io/react/), Facebook's excellent view abstraction library. In order to grokk it I built a simple memory game, which we'll dissect in this post.

First off, here's the game running in a iframe. The repo can be found [here](https://github.com/krawaller/reactexperiment/).

<iframe src='http://blog.krawaller.se/reactexperiment/' style="height:140px;width:100%"></iframe>

As you can see the game is rather simple, yet included enough state and compositions to force me to actually use React.

### The code

This is the full contents of the repo:

<img src='../../img/reactexperimentsource.png' style="margin-left:4em;" />

The `lib` folder contains the only 3 dependencies:

*    `react.js` is the react librabry itself
*    `JSXTransformer.js` translates the JSX syntax. In production this should of course be part of the build process.
*    `lodash.js` is used merely to make for some cleaner code in the game logic.

The `src` folder then contains files for all of our React components. The hierarchy looks like thus:

<img src='../../img/reactexperiment.png' style="height:200px;margin-left:4em" />

Finally `index.html` is a super simple bootstrap kicking it all off:

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="text/javascript" src="lib/lodash.js"></script>
    <script type="text/javascript" src="lib/react.js"></script>
    <script type="text/javascript" src="lib/JSXTransformer.js"></script>
    <script type="text/jsx" src="src/status.jsx"></script>
    <script type="text/jsx" src="src/board.jsx"></script>
    <script type="text/jsx" src="src/game.jsx"></script>
    <script type="text/jsx" src="src/wordform.jsx"></script>
    <script type="text/jsx" src="src/tile.jsx"></script>
    <link rel="stylesheet" href="styles.css" type="text/css"></link>
  </head>
  <body>
    <script type="text/jsx">
      /** @jsx React.DOM */

      React.renderComponent(
        <Game />,
        document.querySelector("body")
      );
    </script>
  </body>
</html>
```

We'll now walk through each of the five React components, and how they map to the fundamental React principle; initial data that won't change should be passed to a component as a property, while changing data should be handle in a component's `state`. If we need to communicate from a child to a parent, we do this by calling a callback that was passed to the child as a property.

### The Game component

First off is the Game component. It is responsible for switching between the form and the board, and passing data from the form to the board.

```javascript
/** @jsx React.DOM */

var Game = React.createClass({
  getInitialState: function(){
    return {playing: false,tiles:[]};
  },
  startGame: function(words){
    this.setState({
      tiles:_.shuffle(words.concat(words)),
      playing:true,
      seed:Math.random()
    });
  },
  endGame: function(){
    this.setState({playing:false});
  },
  render: function() {
    return (
      <div>
        <div className={this.state.playing ? "hidden" : "showing"}>
          <Wordform startGame={this.startGame} />
        </div>
        <div className={this.state.playing ? "showing" : "hidden"}>
          <Board endGame={this.endGame} tiles={this.state.tiles} max={this.state.tiles.length/2} key={this.state.seed}/>
        </div>
      </div>
    );
  }
});
```

<table>
  <thead><th>Props</th><th>State</th><th>Sub components</th><th>Instance variables</th></thead>
  <tbody>
    <tr><td></td><td>playing<br/>tiles</td><td>Wordform<br/>Board</td><td></td></tr>
  </tbody>
</table>

The `Game` component has two `state` variables:

*    `playing` which controls which sub component to show or hide.
*    `tiles` which contain the words passed to `startGame`, which will be triggered inside `Wordform`.

`Game` has two sub components:

*    `Wordform`, which it passes the `startGame` method.
*    `Board`, which is passed the `endGame` method and the `tiles`.

Note that `Game` always renders both the `Board` and the `Wordform`. This has to do with React component lifecycles. I first tried to do this:

```
return (
  <div>{this.state.playing ? <Board endGame={this.endGame} tiles={this.state.tiles}/> : <Wordform startGame={this.startGame} />}</div>
);
``` 

...which actually worked, but generated a React error message about an unmounted component. The official docs also state that instead of generating different components, we should generate them all and show/hide them as needed.

Also related to the life cycle of a component is the `key` property of the `Board`. Changing `key` ensures we have a new `Board` instance whenever we enter new words in the form, otherwise React will just repopulate the existing `Board` with new words. That means that previously flipped tiles will still be flipped, even though they now contain new words. Remove the `seed` property and try it!


###The Wordform component

This component displays a form for entering words to be used as tiles.

```javascript
/** @jsx React.DOM */

var Wordform = React.createClass({
  getInitialState: function(){
    return {error:""};
  },
  setError: function(msg){
    this.setState({error:msg});
    setTimeout((function(){
      this.setState({error:""});
    }).bind(this),2000);
  },
  submitWords: function(e){
    var node = this.refs["wordfield"].getDOMNode(),
        words = (node.value || "").trim().replace(/\W+/g," ").split(" ");
    if (words.length <= 2) {
      this.setError("Enter at least 3 words!");
    } else if (words.length !== _.unique(words).length) {
      this.setError("Words should be unique!");
    } else if (_.filter(words,function(w){return w.length > 8}).length) {
      this.setError("Words should not be longer than 8 characters!");
    } else {
      this.props.startGame(words);
      node.value = "";
    }
    return false;
  },
  render: function() {
    return (
      <form onSubmit={this.submitWords}>
        <p>Enter words separated by spaces!</p>
        <input type='text' ref='wordfield' />
        <button type='submit'>Start!</button>
        <p className='error' ref='errormsg'>{this.state.error}</p>
      </form>
    );
  }
});
```

<table>
  <thead><th>Props</th><th>State</th><th>Sub components</th><th>Instance variables</th></thead>
  <tbody>
    <tr><td>startGame()</td><td>error</td><td></td><td></td></tr>
  </tbody>
</table>

The `Wordform` component validates the input and passes it back up to `Game` by calling the `startGame` method which it received as a property.

In order to collect the contents of the input field we use the `refs` instance property, with the same key (`wordfield`) as given to the `ref` property of the corresponding node in the render output.

Note how showing and hiding error messages are done through changing the `error` state variable, which triggers the rerender. It feels almost like we have a two-way data binding!

### The Board component

Here's the code for the `Board` component, which displays the game board:

```javascript
/** @jsx React.DOM */

var Board = React.createClass({
  getInitialState: function() {
    return {found: 0, message: "choosetile"};
  },
  clickedTile: function(tile){
    if (!this.wait){
      // turn up lone tile 
      if (!this.flippedtile){
        this.flippedtile = tile;
        tile.reveal();
        this.setState({found:this.state.found,message:"findmate"});
      // clicked second
      } else {
        this.wait = true;
        if (this.flippedtile.props.word === tile.props.word){
          this.setState({found: this.state.found+1,message: "foundmate"});
          tile.succeed();
          this.flippedtile.succeed();
        } else {
          this.setState({found:this.state.found,message:"wrong"});
          tile.fail();
          this.flippedtile.fail();
        }
        setTimeout((function(){
          this.wait = false;
          this.setState({found:this.state.found,message:"choosetile"});
          delete this.flippedtile;
        }).bind(this),2000);
      }
    }
  },
  render: function() {
    var tiles = this.props.tiles.map(function(b,n){
      return <Tile word={b} key={n} clickedTile={this.clickedTile} />;
    },this);
    return (
      <div>
        <button onClick={this.props.endGame}>End game</button>
        <Status found={this.state.found} max={this.props.tiles.length/2} message={this.state.message} />
        {tiles}
      </div>
    );
  }
});
```

<table>
  <thead><th>Props</th><th>State</th><th>Sub components</th><th>Instance variables</th></thead>
  <tbody>
    <tr><td>tiles<br/>endGame()</td><td>found<br/>message</td><td>Status<br/>Tile</td><td>wait<br/>flippedtile</td></tr>
  </tbody>
</table>

The Board component was passed a `tiles` array and an `endGame` callback from its parent.

It has two state variables:

*    `found` which counts how many pairs the player has found
*    `message` which contains the id of the message to display to the player

When rendered it contains two different sub components:

*    `Status`, which is passed `found`, `max` and `message`. This component deals with the instruction to the player above the tiles.
*    `Tile`, which represents an individual tile. Each tile is passed a `word` and the `clickedTile` callback.

The `clickedTile` callback will be called from the individual tiles, with the tile instance as parameter. As you can see, this method contains the full logic for the actual game.

Note how this method uses the instance variables `this.wait` and `this.flippedtile`. These do NOT need to be `state` variables, as they don't affect the rendering! Only state which might affect what the component looks like need to be stored using `this.setState`.



###The Status component


```javascript
/** @jsx React.DOM */

This component renders the info row above the game board.

var Status = React.createClass({
  render: function() {
    var found = this.props.found,
        max = this.props.max,
        texts = {
          choosetile:"Choose a tile!",
          findmate:"Now try to find the matching tile!",
          wrong:"Sorry, those didn't match!",
          foundmate:"Yey, they matched!",
          foundall:"You've found all "+max+" pairs! Well done!"
        };
    return <p>({found}/{max})&nbsp;&nbsp;{texts[this.props.message === "choosetile" && found === max ? "foundall" : this.props.message]}</p>;
  }
});
```

<table>
  <thead><th>Props</th><th>State</th><th>Sub components</th><th>Instance variables</th></thead>
  <tbody>
    <tr><td>found<br/>max<br/>message</td><td></td><td></td><td></td></tr>
  </tbody>
</table>

The `Status` component was passed `found`, `max` and `message` from its parent. It then bakes this together into a UI info row.

Note how even though the status row is constantly changing while playing, this is a totally static component. It contains no state variables, and all updates are controlled in the parent!

###The Tile component

This component represents an individual tile.

```javascript
/** @jsx React.DOM */

var Tile = React.createClass({
  getInitialState: function() {
    return {flipped: false};
  },
  catchClick: function(){
    if (!this.state.flipped){
      this.props.clickedTile(this);
    }
  },
  reveal: function(){
    this.setState({flipped:true});
  },
  fail: function(){
    this.setState({flipped:true,wrong:true});
    setTimeout((function(){this.setState({flipped:false,wrong:false});}).bind(this),2000);
  },
  succeed: function(){
    this.setState({flipped:true,correct:true});
  },
  render: function() {
    var classes = _.reduce(["flipped","correct","wrong"],function(m,c){return m+(this.state[c]?c+" ":"");},"",this);
    return (
      <div className={'brick '+(classes || '')} onClick={this.catchClick}>
        <div className="front">?</div>
        <div className="back">{this.props.word}</div>
      </div>
    );
  }
});
```

<table>
  <thead><th>Props</th><th>State</th><th>Sub components</th><th>Instance variables</th></thead>
  <tbody>
    <tr><td>word<br/>clickedTile()</td><td>flipped</br>wrong<br/>correct</td><td></td><td></td></tr>
  </tbody>
</table>

It was passed two properties from the parent; a `word` variable and a `clickedTile` callback.

The component has three `state` variables:

*    `flipped` is a flag to show if the tile has been flipped up or not. While flipped it will not receive clicks.
*    `wrong` is true if the tile was part of a failed match attempt.
*    `correct` is true if the tile has been matched to a partner.

When clicked the component will call the `clickedTile` callback passing itself as a parameter. All game logic is in `Board`, as we saw previously.


###Wrapping up

I'm totally in love with React! It took a while to grasp the thinking, like for example the differentiation between `state` and `props`, and how `state` can belong in `props` when passed to a child. But when that mentality was in place, putting it all together was a breeze. I really appreciate not having to write any update or cleanup code (I'm looking at you, Backbone), delegating all that headache to React!

Passing callbacks to allow for upstream communication can feel a bit clunky, and I look forward to trying out the Flux approach instead. I also want to integrate a Router, and see how that plays along with it all.
