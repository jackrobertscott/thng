import {useContext, useState} from 'react'
import {random} from '@/utils/random'
import {CtxZidx} from '../ctxs/CtxZidx'
/**
 *
 */
export const useZidx = () => {
  const {ref, disabledRef} = useContext(CtxZidx)
  const [id] = useState(() => random.string())
  return {
    top: () => {
      const value =
        !disabledRef?.current &&
        ref?.current &&
        ref.current[ref.current.length - 1] === id
      return value
    },
    on: () => {
      if (ref?.current && !ref.current.includes(id)) ref.current.push(id)
    },
    off: () => {
      if (ref?.current && ref.current.includes(id))
        ref.current = ref.current.filter((i) => i !== id)
    },
    disable() {
      if (disabledRef?.current) disabledRef.current = true
    },
    enable() {
      if (disabledRef?.current) disabledRef.current = false
    },
    size() {
      return ref?.current.length ?? 0
    },
  }
}
