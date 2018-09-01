import React, { Component } from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { getModules } from './helpers/modules'
import { applyStore } from './helpers/redux'
import { get, run, value } from '../helpers/try'

const { Provider, Consumer } = React.createContext()

export class ModuleProvider extends Component {
  state = this.props.store.getState()

  componentDidMount() {
    const { store } = this.props

    applyStore(store)
    this.unsubscibe = store.subscribe(this.listener)
  }

  componentWillUnmount() {
    run(this.unsubscibe)
  }

  listener = () => this.setState(this.props.store.getState())

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export const connectModules = modulesGetter => Component => {
  const C = props => (
    <Consumer>
      {storeState => (
        <Component
          {...props}
          {...Object.entries(
            value(run(modulesGetter, undefined, getModules()), {})
          ).reduce(
            (
              res,
              [
                name,
                {
                  dispatch,
                  commit,
                  compute,
                  name: __module__name,
                  findModuleState
                }
              ]
            ) => ({
              ...res,
              [name]: value(() => {
                const state = findModuleState(storeState)
                const getters = compute(state)

                return {
                  state,
                  getters,
                  dispatch,
                  commit
                }
              })
            }),
            {}
          )}
        />
      )}
    </Consumer>
  )

  C.displayName = `HOC_ReduxModule(${value(
    Component.displayName,
    Component.name
  )})`

  return hoistStatics(C, Component)
}
