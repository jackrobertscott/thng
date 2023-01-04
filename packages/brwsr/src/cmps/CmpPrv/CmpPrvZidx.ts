import {CtxZidx} from '@/ctxs/CtxZidx'
import {createElement as $, FC, ReactNode, useRef} from 'react'
/**
 *
 */
export const CmpPrvZidx: FC<{
  chdrn: ReactNode
}> = ({chdrn}) => {
  const ref = useRef<string[]>([])
  const disabledRef = useRef<boolean>(false)
  return $(CtxZidx.Provider, {
    children: chdrn,
    value: {
      ref,
      disabledRef,
    },
  })
}
