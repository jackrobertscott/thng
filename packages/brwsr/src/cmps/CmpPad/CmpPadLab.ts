import {useThm} from '@/hooks/useThm'
import {addkey} from '@/utils/addkey'
import {TypHSLA} from '@/utils/hsla'
import {indent} from '@/utils/indent'
import {css} from '@emotion/css'
import {createElement as $, FC} from 'react'
import {CmpIcn} from '../CmpIcn'
/**
 *
 */
export const CmpPadLab: FC<{
  icn?: string
  lab?: string
  grw?: boolean
  clk?: () => void
  ali?: 'left' | 'center' | 'right'
  bgd?: TypHSLA
  clr?: TypHSLA
}> = ({icn, lab, grw, clk, ali, bgd, clr}) => {
  const thm = useThm()
  return $(clk ? 'button' : 'div', {
    onClick: clk,
    className: css({
      textAlign: ali,
      overflow: 'hidden',
      userSelect: 'none',
      justifyContent:
        ali === 'right' ? 'end' : ali === 'center' ? 'center' : 'start',
      flexDirection: 'row',
      flexShrink: 0,
      flexGrow: grw ? 1 : undefined,
      gap: thm.pad.box,
      padding: indent(thm.pad.box),
      color: clr ? clr.normal : thm.fc.maj.normal,
      background: bgd ? bgd.normal : thm.bg.maj.normal,
      '&:hover': clk ? {background: thm.bg.maj.hover} : undefined,
      '&:active': clk ? {background: thm.bg.maj.active} : undefined,
    }),
    children: addkey([
      icn &&
        $(CmpIcn, {
          icn: icn,
        }),
      lab &&
        $('span', {
          children: lab,
        }),
    ]),
  })
}
