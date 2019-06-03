import ReModulex from './core/ReModulex'

export const createModule = (...args) => new ReModulex(...args)
export * from './core/context'
export { mapModules } from './core/modules'
export { applyStore } from './core/store'
