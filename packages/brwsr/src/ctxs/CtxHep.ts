import {createContext, MutableRefObject} from 'react'
/**
 *
 */
export type TypCtxHep = {
  ref?: MutableRefObject<string[]>
  disabledRef?: MutableRefObject<boolean>
}
/**
 *
 */
export const CtxHep = createContext<TypCtxHep>({})
