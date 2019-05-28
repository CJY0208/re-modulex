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

export default memoize
