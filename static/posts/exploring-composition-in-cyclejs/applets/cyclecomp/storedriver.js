import most from 'most'

export default function(key){
  return function(save$){
    // save values from sink to localstorage
    save$.subscribe({
      next: function(i){
        localStorage.setItem(key,i);
      }
    });
    // return existing saved value as a source
    return most.just(localStorage.getItem(key))
  }
}