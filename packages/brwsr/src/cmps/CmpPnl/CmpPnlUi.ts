import {useGlb} from '@/hooks/useGlb'
import {useThm} from '@/hooks/useThm'
import {css} from '@emotion/css'
import {createElement as $, FC} from 'react'
/**
 *
 */
export const CmpPnlUi: FC<{}> = ({}) => {
  const thm = useThm()
  const glb = useGlb()
  return $('div', {
    className: css({
      flexGrow: 1,
      border: thm.bdr.thck,
      height: '100%',
    }),
    children: JSON.stringify(glb.prjCur),
  })
}
