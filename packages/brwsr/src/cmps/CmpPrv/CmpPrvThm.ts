import {THM} from '@/consts/THM'
import {CtxThm} from '@/ctxs/CtxThm'
import {createElement as $, FC, ReactNode} from 'react'
/**
 *
 */
export const CmpPrvThm: FC<{
  ele: ReactNode
  val?: typeof THM
}> = ({ele, val: value}) => {
  return $(CtxThm.Provider, {
    children: ele,
    value: value ?? THM,
  })
}
