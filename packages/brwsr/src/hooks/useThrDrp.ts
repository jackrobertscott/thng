import {useEffect, useRef} from 'react'
import {throttle} from '@/utils/throttle'
/**
 *
 */
export const useThrDrp = <T extends (...args: any[]) => void>(
  timeout: number,
  cb: T
) => {
  const ref = useRef(cb)
  const throttleRef = useRef<T>(cb)
  ref.current = cb
  useEffect(() => {
    throttleRef.current = throttle.drip(timeout, (...i) => {
      return ref.current(...i)
    }) as T
  }, [timeout])
  return throttleRef.current
}
