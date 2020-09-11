// Solves circular dep using helper function for singular

import {div, label, input, hr, h4, button, p} from '@motorcycle/dom';

import isolate from '@cycle/isolate'

import Confirm from './confirm'

import mostSubject from 'most-subject'
import most from 'most'

import compose from '../compose/most'
const {withComponent} = compose()


const intent = (sources)=> {
  const input$ = sources.DOM.select('.field').events('input')

  const newValue$ = input$
    .map(e => ({type:'INPUT', data:e.target.value}))

  const submit$ = input$.sampleWith(sources.childsinks.submit$)
    .map(e=> ({type:'SUBMIT', data:e.target.value}))
    .multicast()

  return {
    action$: submit$.merge(newValue$),
    submit$: submit$
  }
}


const model = action$ => action$.scan((state, action)=> {
  switch(action.type){
    case 'INPUT':
      return action.data
    case 'SUBMIT':
      return ''
    default:
      return state
  }
}, '' )


const view = (state$,confirmvtree$)=> xs.combine((state,confirmvtree)=> (
  div('.child',[
    label('Name: '),
    input('.field', {attrs: {type: 'text'}, props:{value: state}}),
    confirmvtree
  ])
),state$,confirmvtree$)


function main(sources) {
  const intents = intent(sources)
  const state$ = model(intents.action$)
  const vtree$ = view(state$, sources.childsinks.DOM)
  return {
    DOM: vtree$,
    submit$: intents.submit$.map(a => a.data),
    disabled$: state$.map(i => !i).startWith(true)
  }
}


export default isolate(withComponent(main,Confirm,"disabled$"))

