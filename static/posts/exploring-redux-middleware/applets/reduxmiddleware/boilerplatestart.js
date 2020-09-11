
/************* EXPERIMENT BOILERPLATE ****************/

// convenience aliases
var createStore = Redux.createStore,
    applyMiddleware = Redux.applyMiddleware;

// super simple counter reducer, where state is just a number
var reducer = function(state,action){
    state = state || 0;
    switch(action.type){
        case 'INCREMENT': return state + (action.by || 1);
        default: return state;
    }
}

// render the current state of the store onto the screen
var render = function(){
    document.getElementById("app").innerHTML = "<h2>Clicked "+store.getState()+" times.</h2>";
}

// put stuff into the log
var output = function(txt){
    var newparagraph = document.createElement("div");
    newparagraph.innerHTML = txt;
    document.getElementById("log").appendChild(newparagraph);
}

/***************** Middlewares used in more than 1 experiment ***********/

// a logging middleware, if we wanna
var logger = function(middlewareAPI){
    return function(next){
        return function(action){
            output("Will dispatch action: "+JSON.stringify(action));
            var ret = next(action);
            output("State after dispatch: "+middlewareAPI.getState());
        }
    }
}

var snoop = function(name,snoopfor){
    matchstr = (snoopfor+"").replace(/\s+/g,' ').trim();
    return function(middlewareAPI){
        return function(next){
            var nextstr = (next+"").replace(/\s+/g,' ').trim();
            return function(action){
                output(name+" "+(matchstr === nextstr));
                next(action);
            }
        }
    }
}

var noop = function(middlewareAPI){
    return function(next){
        return function(action){
            return next(action);
        }
    }
}

var thunk = function(middlewareAPI){
    return function(next){
        return function(action){
            if (typeof action === 'function'){
                return action(middlewareAPI.dispatch,middlewareAPI.getState);
            } else {
                return next(action);
            }
        }
    }
}
