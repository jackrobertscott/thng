import {regex} from './regex'
import {sanitize} from './sanitize'
/**
 *
 */
export const csval = {
  /**
   *
   */
  date(value?: string) {
    if (!this.exists(value)) return undefined
    return new Date(value).toISOString()
  },
  /**
   *
   */
  string(value?: string) {
    if (!this.exists(value)) return undefined
    return value.trim()
  },
  /**
   *
   */
  multiline(value?: string) {
    if (!this.exists(value)) return undefined
    return value
      .trim()
      .split('<br/>')
      .join('\n')
      .split('\n')
      .map((i) => i.trim())
      .filter((i) => i.length)
      .join('\n')
  },
  /**
   *
   */
  enum(value?: string) {
    if (!this.exists(value)) return undefined
    return value
      .toUpperCase()
      .split(' ')
      .filter((i) => i.length)
      .join('')
  },
  /**
   *
   */
  html(value?: string) {
    if (!this.exists(value)) return undefined
    return sanitize(value).trim()
  },
  /**
   *
   */
  number(value?: string) {
    if (!this.exists(value)) return undefined
    if (isNaN(+value)) return undefined
    return +value
  },
  /**
   *
   */
  boolean(value?: string) {
    if (!this.exists(value)) return undefined
    if (value.trim().toUpperCase() === 'TRUE' || value === '1') return true
    return false
  },
  /**
   *
   */
  stringArray(value?: string) {
    if (!this.exists(value)) return undefined
    return value
      .split(',')
      .join(' ')
      .split(' ')
      .filter((i) => i.length)
  },
  /**
   *
   */
  emailArray(value?: string) {
    return csval
      .stringArray(value)
      ?.filter((i, index, a) => i && !a.slice(0, index).includes(i))
      .filter((i) => regex.email().test(i))
  },
  /**
   *
   */
  exists(value?: string): value is string {
    return (
      value !== undefined &&
      value.trim().toUpperCase() !== 'NULL' &&
      value.trim() !== ''
    )
  },
}
