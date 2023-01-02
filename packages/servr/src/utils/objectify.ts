/**
 *
 */
export const objectify = {
  /**
   *
   */
  pick<X extends Record<string, any>, Y extends keyof X>(
    obj: X,
    keys: Y[]
  ): Pick<X, Y> {
    return Object.keys(obj).reduce((all: any, key: any) => {
      if (keys.includes(key)) all[key] = obj[key]
      return all
    }, {})
  },
  /**
   *
   */
  omit<X extends Record<string, any>, Y extends keyof X>(
    obj: X,
    keys: Y[]
  ): Omit<X, Y> {
    return Object.keys(obj).reduce((all: any, key: any) => {
      if (!keys.includes(key)) all[key] = obj[key]
      return all
    }, {})
  },
  /**
   *
   */
  sortKeys(obj: object) {
    return Object.entries(obj)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, _value]) => {
        const value: any =
          _value && typeof _value === 'object' ? this.sortKeys(_value) : _value
        return [key, value]
      })
      .reduce((all: any, next) => {
        all[next[0]] = next[1]
        return all
      }, {})
  },
  /**
   *
   */
  compare: (a: object = {}, b: object = {}) => {
    const _a = objectify.sortKeys(a)
    const _b = objectify.sortKeys(b)
    return JSON.stringify(_a) === JSON.stringify(_b)
  },
  /**
   *
   */
  compareKeys<
    A extends Record<string, any>,
    B extends Partial<A>,
    K extends keyof A
  >(a: A, b: B, keys: K[]) {
    const _a = this.sortKeys(this.pick(a, keys))
    const _b = this.sortKeys(this.pick(b, keys))
    return JSON.stringify(_a) === JSON.stringify(_b)
  },
  /**
   *
   */
  clone<T extends object>(a: T): T {
    return JSON.parse(JSON.stringify(a))
  },
  /**
   *
   */
  insert(target: any, path: string | string[], value: any) {
    if (typeof target === 'undefined') target = undefined
    else if (typeof target !== 'object') throw new Error()
    const [step, ...rest] = Array.isArray(path) ? path : path.split('.')
    if (!step) throw new Error()
    if (!rest.length) target = {...target, [step]: value}
    else
      target = {
        ...target,
        [step]: this.insert(target?.[step] ?? {}, rest.join('.'), value),
      }
    return target
  },
  /**
   *
   */
  extract(target: any, path: string | string[]): any | undefined {
    if (typeof target === 'undefined') return undefined
    else if (typeof target !== 'object') throw new Error()
    const [step, ...rest] = Array.isArray(path) ? path : path.split('.')
    if (!step) throw new Error()
    if (!rest.length) return target[step]
    return this.extract(target[step], rest)
  },
}
