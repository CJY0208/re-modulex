import { run } from './try'

/**
 * [缓存函数结果]
 * @param {Function} fn 被处理的函数
 */
export const memoize = fn => {
  const cache = new Map()
  const memoized = function(param, ...rest) {
    if (cache.has(param)) {
      return cache.get(param)
    }

    const result = fn.call(this, param, ...rest)

    cache.set(param, result)
    return result
  }

  memoized.cache = cache
  return memoized
}

export const pickBy = (obj, predicate = val => val) =>
  Object.entries(obj)
    .filter(([key, value]) => run(predicate, undefined, value, key))
    .reduce(
      (res, [key, value]) => ({
        ...res,
        [key]: value
      }),
      {}
    )

/**
 * [过滤对象属性] 挑选处一个对象中的指定属性
 * @param {Object} obj 数据源对象
 * @param {Array} keys
 */
export const pick = (obj, keys = Object.keys(obj)) =>
  pickBy(obj, (value, key) => keys.includes(key))
