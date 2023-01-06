import {useThm} from '@/hooks/useThm'
import {css} from '@emotion/css'
import {createElement as $, FC, ReactNode} from 'react'
/**
 *
 */
export const CmpGrd: FC<{
  bdr?: boolean
  grw?: boolean
  dir?: 'row' | 'column'
  chdrn: ReactNode
}> = ({bdr, grw, dir = 'column', chdrn}) => {
  const thm = useThm()
  return $('div', {
    children: chdrn,
    className: css({
      flexShrink: 0,
      flexDirection: dir,
      flexGrow: grw ? 1 : undefined,
      border: bdr ? thm.bdr.thck : undefined,
      '& > *:not(:last-child)':
        dir === 'row'
          ? {borderRight: thm.bdr.thck}
          : {borderBottom: thm.bdr.thck},
    }),
  })
}
