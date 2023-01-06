import {useThm} from '@/hooks/useThm'
import {TypHSLA, hsla} from '@/utils/hsla'
import {watch} from '@/utils/watch'
import {css} from '@emotion/css'
import {createElement as $, FC, useEffect, useRef, useState} from 'react'
/**
 *
 */
export const CmpSldr: FC<{
  val: number | null
  valSet: (val: number) => void
  max?: number
  min?: number
  dcmlCnt?: number
  calcClr?: (pcnt: number) => TypHSLA
  dis?: boolean
}> = ({
  val: _val,
  valSet,
  max = 100,
  min = 0,
  dcmlCnt = 2,
  calcClr = (pcnt) => hsla(0, 0, pcnt),
  dis,
}) => {
  const val = _val || 0
  const thm = useThm()
  const refSldr = useRef<HTMLElement>()
  const [drg, drgSet] = useState(false)
  if (min >= max) throw new Error('Min is less than or equal to max.')
  const calcVal = (xClk: number, xSldr: number, widSldr: number) => {
    const x = Math.round(xClk - xSldr) + thm.bdr.wid
    let nxt = (x * max) / widSldr
    const dcmlPwr = 10 ** dcmlCnt
    nxt = Math.round(nxt * dcmlPwr) / dcmlPwr
    if (nxt < 0) nxt = 0
    if (nxt > max) nxt = max
    return nxt
  }
  useEffect(() => {
    if (!drg) return
    const sldr = refSldr.current
    if (!sldr) return
    const rect = sldr.getBoundingClientRect()
    const hndlMv = (evt: MouseEvent) =>
      !dis && valSet(calcVal(evt.pageX, rect.left, sldr.offsetWidth))
    const hndlStp = () => drgSet(false)
    return watch.document({
      mousemove: hndlMv,
      mouseup: hndlStp,
      mouseleave: hndlStp,
    })
  }, [drg])
  return $('div', {
    ref: refSldr,
    onClick: (evt: MouseEvent) => {
      if (dis) return
      if (!refSldr.current) return
      if (evt.target !== evt.currentTarget) return
      const rect = refSldr.current.getBoundingClientRect()
      valSet(calcVal(evt.pageX, rect.left, refSldr.current.offsetWidth))
    },
    className: css({
      height: 9,
      userSelect: 'none',
      position: 'relative',
      border: thm.bdr.thck,
      background:
        'linear-gradient(to right, ' +
        new Array(11).fill(0).map((_, i) => calcClr((i / 10) * max)) +
        ')',
    }),
    children: $('div', {
      onMouseDown: () => !dis && drgSet(true),
      className: css({
        width: 15,
        height: 15,
        border: thm.bdr.thck,
        background: calcClr(val).normal,
        transform: 'translateX(-50%)',
        cursor: dis || drg ? undefined : 'grab',
        position: 'absolute',
        left: Math.round((val / max) * 100) + '%',
        top: -5,
      }),
    }),
  })
}
