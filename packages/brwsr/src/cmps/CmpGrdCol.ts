import {useThm} from '@/hooks/useThm'
import {css} from '@emotion/css'
import {createElement as $, FC, ReactNode} from 'react'
/**
 *
 */
export const CmpGrdCol: FC<{
  bdr?: boolean
  grw?: boolean
  children: ReactNode
}> = ({bdr, grw, children}) => {
  const thm = useThm()
  return $('div', {
    children,
    className: css({
      flexDirection: 'column',
      flexGrow: grw ? 1 : undefined,
      border: bdr ? thm.bdr.thck : undefined,
      '& > *:not(:last-child)': {borderBottom: thm.bdr.thck},
    }),
  })
}
