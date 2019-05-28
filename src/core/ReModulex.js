import React from 'react'

import { get, run, value } from '../helpers/try'
import { isObject, isFunction } from '../helpers/is'
import { saveModule, getModules, hasModule } from '../helpers/modules'
import {
  dispatch as storeDispatch,
  getState as getStoreState
} from '../helpers/store'
import { combine, split } from '../helpers/splitter'
import memoize from '../helpers/memoize'

export default class ReModulex {
  constructor({ name, state: __initial__state, ...config }) {
    if (hasModule(name)) {
      throw new Error(`
        [Creating ReModulex Error] Duplicated module named '${name}'
      `)
    }

    if (!isObject(__initial__state)) {
      throw new Error(`
        [Creating ReModulex Error] Initial state must be an Object!
      `)
    }

    const initialState = {
      __ReModulexName: name,
      ...__initial__state
    }
    const __mutations = Object.entries(
      run(config, 'mutations', {
        combine
      })
    ).reduce(
      (mutations, [actionType, reducer]) => ({
        ...mutations,
        ...split(actionType, reducer, name)
      }),
      {}
    )
    const __actions = run(config, 'actions', {
      getModules,
      getStoreState,
      dispatch: this.dispatch,
      commit: this.commit,
      getState: this.getState
    })

    saveModule(
      name,
      Object.assign(this, {
        name,
        getters: get(config, 'getters', {}),
        actions: __actions,
        reducer: (state = initialState, { type, payload }) => ({
          ...state,
          ...run(__mutations, type, state, payload)
        })
      })
    )
    Object.assign(this.dispatch, __actions)
  }

  dispatch = (actionName = '', ...args) =>
    run(this.actions, actionName.split('/'), ...args)

  commit = (actionType = '', payload) =>
    storeDispatch({
      type: `${this.name}::${actionType}`,
      payload
    })

  compute = state => {
    const compute = memoize(name => run(this.getters, name, state, compute))

    return Object.keys(this.getters).reduce(
      (getters, name) => ({
        ...getters,
        [name]: compute(name)
      }),
      {}
    )
  }

  __storeKeyCache
  getState = (storeState = getStoreState()) => {
    if (storeState.__ReModulexName === this.name) {
      return storeState
    }

    let __cacheState = get(storeState, this.__storeKeyCache)
    if (get(__cacheState, '__ReModulexName') === this.name) {
      return __cacheState
    }

    const [storeKey, moduleState] = Object.entries(storeState).find(
      ([key, state]) => get(state, '__ReModulexName') === this.name
    )
    this.__storeKeyCache = storeKey
    return moduleState
  }
}
