import React from 'react'

import { get, run, value } from '../helpers/try'
import { isObject, isFunction } from '../helpers/is'
import { memoize } from '../helpers/utils'
import { saveModule, getModules, hasModule } from './modules'
import { dispatch as storeDispatch, getState as getStoreState } from './store'
import { combine, split } from './splitter'

// 很抱歉...我是一个懒人...注释什么的...等有空再加 >_<
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
    const __get__mutations__state = Object.entries(
      run(config, 'mutations', {
        combine
      })
    ).reduce(
      (mutations, [actionType, reducer]) => ({
        ...mutations,
        ...split(actionType, reducer)
      }),
      {}
    )

    const __mutations = Object.entries(__get__mutations__state).reduce(
      (mutations, [type, func]) => ({
        ...mutations,
        [type]: payload =>
          storeDispatch({
            type: `${name}::${type}`,
            payload
          })
      }),
      {}
    )

    const __actions = run(config, 'actions', {
      getModules,
      getStoreState,
      dispatch: this.dispatch,
      commit: this.commit,
      getState: this.getState,
      getComputed: this.getComputed
    })

    saveModule(
      name,
      Object.assign(this, {
        name,
        getters: get(config, 'getters', {}),
        actions: __actions,
        mutations: __mutations,
        reducer: (state = initialState, { type, payload }) => {
          const nextState = {
            ...state,
            ...run(
              __get__mutations__state,
              type.replace(`${name}::`, ''),
              state,
              payload
            )
          }

          return {
            ...nextState,
            _getters: this.compute(nextState)
          }
        }
      })
    )
    Object.assign(this.dispatch, __actions)
    Object.assign(this.commit, __mutations)
  }

  dispatch = (actionName = '', ...args) =>
    run(this.actions, actionName.split('/'), ...args)

  commit = (type = '', payload) => run(this.mutations, type, payload)

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

  getComputed = () => {
    const state = this.getState()
    return get(state, '_getters', this.compute(state))
  }
}
