---
title: A React.js case study follow-up
author: David
tags: [react,underscore]
date: 2014-09-05
excerpt: This post details a refactoring of the previous React case study. We also touch on some Underscore usage.
type: post
---

###React Memory Game version 2

A week ago I wrote a [case study on a small React experiment](../a-react-js-case-study), a memory game I whipped up to learn the ins and outs of React. Here's the game in an iframe again (here's a [link](http://blog.krawaller.se/reactexperiment/) if you want it in a separate tab), to save you from hopping back to refresh your memory (...). The repo, as before, can be found [here](https://github.com/krawaller/reactexperiment/).

<iframe src='http://blog.krawaller.se/reactexperiment/' style="height:240px;width:100%"></iframe>

Since this was my first foray into React the code was, well, less than perfect. But I was fortunate to receive lots of excellent feedback in the comments and [on Hacker News](https://news.ycombinator.com/item?id=8247223), foremost of which was Facebook's [Ian Obermiller](http://ianobermiller.com/) who took the time to do a [fork of the repo](https://github.com/ianobermiller/reactexperiment/) with [in-depth comments to each commit](https://github.com/ianobermiller/reactexperiment/commits/).

After digesting all the feedback, and having spent more time with the React docs, I went over the Memory game code again. This post walks through those changes and the lessons learned. The text assumes you've already read the [previous post](../a-react-js-case-study), so please hop over there if you came straight here.


###ES6 Transformation

First off, Ian and others pointed out that the JSX Transformation also contains support for some ES6 features, so there's really no reason not to use them! Throughout the new code I've therefore made use of these, primarily the [Arrow Functions](http://tc39wiki.calculist.org/es6/arrow-functions/) and [Method Definition Shorthand](http://tc39wiki.calculist.org/es6/object-literal-enhancements/).

The Arrow Function syntax has many nuances, but primarily it is a way to define a function more succinctly. The created function is also bound to the current scope.

```javascript
// old way
var myFunc = (function(arg){
	// do stuff
}).bind(this);

// ES6 way
var myFunc = (arg)=>{
	// do stuff
}

```

And here's the method definition shorthand example:

```javascript
// old way
var o = {
  method: function() {
    return "Hello!";
  }
};

//ES6 way
var o = {
  method() {
    return "Hello!";
  }
};
```


###The new Game component code

Now to the React stuff! Starting again with the top-level `Game` component, here's the updated code:

```javascript
/** @jsx React.DOM */

var Game = React.createClass({
  getInitialState() {return {};},
  startGame(words){
    this.setState({
      words:_.shuffle(words.concat(words))
    });
  },
  endGame(){
    this.setState({words:undefined});
  },
  render(){
    return (
      this.state.words ? <Board onEndGame={this.endGame} words={this.state.words}/>
      : <Wordform onWordsEntered={this.startGame} />
    );
  }
});
```

<table>
  <thead><th>Props</th><th>State</th><th>Sub components</th><th>Instance variables</th></thead>
  <tbody>
    <tr><td></td><td><span style='color:red;text-decoration:line-through;'>playing</span><br/>tiles</td><td>Wordform<br/>Board</td><td></td></tr>
  </tbody>
</table>

For each component I'll also show the same table as before, highlighting any differences.

As you can see here, I removed the `playing` flag from `Game`, opting instead to set `words` to undefined on game end. Slightly less obvious code, but one less state variable. Which is preferrable is pure philosophy, and mine is to go for brevity.


###Show &amp; hide versus rendering only relevant components

in my first version I alternated between showing the `Board` and `Wordform` through always rendering both, but showing and hiding them as appropriate. This is the old render function containing this approach:

```javascript
return (
  <div>
    <div className={this.state.playing ? "showing" : "hidden"}>
      <Board endGame={this.endGame} tiles={this.state.tiles} max={this.state.tiles.length/2} key={this.state.seed}/>
    </div>
    <div className={this.state.playing ? "hidden" : "showing"}>
      <Wordform startGame={this.startGame} />
    </div>
  </div>
);
```

By misreading the docs and misunderstanding an error message, I was fooled into believing that this was the way to go, instead of choosing what component to render. As it turns out, there is no problem with the latter approach, which of course makes for much cleaner code:

```javascript
return (
  this.state.words ? <Board onEndGame={this.endGame} words={this.state.words}/>
  : <Wordform onWordsEntered={this.startGame} />
);
```

Note also how we no longer need to throw a random seed into the `key` property of `Board` to force it to rerender, as it will always be a new board since it previously didn't exist in the Shadow DOM.

###Decoupling through callback names

Sharp eyes will also note how the new version passes `this.startGame` to `Wordform` as a property called `onWordsEntered` instead of `startGame`. This was another [good point of feedback from Ian](https://github.com/ianobermiller/reactexperiment/commit/1d2335876ba85d17929212e538e5823db84eabe7); name your properties to make the child less coupled to the parent. `Wordform` doesn't care what happens when the words are submitted, it merely calls a callback when that happens. The name should reflect that.

Similar renamings have been done throughout the code base.


###The new Wordform component code

Here's what the new `Wordform` component code looks like:

```javascript
/** @jsx React.DOM */

var Wordform = React.createClass({
  propTypes: {
    onWordsEntered: React.PropTypes.func.isRequired
  },
  getInitialState(){
    return {error:''};
  },
  setError(msg){
    this.setState({error:msg});
    setTimeout(()=>{this.setState({error:''});},2000);
  },
  submitWords(e){
    var node = this.refs['wordfield'].getDOMNode(),
        words = (node.value || '').trim().replace(/\W+/g,' ').split(' ');
    if (words.length <= 2) {
      this.setError('Enter at least 3 words!');
    } else if (words.length !== _.unique(words).length) {
      this.setError('Don\'t enter duplicate words!');
    } else if (_.find(words,(w)=>w.length > 8)) {
      this.setError('Words should not be longer than 8 characters!');
    } else {
      this.props.onWordsEntered(words);
      node.value = '';
    }
    return false;
  },
  render() {
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
    <tr><td>*onWordsEntered()*</td><td>error</td><td></td><td></td></tr>
  </tbody>
</table>

The only change in the table is the already mentioned renaming, shown here through the italizicing of `onWordsEntered`.

###Defining expected properties through propTypes

The primary point of interest in `Wordform` is up top; Ian made me aware of the `propTypes` property which allows you to clearly communicate what properties your component expects (and also validate them while in development mode).

```javascript
propTypes: {
  onWordsEntered: React.PropTypes.func.isRequired
},
```

As we see here `Wordform` just expects the one, namely the previously mentioned callback which got a new name.

###Semi-defining the state variables

Note our call to `getInitialState`:

```javascript
getInitialState(){
  return {error:''};
}
```

Returning an empty object here would suffice, but explicitly setting the `error` property to an empty string communicates that the component will make use of this state variable.

This, along with the `propTypes` literal above, goes a long way to help the reader to gain immediate understanding of the component's functionality. Together they give you the same information as my data table!


###Underscore elitism

There is one other tiny change regarding `Wordform`; in the old code, I used the following expression to test if any word was too long;

```javascript
_.filter(words,function(w){return w.length > 8;}).length
```

...while in the new code, I'm doing this (shown here without ES6 stuff):

```javascript
_.find(words,function(w){ return w.length > 8;})
```

Functionally it makes absolutely no difference, but it touches on something I feel is important, albeight on a pedantic level - knowing your tools is important. Learning Underscore/Lodash (along with functional programming) levelled me up quite a bit as a programmer, and I took pride in being able to write shorter code. Making this &quot;mistake&quot; therefore itched quite a bit.

###The new Board component code

Now for the big one! `Board` was already the most complex component, so it is only natural that it contains the most changes. Here's the new code in full:

```javascript
/** @jsx React.DOM */

var Board = React.createClass({
  propTypes: {
    words: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onEndGame: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      found: 0,
      message: 'choosetile',
      tilestates: _.map(_.range(this.props.words.length),()=>'unturned')
    };
  },
  componentWillMount() {
    this.max = this.props.words.length/2;
  },
  clickedTile(index){
    if (this.state.tilestates[index]==='unturned'){
      // turn up lone tile
      if (this.flippedTileIndex === undefined) {
        this.flippedTileIndex = index;
        this.setState({
          message: 'findmate',
          tilestates: _.extend(this.state.tilestates,_.object([index],['revealed']))
        });
      // clicked second tile
      } else {
        var otherindex = this.flippedTileIndex,
            matched = this.props.words[index] === this.props.words[otherindex];
        delete this.flippedTileIndex;
        // found mathing pair
        if (matched) {
          this.setState({
            found: this.state.found+1,
            message: 'foundmate',
            tilestates: _.extend(this.state.tilestates,_.object([index,otherindex],['correct','correct']))
          });
        // pair didn't match
        } else {
          this.setState({
            message: 'wrong',
            tilestates: _.extend(this.state.tilestates,_.object([index,otherindex],['wrong','wrong']))
          });
        }
        // restore UI message after 1500, and flip back eventual failed attempt
        setTimeout(()=>{
          if (this.isMounted()) {
            this.setState({
              message: this.state.message === 'findmate' ? 'findmate' : this.max === this.state.found ? 'foundall' : 'choosetile',
              tilestates: matched ? this.state.tilestates : _.extend(this.state.tilestates,_.object([index,otherindex],['unturned','unturned']))
            });
          }
        },1500);
      }
    }
  },
  render() {
    return (
      <div>
        <button onClick={this.props.onEndGame}>End game</button>
        <Status found={this.state.found} max={this.max} message={this.state.message} />
        {this.props.words.map(
          (b,n) => <div onClick={_.partial(this.clickedTile,n)}><Tile word={b} status={this.state.tilestates[n]} /></div>
        )}
      </div>
    );
  }
});
```

<table>
  <thead><th>Props</th><th>State</th><th>Sub components</th><th>Instance variables</th></thead>
  <tbody>
    <tr><td>*words*<br/>*onEndGame()*</td><td>found<br/>message<br/><span style='color:green;'>**tilestates**</span></td><td>Status<br/>Tile</td><td><span style='color:red;text-decoration:line-through;'>wait</span><br/>*flippedTileIndex*<br/><span style='color:green;'>**max**</span></td></tr>
  </tbody>
</table>

As said, lots of changes, which we'll now walk through!

###Waiting is boring

First off, the old version contained a `wait` flag which made sure that after you turned up a pair, you couldn't click a new tile for 2 seconds while the succeed/fail animations took place. This &quot;feature&quot; was badly communicated and rather frustrating, and most people thought it was a bug.

Therefore I decided to simply remove it, hence the stricken out `wait` instance variable in the component data table.

###Property-generated constant

In the previous version `Board` didn't make use of `max`. It was just passed as a property to `Status`, calculated at that point:

```javascript
<Status found={this.state.found} max={this.props.tiles.length/2} message={this.state.message} />
```

Inside `Status` we used the `max` information to decide what to display when the message instruction from `Board` was `choosetile`:

```javascript
this.props.message === "choosetile" && found === max ? "foundall" : this.props.message
```

Going over the code it felt weird to have just that particular logic in `Status`. It seemed to belong in the parent, so I decided to move it there. But that means `Board` now needs to use the `max` value, which raised a seemingly innocent question - how to handle that?

The `max` value is calculated by doing `words.length/2`, but I don't want to calculate it on the fly every time I need it. An older version of the code passed `max` along with `words` from `Game` to `Board`, but that seems silly too. It should be calculated from `words` when the `Board` instance is initialized.

The premier place for turned out to be the `componentWillMount` hook. At this point in the component life cycle the properties are accessible, so `max` can be set as an instance variable like thus:

```javascript
componentWillMount() {
    this.max = this.props.words.length/2;
},
```

Throughout the rest of the code I could then replace `this.props.max` with `this.max`. A small gain, but the real win was cleaning up the logic in the child component, `Status`, without having to increase the complexity of `Board`'s signature by expecting `max` as a property.

Note how the `componentWillMount` call sits up top with `propTypes` and `getInitialState`, as it also is communicating contents from my component data table!

###State variable VS instance variable

I noticed Ian refactored the old `wait` instance variable to be a state variable, but I can't (yet?) see the advantage to that. Why put variables in this.state, with all the overhead that means, if they will never affect the output of the `render` method? That's why I didn't make `max` a state variable, which would of course also have worked:

```javascript
getInitialState() {
  return {
    max: this.props.words.length/2,
    // the other variables redacted
  };
},
```

It would even mean less code, as the one extra line in the `getInitialState` object literal replaced the call to `componentWillMount`. Still, in my head, using `this.state` solely for rendering-affecting state took precedence.

###The new Status component code

Here's the full code for the updated Status component.

```javascript
/** @jsx React.DOM */

var Status = React.createClass({
  propTypes: {
    found: React.PropTypes.number.isRequired,
    max: React.PropTypes.number.isRequired,
    message: React.PropTypes.oneOf(['choosetile','findmate','wrong','foundmate','foundall']).isRequired
  },
  render() {
    var found = this.props.found,
        max = this.props.max,
        texts = {
          choosetile:'Choose a tile!',
          findmate:'Now try to find the matching tile!',
          wrong:'Sorry, those didn\'t match!',
          foundmate:'Yey, they matched!',
          foundall:'You\'ve found all '+max+' pairs! Well done!'
        };
    return <p>({found}/{max})&nbsp;&nbsp;{texts[this.props.message]}</p>;
  }
});
```

<table>
  <thead><th>Props</th><th>State</th><th>Sub components</th><th>Instance variables</th></thead>
  <tbody>
    <tr><td>found<br/>max<br/>message</td><td></td><td></td><td></td></tr>
  </tbody>
</table>

The only change is the already discussed extraction of logic deciding whether to show `foundall` or `choosetile`.

Note also the neat syntax for defining an enum proptype, used here for the `message` property.

Performance-wise it would probably be beneficial to move the `texts` variable out of the `createClass` call, to prevent it having to be created everytime `render` is called. As is, though, it hardly matters.

###The state of a tile

In the old version, the `Tile` component made use of three state variables; `flipped`, `correct` and `wrong`. This was really bad design on my part, which also made for needlessly complex code. When a tile is flipped, it is either correct or wrong. If wrong, I'll reset flipped to false after 2 seconds. 

A much better design is to bake this into a single tile status variable with the possible values of `unturned`, `correct` and `wrong`!

So why are we discussing the innards of `Tile` while going over changes to `Board`? Because having refactored everything into that single `status` enum variable, I realised that this value should be passed to `Tile` from `Board`. Before, when they were three different variables, I didn't even see the possibility. Ian did, so his [new version of `Board`](https://github.com/ianobermiller/reactexperiment/commit/eb99289124a0154edfcd59486afc45e47bfefa77) contains two state arrays tracking this; `wrongIndexes` and `correctIndexes`.

Having baked it all together into an enum variable, my approach was instead to give `Board` a single `tilestates` array containing these values. We initially set them all to `unturned`:

```javascript
getInitialState() {
  return {
    tilestates: _.map(_.range(this.props.words.length),()=>'unturned'),
    // the other variables redacted
  };
},
```

When we render the tiles, each tile is passed its status as a property along with the word:

```javascript
<Tile word={b} status={this.state.tilestates[n]} />
```

As the game progresses, we merely need to update the corresponding indexes in `tilestates` in `Board`, and the faux data binding of React's &quot;rerender everything&quot; approach will take care of the rest!


###More underscore shenanigans

Speaking of updating the `tilestates` array, here's a closer look at the code where that is done:

```javascript
// revealing a lone tile
this.setState({
  message: 'findmate',
  tilestates: _.extend(this.state.tilestates,_.object([index],['revealed']))
});

// marking a pair as correct
this.setState({
  found: this.state.found+1,
  message: 'foundmate',
  tilestates: _.extend(this.state.tilestates,_.object([index,otherindex],['correct','correct']))
});

// marking a pair as wrong
this.setState({
  message: 'wrong',
  tilestates: _.extend(this.state.tilestates,_.object([index,otherindex],['wrong','wrong']))
});

// turning a pair back down
this.setState({
  message: this.state.message === 'findmate' ? 'findmate' : this.max === this.state.found ? 'foundall' : 'choosetile',
  tilestates: matched ? this.state.tilestates : _.extend(this.state.tilestates,_.object([index,otherindex],['unturned','unturned']))
});
```

The `_.extend` call calculating the new `tilestates` array is succinct to the point of arrogance, but I feel it is warranted here. Expressing this functionality as a one-liner makes the code much less verbose, which I argue is worth the heightened cognitive cost of understanding what the hell the line actually does. This is understood contextually, even for those who can't decipher the code.

There's another reason why I didn't make a helper function containing the same functionality in a more readable way; we should never mutate anything in `this.state` except through calls to `this.setState`. And not mutating an array while we're operating on it over several LOC's isn't feasible. That means we'd have to copy the array, mutate the copy, and then finally pass that to `setState`.

Doing it that way would amount to lots of work and lots of LOC's, which I use as an excuse to get away with my arrogant one-liner. I concede that there are probably times when I make this exact argument that I'm in the wrong, but the point remains; wielded with responsibility, the powerful expressiveness of Underscore/Lodash can really help you make the code less bulky.


###Tile click catching attempt #1 - passing back instance

When a `Tile` is clicked, we need to act on this in `Board`. In my first version, I pass a click handler from `Board` to `Tile`. Inside tile, the tile will then call the handler passing itself as a parameter.

```javascript
// old click handler inside `Tile`
catchClick: function(){
  if (!this.state.flipped){
    this.props.clickedTile(this);
  }
},
```

This way board got access to the instance, and can call the relevant methods on the tile to show or hide it.

```javascript
// old clickedTile method in Board was passed tile instance and called methods on that
clickedTile: function(tile){
  if (!this.wait){
    if (!this.flippedtile){
      tile.reveal();
      // ...rest redacted...
    } else {
      this.wait = true;
      if (this.flippedtile.props.word === tile.props.word){
        tile.succeed();
        this.flippedtile.succeed();
        // ...rest redacted...
      } else {
        tile.fail();
        this.flippedtile.fail();
        // ...rest redacted...
      }
      // ...rest redacted...
    }
  }
},
```

This is needlessly complex, and, as Ian pointed out, an antipattern when React structure is concerned. You should never pass a component instance upstream, there's always a better choice.

###Tile click catching attempt #2 - passing back index

After refactoring the tile status to the `tilestates` array in `Board`, it would be enough if we told `Board` the index of the clicked `Tile`. In this version the rendering of the tiles inside the `Board` render method looked like this:

```javascript
{this.props.words.map(
  function(w,n){
    return (<Tile clickedTile={this.clickedTile} word={w} status={this.state.tilestates[n]} key={n}/>);
  }
)}
```

And in `Tile`, the click handler passes the `key` property instead of the instance as in attempt #1.

```javascript
catchClick: function(){
  if (this.props.status==='unturned'){
    this.props.clickedTile(this.props.key);
  }
},
```

###Tile click catching attempt #3 - calling prefilled callback

In attempt #2, we're passing `key` to `Tile` only to have `Tile` pass it right back in the click handler. That seems needlessly clunky. There's no computation done inside `Tile` that `Board` is interested in, we're just getting back stuff we already know.

But we have to pass a callback to `Tile`, and we have to know the index of the clicked tile. That gave me the idea for attempt #3 - how about, instead of passing `clickedTile`, we pass a function wich calls `clickedTile` with the correct index? Here's the new render loop doing that, using `_.partial` to create the callback:

```javascript
{this.props.words.map(
  function(w,n){
    return (<Tile clickedTile={_.partial(this.clickedTile,n))} word={w} status={this.state.tilestates[n]} key={n}/>);
  }
)}
```

And here's the new `catchClick` in `Tile`, which now just calls the callback:

```javascript
catchClick: function(){
  if (this.props.status==='unturned'){
    this.props.clickedTile();
  }
},
```

###Tile click catching attempt #4 - moving the `unturned` check up to `Board`

Having the check to prevent clicking turned tiles inside `Tile` didn't really sit right with me. All other computations regarding the `status` of a tile is right there in `Board`'s `clickedTile` method. I therefore moved the check here:

```javascript
clickedTile(index){
  if (this.state.tilestates[index]==='unturned'){
    // ...redacted ...
  }
}
```

The click handler inside `Tile` is now reduced to this:

```javascript
catchClick: function(){
  this.props.clickedTile();
},
```

###Tile click catching final version - catching click in Board

It's getting cleaner, but even this sleek version felt weird. Why bother catching the click event inside `Tile` at all? There's absolutely no computations going on, and we're not passing anything back. Why not simply catch the clicks in Board?

I decided to try this, wrapping all tiles in a div which container the click handler. Here's the final version of the render loop:

```javascript
{this.props.words.map(
  (b,n) => {
    return (<div onClick={_.partial(this.clickedTile,n)}>
      <Tile word={b} status={this.state.tilestates[n]} />
    <div>)
  }
)}
```

There's an added cost in form of the wrapping div tags, but the upside is that `Tile` no longer contains a click handler at all.

Whether this final version is actually cleaner than attempt #4 is definitely debatable. As `clickedTile` is already very complex, you could even argue that attempt #3, where the `unturned` check lives in the Tile click handler, is the ideal solution.

Having the click handler inside Tile also lets you put it on the clickable side. Here's the `render` code for `Tile` before this final version:

```
render(){
  return (
    <div className={'brick '+this.props.status}>
      <div className="front" onClick={this.catchClick}>?</div>
      <div className="back">{this.props.word}</div>
    </div>
  );
}
```

However, the value of the &quot;correct&quot; placement of the click handler is limited - since we're animating the flipping of tiles, we still need to check the status of a clicked tile, as it would otherwise be possible to do a quick doubleclick on a tile and match it to itself.

###The new Tile component code

Finally, here's what's left of the now pitiful Tile component:

```
/** @jsx React.DOM */

var Tile = React.createClass({
  propTypes: {
    status: React.PropTypes.string.isRequired, 
    word: React.PropTypes.string.isRequired
  },
  render(){
    return (
      <div className={'brick '+this.props.status}>
        <div className='front'>?</div>
        <div className='back'>{this.props.word}</div>
      </div>
    );
  }
});
```

<table>
  <thead><th>Props</th><th>State</th><th>Sub components</th><th>Instance variables</th></thead>
  <tbody>
    <tr><td>word<br/><span style='color:red;text-decoration:line-through;'>clickedTile()</span><br/><span style='color:green;'>**status**</span></td><td><span style='color:red;text-decoration:line-through;'>flipped</span></br><span style='color:red;text-decoration:line-through;'>wrong</span><br/><span style='color:red;text-decoration:line-through;'>correct</span></td><td></td><td></td></tr>
  </tbody>
</table>

Because of my `status` refactoring I no longer need the css class shenanigans of the previous version, I merely add the value of `this.props.status` as a class. But if I had kept the previous approach of separate flag variables, I would be better of using the [classSet](http://facebook.github.io/react/docs/class-name-manipulation.html) addon. See [Ian's version](https://github.com/ianobermiller/reactexperiment/commit/072431f2d81dd37ff8c30d5eecb6b338f1244a91) for what that might look like.

###Wrapping up (again)

Diving back down, and diving this deep into sometimes trivial details, was again a powerful learning experience for me! I am hugely grateful to Ian for supplying his fork, which really helped me propelling my understanding along.

I hope you poor souls who survived through all these ramblings also managed to get something out of it!

And again, the main takeaway for me was: React is really, really powerful stuff. Absolutely loving it, and can't wait to explore the flux architecture and routing solutions!