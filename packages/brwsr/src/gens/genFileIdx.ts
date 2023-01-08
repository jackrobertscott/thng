/**
 *
 */
export const genFileIdx = () => {
  const txt = `
    import 'material-icons/iconfont/outlined.css'
    import 'whatwg-fetch'
    import 'promise-polyfill/src/polyfill'
    import {createRoot} from 'react-dom/client'
    import {createElement as $} from 'react'
    import {GenApp} from './cmps/GenApp'
    /**
     *
     */
    const app = $(GenApp)
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
