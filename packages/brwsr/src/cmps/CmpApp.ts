import {useThm} from '@/hooks/useThm'
import {css} from '@emotion/css'
import {createElement as $, FC} from 'react'
/**
 *
 */
export const CmpApp: FC<{}> = ({}) => {
  const thm = useThm()
  return $('div', {
    className: css({
      flexGrow: 1,
      width: '100%',
      overflow: 'auto',
      background: thm.bg.root.normal,
    }),
    children: 'Hello world',
  })
}
