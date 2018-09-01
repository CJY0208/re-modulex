const __modules = {}

export const getModules = () => __modules
export const hasModule = name => !!__modules[name]
export const saveModule = (name, module) => {
  __modules[name] = module
}
