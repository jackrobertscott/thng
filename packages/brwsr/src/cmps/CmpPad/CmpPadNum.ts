import {createElement as $, FC} from 'react'
import {css} from '@emotion/css'
import {indent} from '@/utils/indent'
import {addkeys} from '@/utils/addkeys'
import {useThm} from '@/hooks/useThm'
import {TypeFCProps} from '@/utils/props'
import {TypeHSLA} from '@/utils/hsla'
import {CmpIcn} from '../CmpIcn'
import {CmpCptNum} from '../CmpCptNum'
/**
 *
 */
export const CmpPadNum: FC<
  TypeFCProps<typeof CmpCptNum> & {
    icn?: string
    clr?: TypeHSLA
    bgd?: TypeHSLA
    wid?: number
    hug?: boolean
  }
> = ({icn, clr, bgd, wid, hug, ...props}) => {
  const thm = useThm()
  return $('div', {
    onClick: (event: MouseEvent) =>
      event.currentTarget instanceof HTMLElement &&
      event.currentTarget.querySelector('input')?.focus(),
    className: css({
      width: wid,
      flexDirection: 'row',
      gap: thm.padding.box,
      flexGrow: hug ? undefined : 1,
      padding: indent(thm.padding.box),
      cursor: props.dis ? 'default' : undefined,
      userSelect: props.dis ? 'none' : undefined,
      color: clr ? clr.normal : thm.fc.major.normal,
      background: bgd ? bgd.normal : thm.bg.major.normal,
      '&:focus-within': {color: clr?.normal ?? thm.fc.major.normal},
      '*::placeholder': {color: thm.fc.placeholder.normal},
    }),
    children: addkeys([
      icn &&
        $(CmpIcn, {
          icn: icn,
        }),
      $(CmpCptNum, {
        ...props,
      }),
    ]),
  })
}
