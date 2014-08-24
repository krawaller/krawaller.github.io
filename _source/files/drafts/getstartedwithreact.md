React experiment woo! I built a memory game:

<iframe src='http://blog.krawaller.se/reactexperiment/' style="height:140px;width:100%"></iframe>


### The code

So here's the structure. 5 different components:

![structure](../../img/reactexperiment.png)

bla bla game.js:

```javascript
/** @jsx React.DOM */

var Game = React.createClass({
  getInitialState: function(){
    return {playing: false,tiles:[]};
  },
  startGame: function(words){
    this.setState({tiles:words.concat(words),playing:true,seed:Math.random()});
  },
  endGame: function(){
    this.setState({playing:false});
  },
  render: function() {
    return (
      <div>
        <div className={this.state.playing ? "showing" : "hidden"}>
          <Board endGame={this.endGame} tiles={this.state.tiles} key={this.state.seed}/>
        </div>
        <div className={this.state.playing ? "hidden" : "showing"}>
          <Wordform startGame={this.startGame} />
        </div>
      </div>
    );
  }
});
```

moo moo wordform:

```javascript
/** @jsx React.DOM */

var Wordform = React.createClass({
  getInitialState: function(){return {error:""};},
  setError: function(msg){
    this.setState({error:msg});
    setTimeout((function(){
      this.setState({error:""});
    }).bind(this),2000);
  },
  submitWords: function(e){
    var node = this.refs["wordfield"].getDOMNode(),
        words = (node.value || "").replace(/\W{1,}/g," ").replace(/^\W|\W$/g,"").split(" ");
    if (words.length <= 2) {
      this.setError("Enter at least 3 words!");
    } else if (words.length !== _.unique(words).length) {
      this.setError("Words should be unique!");
    } else if (_.filter(words,function(w){return w.length > 6}).length) {
      this.setError("Words should not be longer than 6 characters!");
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

and the board:

```javascript
/** @jsx React.DOM */

var Board = React.createClass({
  getInitialState: function() { return {found: 0, message: "choosetile"}; },
  clickedTile: function(tile){
    if (!this.wait){
      // turn up lone tile 
      if (!this.flippedtile){
        this.flippedtile = tile;
        tile.flipAndSearch();
        this.setState({found:this.state.found,message:"findmate"});
      // clicked second
      } else {
        this.wait = true;
        if (this.flippedtile.props.word === tile.props.word){
          this.setState({found: this.state.found+1,message: "foundmate"});
          tile.revealAndSucceed();
          this.flippedtile.marryNewlyfound();
        } else {
          this.setState({found:this.state.found,message:"wrong"});
          tile.revealAndFail();
          this.flippedtile.hideInSorrow();
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
    return (
      <div>
        <button onClick={this.props.endGame}>End game</button>
        <Status found={this.state.found} max={this.props.tiles.length/2} message={this.state.message} />
        {this.props.tiles.map(function(b,n){
          return <Tile word={b} key={n} clickedTile={this.clickedTile} />;
        },this)}
      </div>
    );
  }
});
```

board has status:

```jsx
/** @jsx React.DOM */

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
    return <p>({found}/{max})&nbsp;&nbsp;{texts[this.props.message]}</p>;
  }
});
```

And finally Tile:

```jsx
/** @jsx React.DOM */

var Tile = React.createClass({
  getInitialState: function() { return {flipped: false}; },
  catchClick: function(){
    if (!this.state.flipped){
      this.props.clickedTile(this);
    }
  },
  flipAndSearch: function(){
    this.setState({flipped:true});
  },
  hideInSorrow: function(){
    setTimeout((function(){this.setState({flipped:false});}).bind(this),2000);
  },
  revealAndFail: function(){
    this.setState({flipped:true});
    setTimeout((function(){this.setState({flipped:false});}).bind(this),2000);
  },
  revealAndSucceed: function(){
    this.setState({flipped:true});
  },
  marryNewlyfound: function(){

  },
  render: function() {
    return (
      <div className={'brick'+(this.state.flipped ? ' flipped' : '')} onClick={this.catchClick}>
        <div className="front">?</div>
        <div className="back">{this.props.word}</div>
      </div>
    );
  }
});
```




traps:

return {this.props.name}  correct: return <div>{this.props.name}</div>


nogo:
return (
      {this.state.playing ? <Board tiles={this.state.tiles}/> : <Wordform />}
    );

no good: 

return (
      <div>{this.state.playing ? <Board endGame={this.endGame} tiles={this.state.tiles}/> : <Wordform startGame={this.startGame} />}</div>
    );
  }


more no good:

<Board className={this.state.playing ? "showing" : "hidden"} endGame={this.endGame} tiles={this.state.tiles}/>
        <Wordform className={this.state.playing ? "hidden" : "showing"} startGame={this.startGame} />


old solution:           //return (<div onClick={this.handleQlick.bind(this, n)} key={n}><Tile word={b} ref={"brick"+n} /></div>);