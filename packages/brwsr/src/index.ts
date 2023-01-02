import './index.css'
import 'material-icons/iconfont/outlined.css'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'
import {createRoot} from 'react-dom/client'
import {createElement as $} from 'react'
import {CmpApp} from './components/CmpApp'
import {CmpPrvThm} from './components/CmpPrv/CmpPrvThm'
import {CmpPrvBrw} from './components/CmpPrv/CmpPrvBrw'
import {CmpPrvHep} from './components/CmpPrv/CmpPrvHep'
import {CmpPrvTst} from './components/CmpPrv/CmpPrvTst'
import {CmpPrvDrg} from './components/CmpPrv/CmpPrvDrg'
/**
 *
 */
const app = $(CmpPrvThm, {
  ele: $(CmpPrvBrw, {
    ele: $(CmpPrvHep, {
      ele: $(CmpPrvTst, {
        ele: $(CmpPrvDrg, {
          ele: $(CmpApp),
        }),
      }),
    }),
  }),
})
/**
 *
 */
createRoot(document.getElementById('root')!).render(app)
