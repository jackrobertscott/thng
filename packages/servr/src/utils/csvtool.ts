/**
 *
 */
const defaultOptions = {
  header: true,
  escape: '"',
  quote: '"',
  break: '\n',
  comma: ',',
}
/**
 *
 */
export type TypeCSVParseOptions = typeof defaultOptions
/**
 * https://en.wikipedia.org/wiki/Comma-separated_values#Basic_rules
 */
export const csvtool = {
  /**
   *
   */
  parseBuffer(buffer: Buffer, options: Partial<TypeCSVParseOptions> = {}) {
    options = Object.assign({}, defaultOptions, options)
    const text = buffer.toString()
    const rowArray = csvtool.parseRowArray(text, options)
    const objectArray: Array<Record<string, string>> = []
    const headerArray: Array<string> = options.header
      ? rowArray[0]
      : rowArray[0].map((_, index) => index.toString())
    for (let i = options.header ? 1 : 0; i < rowArray.length; i++) {
      const row = rowArray[i]
      if (row.length !== headerArray.length) {
        const message = `Expected row ${i} of CSV to have length ${headerArray.length} but got length ${row.length}.`
        throw new Error(message)
      }
      const value = headerArray.reduce((all, key, index) => {
        all[key] = row[index]
        return all
      }, {} as Record<string, string>)
      objectArray.push(value)
    }
    return {
      objectArray,
      headerArray,
    }
  },
  /**
   *
   */
  parseHeaderArray(buffer: Buffer, options: Partial<TypeCSVParseOptions> = {}) {
    options = Object.assign({}, defaultOptions, options)
    const text = buffer.toString('utf-8', 0, 1e4)
    const rowArray = csvtool.parseRowArray(text, options, true)
    if (rowArray.length > 1) throw new Error()
    const headerArray: Array<string> = options.header
      ? rowArray[0]
      : rowArray[0].map((_, index) => index.toString())
    return headerArray
  },
  /**
   *
   */
  parseRowArray(
    text: string,
    options: Partial<TypeCSVParseOptions> = {},
    headerOnly: boolean = false
  ) {
    options = Object.assign({}, defaultOptions, options)
    const rowArray: Array<string[]> = [[]]
    let char: string
    let next: string
    let isQuote = false
    let token = ''
    let rowIndex = 0
    for (let i = 0; i < text.length; i++) {
      char = text[i]
      next = text[i + 1]
      if (isQuote) {
        if (char === options.escape && next === options.quote) {
          token += options.quote
          i += 1
          continue
        }
        if (char === options.quote) {
          isQuote = !isQuote
          continue
        }
        token += char
        continue
      }
      if (char === options.quote && !isQuote) {
        isQuote = !isQuote
        continue
      }
      if (char === options.comma) {
        rowArray[rowIndex].push(token)
        token = ''
        continue
      }
      if (char === options.break) {
        rowArray[rowIndex].push(token)
        token = ''
        rowIndex += 1
        rowArray[rowIndex] = []
        if (headerOnly) break
        continue
      }
      token += char
    }
    if (token.length) {
      rowArray[rowIndex].push(token)
    }
    if (rowArray[rowIndex].length === 0 && rowArray[0].length !== 0) {
      rowArray.pop()
    }
    return rowArray
  },
}
