import {DOM_VOID_TAGS} from '@/consts/DOM'
/**
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="UTF-8" />
 *     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
 *     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 *     <title>thng</title>
 *   </head>
 *   <body style="color: #000; background: #000;">
 *     <div id="root"></div>
 *     <div id="port"></div>
 *     <script type="module" src="/src/index.ts"></script>
 *   </body>
 * </html>
 */
export const genFileHyp = () => {
  const root: HypNod = {
    tag: 'html',
    prpObj: {lang: 'en'},
    chdArr: [
      {
        tag: 'head',
        chdArr: [
          {tag: 'meta', prpObj: {charset: 'UTF-8'}},
          {
            tag: 'link',
            prpObj: {rel: 'icon', type: 'image/svg+xml', href: '/vite.svg'},
          },
          {
            tag: 'meta',
            prpObj: {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1.0',
            },
          },
          {tag: 'title', chdArr: ['thng']},
        ],
      },
      {
        tag: 'body',
        chdArr: [
          {tag: 'div', prpObj: {id: 'root'}},
          {tag: 'div', prpObj: {id: 'port'}},
          {tag: 'script', prpObj: {type: 'module', src: '/src/index.ts'}},
        ],
      },
    ],
  }
  return '<!DOCTYPE html>' + txtHypNod(root)
}
/**
 *
 */
const txtHypNod = (nod: HypNod | string, lvl = 0) => {
  // handle plain text node
  if (typeof nod === 'string')
    if (nod.length > 100) return nod + '\n'
    else return nod
  // handle bracketed node
  let str = '<' + nod.tag
  const prpArr = Object.entries(nod.prpObj ?? {})
  for (const [key, val] of prpArr) str += ` ${key}="${val}"`
  if (nod.chdArr?.length) {
    str += '>'
    // determine children text length
    const chdStrArr: string[] = []
    for (const chd of nod.chdArr) chdStrArr.push(txtHypNod(chd, lvl + 1))
    const chdStr = chdStrArr.join('')
    if (chdStr.length > 50) {
      // text length is large so format multi-line
      for (const chd of chdStrArr) str += '\n' + '  '.repeat(lvl + 1) + chd
      str += '\n' + '  '.repeat(lvl) + '</' + nod.tag + '>'
    } else {
      // text length is short so format inline
      str += chdStr
      str += '</' + nod.tag + '>'
    }
  } else if (DOM_VOID_TAGS.includes(nod.tag)) {
    // only void tags are self-closing
    str += ' />'
  } else str += '></' + nod.tag + '>'
  return str
}

/**
 *
 */
type HypNod = {
  tag: string
  chdArr?: Array<HypNod | string>
  prpObj?: Record<string, string>
}
