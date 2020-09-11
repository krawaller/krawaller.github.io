import {span, button} from '@motorcycle/dom';

import isolate from '@cycle/isolate'

import most from 'most'


function intent(sources) {
  return most.mergeArray([
    (sources.disabled$ || most.never()).map(i=> i ? 'DISABLE' : 'ENABLE'),
    sources.DOM.select('.maybe').events('click').map(i=>'MAYBE'),
    sources.DOM.select('.cancel').events('click').map(i=>'CANCEL'),
    sources.DOM.select('.confirm').events('click').map(i=>'CONFIRM'),
  ])
}

function model(action$){
  return action$.scan((s,action)=> {
    switch(action){
      case 'DISABLE': return 'disabled'
      case 'MAYBE': return 'areyousure'
      case 'ENABLE': return s === 'disabled' ? 'waiting' : s
      default: return 'waiting'
    }
  })
}

function view(state$) {
  return state$.map(state=>(
    span('.child', [
      state === 'areyousure' ? span('.confirmapp',[
        button('.confirm','Confirm'),
        button('.cancel','Cancel')
      ]) : span('.confirmapp',[
        '','', // prevents DOM driver bug
        button('.maybe',{attrs:{disabled: state === 'disabled'}},'Submit')
      ])
    ])
  ));
}


export default isolate( (sources)=> {

  const action$ = intent(sources)
  const state$ = model(action$)
  const vtree$ = view(state$)

  return {
    DOM: vtree$,
    submit$: action$.filter(i => i === 'CONFIRM')
  }
})
