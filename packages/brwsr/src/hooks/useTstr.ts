import {useContext} from 'react'
import {CtxTstr} from '../ctxs/CtxTstr'
/**
 *
 */
export const useTstr = () => {
  return useContext(CtxTstr)
}
