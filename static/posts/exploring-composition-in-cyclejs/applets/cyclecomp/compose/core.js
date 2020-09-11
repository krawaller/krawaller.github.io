
const makeCompose = proxy => (config={}) => {
  const withComponent = (main, constructor, ...dependencies) => sources => {
    let proxies = dependencies.reduce((proxies,dep)=>({
      ...proxies,
      [dep]: proxy()
    }),{})
    const childsinks = constructor({...sources,...proxies})
    const sinks = main({...sources,[config.childrensinks||'childsinks']:childsinks})
    Object.keys(proxies).forEach(proxy => proxies[proxy].proxy(sinks[proxy]))
    return sinks
  }
  const withComponents = (main,children) => sources => {
    let proxies = {}
    const childrensinks = Object.keys(children).reduce((childrensinks,child)=>{
      const [constructor,...dependencies] = children[child]
      const myproxies = dependencies.reduce((myproxies,dep)=>({
        ...myproxies,
        [dep]: proxies[dep] || (proxies[dep] = proxy())
      }),{})
      return {
        ...childrensinks,
        [child]: constructor({
          ...sources,
          ...myproxies
        })
      }
    },{})
    const sinks = main({...sources,[config.childrensinks||'childrensinks']:childrensinks})
    Object.keys(proxies).forEach(proxy => proxies[proxy].proxy(sinks[proxy]))
    return sinks
  }
  return {withComponent,withComponents}
}

export default makeCompose

