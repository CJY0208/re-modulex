import { isArray } from '../helpers/is'
import { value, run } from '../helpers/try'
import { pick } from '../helpers/utils'

const __modules = {}

export const getModules = () => __modules
export const hasModule = name => !!__modules[name]
export const saveModule = (name, module) => {
  __modules[name] = module
}
export const mapModules = (modulesGetter, storeState) => {
  if (isArray(modulesGetter)) {
    let moduleNames = [...modulesGetter]
    modulesGetter = modules => pick(modules, moduleNames)
  }

  const modules = value(run(modulesGetter, undefined, getModules()), {})

  return Object.entries(modules).reduce(
    (res, [name, { dispatch, commit, compute, getState, getComputed }]) => ({
      ...res,
      [name]: value(() => {
        const state = getState(storeState)

        return {
          getState,
          getComputed,
          dispatch,
          commit,
          state,
          getters: getComputed()
        }
      })
    }),
    {}
  )
}
