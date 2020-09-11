// Using Submit child, solves circular dep manually

import {div, label, input, hr, h4, button, p} from '@motorcycle/dom';

import isolate from '@cycle/isolate'

import Confirm from './confirm'

import mostSubject from 'most-subject'
import most from 'most'


function intent(sources,confirm$){
  const input$ = sources.DOM.select('.field').events('input')

  const newValue$ = input$
    .map(e => ({type:'INPUT', data:e.target.value}))

  const submit$ = input$.sampleWith(confirm$)
    .map(e=> ({type:'SUBMIT', data:e.target.value}))
    .multicast()

  return {
    action$: submit$.merge(newValue$),
    submit$: submit$
  }
}

function model(actions$){
  return actions$.scan((state, action)=>{
    switch(action.type){
      case 'INPUT':
        return action.data
      case 'SUBMIT':
        return ''
      default:
        return state
    }
  }, '' )
}

function view(state$,confirmvtree$){
  return most.combine((state,confirmvtree)=>{
    return div('.child',[
      label('Name: '),
      input('.field', {attrs: {type: 'text'}, props:{value: state}}),
      confirmvtree
    ])
  },state$,confirmvtree$)
}

export default isolate((sources)=>{

  const disabledproxy = mostSubject.holdSubject(1)
  const childsources = {DOM:sources.DOM,disabled$:disabledproxy}
  const confirm = Confirm(childsources)

  const intents = intent(sources, confirm.submit$)
  const state$ = model(intents.action$)
  const vtree$ = view(state$, confirm.DOM)

  const disabled$ = state$.map(i => !i).startWith(true)
  disabled$.subscribe(disabledproxy)

  return {
    DOM: vtree$,
    submit$: intents.submit$.map(a => a.data)
  }
});
