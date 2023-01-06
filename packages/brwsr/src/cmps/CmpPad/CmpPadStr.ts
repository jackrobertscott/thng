import {createElement as $, FC} from 'react'
import {css} from '@emotion/css'
import {indent} from '@/utils/indent'
import {addkey} from '@/utils/addkey'
import {useThm} from '@/hooks/useThm'
import {TypFCProps} from '@/utils/props'
import {CmpCptrStr} from '../CmpCptrStr'
import {TypHSLA} from '@/utils/hsla'
import {CmpIcn} from '../CmpIcn'
/**
 *
 */
export const CmpPadStr: FC<
  TypFCProps<typeof CmpCptrStr> & {
    icn?: string
    clr?: TypHSLA
    bgd?: TypHSLA
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
      gap: thm.pad.box,
      flexGrow: hug ? undefined : 1,
      padding: indent(thm.pad.box),
      cursor: props.dis ? 'default' : undefined,
      userSelect: props.dis ? 'none' : undefined,
      color: clr ? clr.normal : thm.fc.maj.normal,
      background: bgd ? bgd.normal : thm.bg.maj.normal,
      '&:focus-within': {color: clr?.normal ?? thm.fc.maj.normal},
      '*::placeholder': {color: thm.fc.plchldr.normal},
    }),
    children: addkey([
      icn &&
        $(CmpIcn, {
          icn: icn,
        }),
      $(CmpCptrStr, {
        ...props,
      }),
    ]),
  })
}
