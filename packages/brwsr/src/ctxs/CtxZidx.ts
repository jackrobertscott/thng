import {createContext, MutableRefObject} from 'react'
/**
 *
 */
export type TypCtxZidx = {
  ref?: MutableRefObject<string[]>
  disabledRef?: MutableRefObject<boolean>
}
/**
 *
 */
export const CtxZidx = createContext<TypCtxZidx>({})
