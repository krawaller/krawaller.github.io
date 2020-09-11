import {div, label, input, hr, h4, button, p, span} from '@motorcycle/dom';

import isolate from '@cycle/isolate'

import most from 'most'

import compose from '../compose/most'
const {withComponents} = compose()

import Submit from './textentry_04'

function main(sources){

  const load$ = sources.store

  const state$ = sources.childsinks.submit$.startWith('John').merge(load$)

  const vtree$ = most.combine((state,compvtree)=>{
    return div([
      compvtree,
      h4('Hello, '+state)
    ]);
  },state$,sources.childsinks.submit.DOM)

  return {
    DOM: vtree$,
    store: state$
  }
}

export default withComponents(main,Submit)