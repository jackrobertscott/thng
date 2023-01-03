/**
 *
 */
export const GenIdx = () => {
  const txt = `
    import 'material-icons/iconfont/outlined.css'
    import 'whatwg-fetch'
    import 'promise-polyfill/src/polyfill'
    import {createRoot} from 'react-dom/client'
    import {createElement as $} from 'react'
    import {CmpApp} from './cmps/CmpApp'
    /**
     *
     */
    const app = $(CmpApp)
    /**
     *
     */
    createRoot(document.getElementById('root')!).render(app)
  `
  return txt
    .split('\n')
    .map((i) => i.slice(4)) // remove spaces at start
    .filter((i) => i.length)
    .join('\n')
}
