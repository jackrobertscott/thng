import {useContext} from 'react'
import {CtxTst} from '../contexts/CtxTst'
/**
 *
 */
export const useTst = () => {
  return useContext(CtxTst)
}
