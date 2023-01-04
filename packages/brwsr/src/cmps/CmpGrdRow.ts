import {useThm} from '@/hooks/useThm'
import {css} from '@emotion/css'
import {createElement as $, FC, ReactNode} from 'react'
/**
 *
 */
export const CmpGrdRow: FC<{
  chdrn: ReactNode
}> = ({chdrn}) => {
  const thm = useThm()
  return $('div', {
    children: chdrn,
    className: css({
      flexDirection: 'row',
      '& > *:not(:last-child)': {borderRight: thm.bdr.thck},
    }),
  })
}
