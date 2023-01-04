import {CtxGlb} from '@/ctxs/CtxGlb'
import {useContext} from 'react'
/**
 *
 */
export const useGlb = () => {
  return useContext(CtxGlb)
}
