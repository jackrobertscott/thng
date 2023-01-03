import {CtxZidx} from '@/ctxs/CtxZidx'
import {createElement as $, FC, ReactNode, useRef} from 'react'
/**
 *
 */
export const CmpPrvZidx: FC<{
  ele: ReactNode
}> = ({ele}) => {
  const ref = useRef<string[]>([])
  const disabledRef = useRef<boolean>(false)
  return $(CtxZidx.Provider, {
    children: ele,
    value: {
      ref,
      disabledRef,
    },
  })
}
