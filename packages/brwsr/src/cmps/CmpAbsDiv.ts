import {createElement as $, FC, ReactNode, useEffect, useRef} from 'react'
import {watch} from '@/utils/watch'
import {css} from '@emotion/css'
import {useHep} from '@/hooks/useHep'
import {CmpPrt} from './CmpPrt'
/**
 *
 */
export const CmpAbsDiv: FC<{
  box: DOMRect
  ele: ReactNode
  clkOut?: (unfocused: boolean) => void
}> = ({box, ele, clkOut}) => {
  const hep = useHep()
  const ref = useRef<HTMLElement>()
  const unfRef = useRef(true)
  useEffect(() => {
    hep.on()
    return () => hep.off()
  }, [])
  useEffect(() => {
    return watch.document({
      mousedown: () => {
        const el = ref.current?.querySelector(':focus-within')
        unfRef.current = !el || el === document.parentElement
      },
      click: (event) =>
        clkOut &&
        hep.top() &&
        ref.current &&
        event.target instanceof HTMLElement &&
        !ref.current.contains(event.target) &&
        clkOut(unfRef.current),
    })
  }, [box])
  return $(CmpPrt, {
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
