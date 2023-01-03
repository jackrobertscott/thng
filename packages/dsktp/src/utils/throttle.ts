/**
 *
 */
export const throttle = {
  /**
   * execute callback then set status to waiting for the given timeout
   * time period... all attempts to execute the callback while the status
   * is waiting will wait until the waiting period is over before
   * executing... consecutive callback executions during the timeout period
   * will replace their prior...
   */
  drip: <T>(timeout: number, cb: (...args: T[]) => void) => {
    let last: number | undefined
    let next: undefined | (() => void)
    return (...args: T[]) => {
      next = () => {
        cb(...args)
        last = Date.now()
        setTimeout(() => {
          if (next) next()
          next = undefined
        }, timeout)
      }
      if (!last || Date.now() - last > timeout) {
        next()
        next = undefined
      }
    }
  },
  /**
   * fire a callback at least the "timeout" specified time since
   * the last time the callback was fired or set...
   */
  sling: <T>(timeout: number, cb: (...args: T[]) => void) => {
    let last: undefined | number
    let next: undefined | (() => void)
    let time: any
    return (...args: T[]) => {
      last = Date.now()
      next = () => cb(...args)
      const delay = () => {
        if (last && Date.now() - timeout >= last) {
          if (!next) return
          next()
          next = undefined
        } else {
          if (time) clearTimeout(time)
          time = setTimeout(delay, timeout)
        }
      }
      delay()
    }
  },
  /**
   * execute a number of callbacks (with an upper limit of max) then set
   * status to waiting for the given timeout time period... all attempts to
   * execute the callback while the status is waiting will be added to the
   * callback queue and will wait until the queue has executed all other
   * callbacks given the same maximum upper limit...
   */
  dribble: <T, X>(
    max: number,
    timeout: number,
    cb: (...args: T[]) => Promise<X>
  ) => {
    if (max < 1) throw new Error('Dribble max can not be less than 1')
    let waiting = false
    let queue: Array<() => void> = []
    return (...args: T[]): Promise<X> => {
      const go = () => {
        if (waiting) return
        waiting = true
        const tasks = queue.slice(0, max)
        queue = queue.slice(max, queue.length)
        for (const task of tasks) task()
        setTimeout(() => {
          waiting = false
          if (queue.length) go()
        }, timeout)
      }
      return new Promise<X>((resolve, reject) => {
        queue.push(() => resolve(cb(...args)))
        try {
          go()
        } catch (error) {
          reject(error)
        }
      })
    }
  },
  /**
   * execute callback then set status to unavailable for the allocated
   * timeout time period... all attempts to execute the callback while the
   * status is unavailable will be ignored...
   */
  halter: <T>(timeout: number, cb: (...args: T[]) => void) => {
    let available = true
    return (...args: T[]) => {
      if (available) {
        cb(...args)
        available = false
        setTimeout(() => {
          available = true
        }, timeout)
      }
    }
  },
}
