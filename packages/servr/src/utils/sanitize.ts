import createPurify from 'dompurify'
import {JSDOM} from 'jsdom'
/**
 *
 */
const window = new JSDOM().window as any
const purify = createPurify(window)
/**
 *
 */
export const sanitize = (html: string) => {
  return purify.sanitize(html)
}
