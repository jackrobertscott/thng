import {createElement as $, FC} from 'react'
import {css} from '@emotion/css'
/**
 *
 */
export const CmpIcn: FC<{
  icn: string
  mul?: number
  ani?: string
  rot?: number
}> = ({icn, mul = 1.2, ani, rot}) => {
  return $('div', {
    className: css({
      width: '1em',
      height: '1.5em',
      cursor: 'default',
      pointerEvents: 'none',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }),
    children: $('span', {
      children: icn,
      className: css({
        animation: ani,
        fontSize: `${mul}em`,
        transform: rot ? `rotate(${rot}deg)` : undefined,
      }).concat(' material-icons-outlined'),
    }),
  })
}
