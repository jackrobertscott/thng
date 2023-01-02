import {CtxHep} from '@/ctxs/CtxHep'
import {createElement as $, FC, ReactNode, useRef} from 'react'
/**
 *
 */
export const CmpPrvHep: FC<{
  ele: ReactNode
}> = ({ele}) => {
  const ref = useRef<string[]>([])
  const disabledRef = useRef<boolean>(false)
  return $(CtxHep.Provider, {
    children: ele,
    value: {
      ref,
      disabledRef,
    },
  })
}
