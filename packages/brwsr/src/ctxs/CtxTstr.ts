import {contextNoop} from '@/utils/context'
import {createContext} from 'react'
/**
 *
 */
export type TypTstr = {
  id: string
  txt: string
  type: 'normal' | 'error'
  exit: () => void
}
/**
 *
 */
export type TypCtxTstr = {
  tstrArr: TypTstr[]
  notif: (txt: string, time?: number) => void
  error: (txt: string) => void
  missing: (name: string) => void
}
/**
 *
 */
export const CtxTstr = createContext<TypCtxTstr>({
  tstrArr: [],
  notif: contextNoop('notify'),
  error: contextNoop('error'),
  missing: contextNoop('missing'),
})
