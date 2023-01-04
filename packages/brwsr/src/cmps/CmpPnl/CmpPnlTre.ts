import {createElement as $, FC, ReactNode, useState} from 'react'
import {CmpGrdCol} from '../CmpGrdCol'
import {addkey} from '@/utils/addkey'
import {CmpPadLab} from '../CmpPad/CmpPadLab'
import {random} from '@/utils/random'
import {CmpGrdRow} from '../CmpGrdRow'
import {useLcl} from '@/hooks/useLcl'
/**
 *
 */
export const CmpPnlTre: FC<{}> = ({}) => {
  const [nod, nodSet] = useLcl<TypNod>('expNod')
  return $(CmpGrdCol, {
    bdr: true,
    chdrn: nod
      ? nod2Tre(nod)
      : $(CmpPadLab, {
          lab: 'Add Node',
          clk: () => nodSet({id: random.string(), tagId: 'div', prpObj: {}}),
        }),
  })
}
/**
 *
 */
const nod2Tre = (nod: TypNod): ReactNode => {
  const tagArr = [tagDiv]
  const tagCur = tagArr.find((i) => i.id === nod.tagId)
  if (!tagCur) return null // no tag found
  return $(CmpGrdCol, {
    chdrn: addkey([
      $(CmpPadLab, {
        lab: tagCur.lab,
      }),
      $(CmpGrdRow, {
        chdrn: addkey([
          $(CmpPadLab, {icn: 'subdirectory_arrow_right'}),
          $(CmpGrdCol, {
            grw: true,
            chdrn: tagCur.prpArr.map((prp) => {
              return $(CmpGrdRow, {
                chdrn: addkey([
                  $(CmpPadLab, {lab: prp.lab}),
                  $(CmpPadLab, {lab: prp.typ, grw: true}), // todo: replace with input
                ]),
              })
            }),
          }),
        ]),
      }),
    ]),
  })
}
/**
 *
 */
export type TypNod = {
  id: string
  tagId: string
  prpObj: Record<string, any>
}
/**
 *
 */
type TypTag = {
  id: string
  lab: string
  prpArr: Array<{
    typ: string
    lab: string
  }>
}
/**
 *
 */
const tagDiv: TypTag = {
  id: 'div',
  lab: 'Div',
  prpArr: [
    {typ: 'string', lab: 'id'},
    {typ: 'string', lab: 'className'},
    {typ: 'children', lab: 'children'},
  ],
}
