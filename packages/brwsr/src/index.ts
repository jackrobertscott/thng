// window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {isDisabled: true}
import './index.css'
import 'material-icons/iconfont/outlined.css'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'
import {createRoot} from 'react-dom/client'
import {createElement as $} from 'react'
import {CmpApp} from './cmps/CmpApp'
import {CmpPrvThm} from './cmps/CmpPrv/CmpPrvThm'
import {CmpPrvZidx} from './cmps/CmpPrv/CmpPrvZidx'
import {CmpPrvTstr} from './cmps/CmpPrv/CmpPrvTstr'
import {CmpPrvGlb} from './cmps/CmpPrv/CmpPrvGlb'
/**
 *
 */
const app = $(CmpPrvThm, {
  ele: $(CmpPrvTstr, {
    ele: $(CmpPrvZidx, {
      ele: $(CmpPrvGlb, {
        ele: $(CmpApp),
      }),
    }),
  }),
})
/**
 *
 */
createRoot(document.getElementById('root')!).render(app)
