import {CtxGlb, TypCtxGlb, TypPrj} from '@/ctxs/CtxGlb'
import {useLcl} from '@/hooks/useLcl'
import {createElement as $, FC, ReactNode} from 'react'
/**
 *
 */
export const CmpPrvGlb: FC<{
  chdrn: ReactNode
}> = ({chdrn}) => {
  const [prjArr, prjArrSet] = useLcl<TypPrj[]>('prjArr', [])
  const [prjCurId, prjCurIdSet] = useLcl<string | undefined>('prjCurId')
  const prjCur = prjArr.find((i) => i.id === prjCurId)
  const value: TypCtxGlb = {
    prjArr,
    prjCur,
    prjCurIdSet,
    prjSet: (i) => {
      prjArrSet(
        prjArr.find((j) => j.id === i.id)
          ? prjArr.map((j) => (j.id === i.id ? i : j))
          : [...prjArr, i]
      )
    },
  }
  return $(CtxGlb.Provider, {
    children: chdrn,
    value,
  })
}
