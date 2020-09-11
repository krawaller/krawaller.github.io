/*
At this point the experiment has created a store. Now we just need to 
hook up the render method and a click event.
*/

store.subscribe(render);
render();

document.addEventListener('click', function(e){
    store.dispatch({ type: 'INCREMENT', by: 1 });
});
