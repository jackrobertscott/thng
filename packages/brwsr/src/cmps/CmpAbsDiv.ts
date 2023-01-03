import {createElement as $, FC, ReactNode, useEffect, useRef} from 'react'
import {watch} from '@/utils/watch'
import {css} from '@emotion/css'
import {useZidx} from '@/hooks/useZidx'
import {CmpPort} from './CmpPort'
/**
 *
 */
export const CmpAbsDiv: FC<{
  box: DOMRect
  ele: ReactNode
  clkOut?: (unfocused: boolean) => void
}> = ({box, ele, clkOut}) => {
  const zidx = useZidx()
  const ref = useRef<HTMLElement>()
  const unfRef = useRef(true)
  useEffect(() => {
    zidx.on()
    return () => zidx.off()
  }, [])
  useEffect(() => {
    return watch.document({
      mousedown: () => {
        const el = ref.current?.querySelector(':focus-within')
        unfRef.current = !el || el === document.parentElement
      },
      click: (event) =>
        clkOut &&
        zidx.top() &&
        ref.current &&
        event.target instanceof HTMLElement &&
        !ref.current.contains(event.target) &&
        clkOut(unfRef.current),
    })
  }, [box])
  return $(CmpPort, {
    ele: $('div', {
      ref,
      children: ele,
      className: css({
        top: box.top,
        left: box.left,
        width: box.width,
        height: box.height,
        position: 'absolute',
      }),
    }),
  })
}
