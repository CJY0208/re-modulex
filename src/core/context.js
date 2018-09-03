import React, { Component } from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { getModules, mapModules } from '../helpers/modules'
import { applyStore } from '../helpers/store'
import { get, run, value } from '../helpers/try'

const { Provider, Consumer } = React.createContext()

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
  const C = props => (
    <Consumer>
      {storeState => <Component {...props} {...mapModules(modulesGetter)} />}
    </Consumer>
  )

  C.displayName = `HOC-ReModulex(${value(
    Component.displayName,
    Component.name
  )})`

  return hoistStatics(C, Component)
}
