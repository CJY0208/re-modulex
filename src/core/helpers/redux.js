import { run } from '../../helpers/try'

const __redux__store = {}

export const applyStore = store => {
  Object.assign(__redux__store, store)
}

export const dispatch = (...args) => run(__redux__store, 'dispatch', ...args)
export const getState = (...args) => run(__redux__store, 'getState', ...args)
