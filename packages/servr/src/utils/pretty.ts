/**
 *
 */
export const pretty = {
  /**
   *
   */
  date(value: string | undefined, showTime: boolean = true) {
    if (!value) return undefined
    return new Date(value).toLocaleString('en-au', {
      dateStyle: 'short',
      timeStyle: showTime ? 'short' : undefined,
    })
  },
  /**
   *
   */
  money(value?: number, dollar: boolean = true) {
    if (!value) return (dollar ? '$' : '') + 0
    let i = Math.trunc(value * 1000).toLocaleString()
    i = i.slice(0, i.length - 4) + '.' + i.slice(i.length - 3, i.length - 1)
    return (dollar ? '$' : '') + i
  },
  /**
   *
   */
  boolean(value?: boolean) {
    return value ? 'Yes' : 'No'
  },
  /**
   *
   */
  index(index: number, skip: number = 0) {
    return index + skip + 1 + ''
  },
  /**
   *
   */
  shorten(value?: string, length: number = 2 ** 8) {
    if (!value) return undefined
    const suffix = value.length > length ? '...' : ''
    return value.slice(0, length) + suffix
  },
  /**
   *
   */
  fullname(data: {firstName?: string; lastName?: string} = {}) {
    return [data.firstName, data.lastName]
      .filter((i) => i)
      .join(' ')
      .trim()
  },
  /**
   *
   */
  phoneMobile(data: {phone?: string; mobile?: string} = {}) {
    if (data.phone === data.mobile) return data.phone
    return [data.phone, data.mobile].filter((i) => i).join('\n')
  },
  /**
   *
   */
  html2Text(value?: string) {
    if (!value) return undefined
    return value.replace(/<[^>]+>/g, '')
  },
}
