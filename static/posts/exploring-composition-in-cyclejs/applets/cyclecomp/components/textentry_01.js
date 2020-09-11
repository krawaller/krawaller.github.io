// Not using any children

import {div, label, input, hr, h4, button, p} from '@motorcycle/dom';

import isolate from '@cycle/isolate'

function intent(sources){
  const input$ = sources.DOM.select('.field').events('input')

  const click$ = sources.DOM.select('.submitbtn').events('click')

  const newValue$ = input$
    .map(e => ({type: 'INPUT', data:e.target.value}))

  const submit$ = input$.sampleWith(click$)
    .map(e=> ({type: 'SUBMIT', data:e.target.value}))

  return {
    action$: submit$.merge(newValue$),
    submit$: submit$
  }
}

function model(actions$){
  return actions$.scan((state, action)=>{
    switch(action.type){
      case 'INPUT':
        return {...state, inputVal:action.data}
      case 'SUBMIT':
        return {displayName:action.data, inputVal:''}
      default:
        return state
    }
  }, {displayName:'', inputVal:''} )
}

function view(state$){
  return state$.map((state)=>{
    return div('.child',[
      label('Name:'),
      input('.field', {attrs: {type: 'text'}, props:{value: state.inputVal}}),
      button('.submitbtn',{attrs:{type:'submit',value:'Save', disabled: !state.inputVal}},'Submit')
    ])
  })
}

export default isolate((sources)=>{
  let intents = intent(sources)
  let state$ = model(intents.action$)
  let vtree$ = view(state$)
  return {
    DOM: vtree$,
    submit$: intents.submit$.map(a => a.data)
  }
});
