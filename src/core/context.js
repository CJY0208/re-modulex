import React, { Component, useContext, forwardRef, createContext } from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { getModules, mapModules } from '../helpers/modules'
import { applyStore } from '../helpers/store'
import { get, run, value } from '../helpers/try'
import { isFunction } from '../helpers/is'

const ReModulexContext = value(() => {
  try {
    return createContext()
  } catch (error) {
    console.warn(
      new Error(`
      [ReModulex Environment Waring] 
        'createContext' API is not supported by your React version. 
        'ModuleProvider' and 'connectModules' would NOT effect.
        Use 'applyStore' and 'mapModules' with 'Provider' and 'connect' in react-redux instead.        
    `)
    )
    return {
      Provider: ({ children }) => run(children),
      Consumer: ({ children }) => run(children)
    }
  }
})

const { Provider, Consumer } = ReModulexContext

export class ModuleProvider extends Component {
  state = this.props.store.getState()

  constructor(props, ...args) {
    const { store } = props

    super(props, ...args)
    applyStore(store)
    this.unsubscibe = store.subscribe(() =>
      this.setState(this.props.store.getState())
    )
  }

  componentWillUnmount() {
    run(this.unsubscibe)
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export const connectModules = modulesGetter => Component => {
  const C = forwardRef((props, ref) => (
    <Consumer>
      {storeState => (
        <Component
          {...props}
          {...mapModules(modulesGetter, storeState)}
          {...{ ref }}
        />
      )}
    </Consumer>
  ))

  C.displayName = `HOC-ReModulex(${value(
    Component.displayName,
    Component.name
  )})`

  return hoistStatics(C, Component)
}

export const useModules = modulesGetter => {
  if (!isFunction(useContext)) {
    return console.warn(`
      [ReModulex Environment Waring] 
        'useContext' API is not supported by your React version.
        YOU CAN NOT use 'useModules' api unless upgrade React
    `)
  }

  const storeState = useContext(ReModulexContext)

  return mapModules(modulesGetter, storeState)
}

export const useModule = moduleName => get(useModules([moduleName]), moduleName)
