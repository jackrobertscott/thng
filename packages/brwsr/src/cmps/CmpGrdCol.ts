import {useThm} from '@/hooks/useThm'
import {css} from '@emotion/css'
import {createElement as $, FC, ReactNode} from 'react'
/**
 *
 */
export const CmpGrdCol: FC<{
  bdr?: boolean
  children: ReactNode
}> = ({bdr, children}) => {
  const thm = useThm()
  return $('div', {
    children,
    className: css({
      flexDirection: 'column',
      border: bdr ? thm.bdr.thck : undefined,
      '& > *:not(:last-child)': {borderBottom: thm.bdr.thck},
    }),
  })
}
