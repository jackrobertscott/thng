import {useThm} from '@/hooks/useThm'
import {css} from '@emotion/css'
import {createElement as $, FC, ReactNode} from 'react'
/**
 *
 */
export const CmpGrdCol: FC<{
  bdr?: boolean
  grw?: boolean
  chdrn: ReactNode
}> = ({bdr, grw, chdrn}) => {
  const thm = useThm()
  return $('div', {
    children: chdrn,
    className: css({
      flexDirection: 'column',
      flexGrow: grw ? 1 : undefined,
      border: bdr ? thm.bdr.thck : undefined,
      '& > *:not(:last-child)': {borderBottom: thm.bdr.thck},
    }),
  })
}
