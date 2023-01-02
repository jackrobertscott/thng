window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {isDisabled: true}
import './index.css'
import 'material-icons/iconfont/outlined.css'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'
import {createRoot} from 'react-dom/client'
import {createElement as $} from 'react'
import {CmpApp} from './cmps/CmpApp'
import {CmpPrvThm} from './cmps/CmpPrv/CmpPrvThm'
import {CmpPrvHep} from './cmps/CmpPrv/CmpPrvHep'
import {CmpPrvTst} from './cmps/CmpPrv/CmpPrvTst'
/**
 *
 */
const app = $(CmpPrvThm, {
  ele: $(CmpPrvHep, {
    ele: $(CmpPrvTst, {
      ele: $(CmpApp),
    }),
  }),
})
/**
 *
 */
createRoot(document.getElementById('root')!).render(app)
