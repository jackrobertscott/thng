import {useGlb} from '@/hooks/useGlb'
import {useThm} from '@/hooks/useThm'
import {css} from '@emotion/css'
import {createElement as $, FC, Fragment} from 'react'
import {TAG_ARR, TypNod} from './CmpPnlTre'
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
    children:
      glb.prjCur?.nod &&
      $(RndrNod, {
        nod: glb.prjCur.nod,
      }),
  })
}
/**
 *
 */
const RndrNod: FC<{nod: TypNod}> = ({nod}) => {
  const tag = TAG_ARR.find((i) => i.id === nod.tagId)
  if (!tag) return null
  return $(tag.val, {
    children: nod.id,
  })
}
