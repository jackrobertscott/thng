import {addkeys} from '@/utils/addkeys'
import {css} from '@emotion/css'
import {
  createElement as $,
  FC,
  Fragment,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import {CmpAbsDiv} from './CmpAbsDiv'
/**
 *
 */
export const CmpPop: FC<{
  grw?: boolean
  ini?: boolean
  eleWrp: (open: () => void) => ReactNode
  elePop: (exit: () => void) => ReactNode
}> = ({grw, ini, eleWrp, elePop}) => {
  const ref = useRef<HTMLElement>()
  const [box, boxSet] = useState<DOMRect>()
  const [open, openSet] = useState(ini)
  useEffect(() => {
    if (open) boxSet(ref.current?.getBoundingClientRect())
    else boxSet(undefined)
  }, [open])
  return $(Fragment, {
    children: addkeys([
      $('div', {
        ref,
        children: eleWrp(() => openSet(true)),
        className: css({
          flexGrow: grw ? 1 : undefined,
        }),
      }),
      $(Fragment, {
        children:
          box &&
          open &&
          $(CmpAbsDiv, {
            box,
            ele: elePop(() => openSet(false)),
            clkOut: (unfocused) => {
              if (unfocused) openSet(false)
            },
          }),
      }),
    ]),
  })
}
