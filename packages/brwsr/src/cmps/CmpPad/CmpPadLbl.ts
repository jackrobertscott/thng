import {useThm} from '@/hooks/useThm'
import {addkeys} from '@/utils/addkeys'
import {TypeHSLA} from '@/utils/hsla'
import {indent} from '@/utils/indent'
import {css} from '@emotion/css'
import {createElement as $, FC} from 'react'
import {CmpIcn} from '../CmpIcn'
/**
 *
 */
export const CmpPadLbl: FC<{
  icn?: string
  lbl?: string
  grw?: boolean
  clk?: () => void
  ali?: 'left' | 'center' | 'right'
  bgd?: TypeHSLA
  clr?: TypeHSLA
}> = ({icn, lbl, grw, clk, ali, bgd, clr}) => {
  const thm = useThm()
  return $(clk ? 'button' : 'div', {
    onClick: clk,
    className: css({
      textAlign: ali,
      overflow: 'hidden',
      justifyContent:
        ali === 'right' ? 'end' : ali === 'center' ? 'center' : 'start',
      flexDirection: 'row',
      flexShrink: 0,
      flexGrow: grw ? 1 : undefined,
      gap: thm.padding.box,
      padding: indent(thm.padding.box),
      color: clr ? clr.normal : thm.fc.major.normal,
      background: bgd ? bgd.normal : thm.bg.major.normal,
      '&:hover': clk ? {background: thm.bg.major.hover} : undefined,
      '&:active': clk ? {background: thm.bg.major.active} : undefined,
    }),
    children: addkeys([
      icn &&
        $(CmpIcn, {
          icn: icn,
        }),
      lbl &&
        $('span', {
          children: lbl,
        }),
    ]),
  })
}
