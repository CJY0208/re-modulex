import ReModulex from './core/ReModulex'

export default ReModulex
export const createModule = (...args) => new ReModulex(...args)
export * from './core/context'
export { config as configLogger } from './helpers/logger'
export { mapModules, getModules, hasModule } from './core/modules'
export { applyStore } from './core/store'
