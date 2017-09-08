/**
 * @desc 节流阀 限制函数调用频率
 * 
 * @param [Func] fn
 * @param [Number] period
 * @returns [Func] fn
 */

const throttle = (fn, period) => {
  let ttl = true
    , timer = -1

  return (...args) => {
    if (ttl) {
      const ret = fn.apply(this, args)

      ttl = false
      clearTimeout(timer)

      timer = setTimeout(() => {
        ttl = true
      }, period)

      return ret
    }

    return false
  }
}

export default throttle