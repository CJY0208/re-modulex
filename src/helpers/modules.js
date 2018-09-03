import { value, run } from './try'

const __modules = {}

export const getModules = () => __modules
export const hasModule = name => !!__modules[name]
export const saveModule = (name, module) => {
  __modules[name] = module
}
export const mapModules = (modulesGetter, storeState) =>
  Object.entries(value(run(modulesGetter, undefined, getModules()), {})).reduce(
    (res, [name, { dispatch, commit, compute, getState }]) => ({
      ...res,
      [name]: value(() => {
        const state = getState(storeState)
        
        return {
          state,
          dispatch,
          commit,
          getters: compute(state)
        }
      })
    }),
    {}
  )
