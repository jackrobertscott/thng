import {addkey} from '@/utils/addkey'
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
  chdrnWrp: (open: () => void) => ReactNode
  chdrnPop: (exit: () => void) => ReactNode
}> = ({grw, ini, chdrnWrp, chdrnPop}) => {
  const ref = useRef<HTMLElement>()
  const [box, boxSet] = useState<DOMRect>()
  const [open, openSet] = useState(ini)
  useEffect(() => {
    if (open) boxSet(ref.current?.getBoundingClientRect())
    else boxSet(undefined)
  }, [open])
  return $(Fragment, {
    children: addkey([
      $('div', {
        ref,
        children: chdrnWrp(() => openSet(true)),
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
            chdrn: chdrnPop(() => openSet(false)),
            clkOut: (unfocused) => {
              if (unfocused) openSet(false)
            },
          }),
      }),
    ]),
  })
}
