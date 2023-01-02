import {contextNoop} from '@/utils/context'
import {createContext} from 'react'
/**
 *
 */
export type TypTst = {
  id: string
  message: string
  type: 'normal' | 'error'
  remove: () => void
}
/**
 *
 */
export type TypCtxTst = {
  toastArray: TypTst[]
  notify: (message: string, time?: number) => void
  error: (message: string) => void
  missing: (fieldName: string) => void
}
/**
 *
 */
export const CtxTst = createContext<TypCtxTst>({
  toastArray: [],
  notify: contextNoop('notify'),
  error: contextNoop('error'),
  missing: contextNoop('missing'),
})
