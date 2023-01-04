import {THM} from '@/consts/THM'
import {CtxThm} from '@/ctxs/CtxThm'
import {createElement as $, FC, ReactNode} from 'react'
/**
 *
 */
export const CmpPrvThm: FC<{
  chdrn: ReactNode
  val?: typeof THM
}> = ({chdrn, val: value}) => {
  return $(CtxThm.Provider, {
    children: chdrn,
    value: value ?? THM,
  })
}
