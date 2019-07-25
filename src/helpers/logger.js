import { run } from './try'

let conf = {
  silent: false
}

export const config = config => {
  conf = {
    ...conf,
    ...config
  }
}

const check = fn => (...args) => {
  if (conf.silent) {
    return
  }

  return run(fn, undefined, ...args)
}

export const warn = check(console.warn)
export const error = check(console.error)
