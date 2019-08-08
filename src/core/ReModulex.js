import { get, run } from '../helpers/try'
import { isObject } from '../helpers/is'
import { warn } from '../helpers/logger'
import { memoize } from '../helpers/utils'
import { saveModule, getModules, hasModule } from './modules'
import {
  dispatch as storeDispatch,
  getState as getStoreState,
  getStore
} from './store'
import { combine, split } from './splitter'

// 很抱歉...我是一个懒人...注释什么的...等有空再加 >_<
export default class ReModulex {
  constructor({ name, state: __initialState, ...config }) {
    if (hasModule(name)) {
      warn('[Creating ReModulex Waring] Module named "${name}" redefined')
    }

    if (!isObject(__initialState)) {
      throw new Error(
        '[Creating ReModulex Error] Initial state must be an Object!'
      )
    }

    const __actionTypePrefix = `${name}::`
    const initialState = {
      __ReModulexName: name,
      ...__initialState
    }
    const __getMutationsState = Object.entries(
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

    const __mutations = Object.entries(__getMutationsState).reduce(
      (mutations, [type, func]) => ({
        ...mutations,
        [type]: payload =>
          storeDispatch({
            type: `${__actionTypePrefix}${type}`,
            payload
          })
      }),
      {}
    )

    const __actions = run(config, 'actions', {
      getStore,
      getModules,
      getStoreState,
      getRootState: getStoreState,
      dispatch: this.dispatch,
      commit: this.commit,
      getState: this.getState,
      getComputed: this.getComputed
    })

    saveModule(
      name,
      Object.assign(this, {
        name,
        getters:
          run(config, 'getters', {
            compute: name => run(this.computeSingleState, undefined, name)
          }) || {},
        actions: __actions,
        mutations: __mutations,
        reducer: (state = initialState, { type, payload }) => {
          if (!type.startsWith(__actionTypePrefix)) {
            return state
          }

          const nextState = {
            ...state,
            ...run(
              __getMutationsState,
              type.replace(__actionTypePrefix, ''),
              state,
              payload
            )
          }
          const getters = this.compute(nextState)
          this.__getters = getters

          return {
            ...nextState,
            _getters: getters
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

  computeSingleState
  compute = state => {
    const compute = memoize(name => run(this.getters, name, state, compute))
    this.computeSingleState = compute

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
    if (!storeState) {
      return {}
    }

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

  __getters
  getComputed = () => {
    if (this.__getters) {
      return this.__getters
    }

    const state = this.getState()
    const getters = this.compute(state)
    this.__getters = getters

    return getters
  }
}
