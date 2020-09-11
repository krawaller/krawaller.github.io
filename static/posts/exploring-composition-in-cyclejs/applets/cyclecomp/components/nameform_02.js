import {div, label, input, hr, h4, button, p, span} from '@motorcycle/dom';

import isolate from '@cycle/isolate'

import most from 'most'

import Submit from './textentry_02'

function main(sources){
  const comp = Submit(sources)

  const load$ = sources.store

  const state$ = comp.submit$.startWith('John').merge(load$)

  const vtree$ = most.combine((state,compvtree)=>{
    return div([
      compvtree,
      h4('Hello, '+state)
    ]);
  },state$,comp.DOM)

  return {
    DOM: vtree$,
    store: state$
  }
}

export default main