export const random = {
  /**
   *
   */
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  numeric: '0123456789'.split(''),
  get alphanumeric() {
    return [...this.alpha, ...this.numeric]
  },
  /**
   *
   */
  string(length: number) {
    let value = ''
    const max = this.alphanumeric.length
    for (let i = 0; i < length; i++) {
      let q = Math.floor(Math.random() * max)
      value += this.alphanumeric[q]
    }
    return value
  },
  /**
   *
   */
  numberString(length: number) {
    let value = ''
    const max = this.numeric.length
    for (let i = 0; i < length; i++) {
      let q = Math.floor(Math.random() * max)
      value += this.numeric[q]
    }
    return value
  },
  /**
   *
   */
  id() {
    return this.string(24)
  },
}
