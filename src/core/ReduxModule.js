import React from 'react'

import { get, run, value } from '../helpers/try'
import { saveModule, getModules, hasModule } from './helpers/modules'
import {
  dispatch as reduxDispatch,
  getState as reduxGetState
} from './helpers/redux'
import {
  combine as combineActions,
  split as splitActions
} from './helpers/actions'

export default class ReduxModule {
  constructor({
    name,
    getReducers = reducer => reducer,
    getters: computer,
    state: __initial__state,
    actions: __actions__getter,
    mutations: __mutations__getter
  }) {
    if (hasModule(name)) {
      throw new Error(`
        [Creating ReduxModule Error] Duplicated module named '${name}'
      `)
    }

    const initialState = Object.assign(
      {
        __reduxModuleName: name
      },
      __initial__state
    )
    const __fix__reg = new RegExp(`^${name}::`)
    const __mutations = Object.entries(
      run(__mutations__getter, undefined, {
        combine: combineActions
      })
    ).reduce(
      (mutations, [actionType, reducer]) => ({
        ...mutations,
        ...splitActions(actionType, reducer)
      }),
      {}
    )

    saveModule(
      name,
      Object.assign(this, {
        name,
        computer,
        actions: run(__actions__getter, undefined, {
          getModules,
          dispatch: this.dispatch,
          commit: this.commit,
          getState: this.findModuleState,
          getReduxState: reduxGetState
        }),
        reducer: (state = initialState, { type, payload }) => ({
          ...state,
          ...run(__mutations, type.replace(__fix__reg, ''), state, payload)
        })
      })
    )
  }

  dispatch = (actionName = '', ...args) =>
    run(this.actions, actionName.replace(/\//g, '.'), ...args)

  commit = (actionType = '', payload) => {
    reduxDispatch({
      type: `${this.name}::${actionType}`,
      payload
    })
  }

  compute = state =>
    Object.entries(this.computer).reduce(
      (getters, [key, getter]) => ({
        ...getters,
        [key]: getter(state)
      }),
      {}
    )

  __storeKeyCache
  findModuleState = (storeState = reduxGetState()) => {
    if (storeState.__reduxModuleName === this.name) {
      return storeState
    }

    if (this.__storeKeyCache) {
      let __cacheState = get(storeState, this.__storeKeyCache)
      if (get(__cacheState, '__reduxModuleName') === this.name) {
        return __cacheState
      }
    }

    const [storeKey, moduleState] = Object.entries(storeState).find(
      ([key, state]) => get(state, '__reduxModuleName') === this.name
    )
    this.__storeKeyCache = storeKey
    return moduleState
  }
}
