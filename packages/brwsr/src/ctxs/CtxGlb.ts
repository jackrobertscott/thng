import {TypNod} from '@/cmps/CmpPnl/CmpPnlTre'
import {contextNoop} from '@/utils/context'
import {createContext} from 'react'
/**
 *
 */
export type TypPrj = {
  id: string
  lab?: string
  fldrPth?: string
  nod?: TypNod
}
/**
 *
 */
export type TypCtxGlb = {
  prjArr: TypPrj[]
  prjCur?: TypPrj
  prjCurIdSet: (id: string | undefined) => void
  prjSet: (prj: TypPrj) => void
}
/**
 *
 */
export const CtxGlb = createContext<TypCtxGlb>({
  prjArr: [],
  prjCurIdSet: contextNoop('prjCurIdSet'),
  prjSet: contextNoop('prjSet'),
})
