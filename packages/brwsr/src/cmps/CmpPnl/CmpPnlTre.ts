import {createElement as $, FC, useState} from 'react'
import {CmpGrd} from '../CmpGrd'
import {addkey} from '@/utils/addkey'
import {CmpPadLab} from '../CmpPad/CmpPadLab'
import {random} from '@/utils/random'
import {CmpPadStr} from '../CmpPad/CmpPadStr'
import {CmpPadNum} from '../CmpPad/CmpPadNum'
import {useGlb} from '@/hooks/useGlb'
/**
 *
 */
export const CmpPnlTre: FC<{}> = ({}) => {
  // const [nod, nodSet] = useLcl<TypNod | undefined>('expNod')
  const glb = useGlb()
  if (!glb.prjCur) {
    return $('div', {
      children: 'Please select a project to get started.',
    })
  }
  return $(CmpGrd, {
    bdr: true,
    grw: true,
    chdrn: glb.prjCur.nod
      ? $(CmpNod2Tre, {
          nod: glb.prjCur.nod,
          nodSet: (nod) => glb.prjCur && glb.prjSet({...glb.prjCur, nod}),
        })
      : $(CmpPadLab, {
          lab: 'Add Node',
          clk: () =>
            glb.prjCur &&
            glb.prjSet({
              ...glb.prjCur,
              nod: {id: random.string(), tagId: 'div', prpObj: {}},
            }),
        }),
  })
}
/**
 *
 */
const CmpNod2Tre: FC<{
  nod: TypNod
  nodSet: (nod?: TypNod) => void
}> = ({nod, nodSet}) => {
  const tagCur = TAG_ARR.find((i) => i.id === nod.tagId)
  const [opn, opnSet] = useState(true)
  if (!tagCur) return null // no tag found
  return $(CmpGrd, {
    chdrn: addkey([
      // node label
      $(CmpGrd, {
        dir: 'row',
        chdrn: addkey([
          $(CmpPadLab, {
            grw: true,
            icn: !opn ? 'chevron_right' : 'expand_more',
            lab: tagCur.lab + ' (' + nod.id + ')',
            clk: () => opnSet(!opn),
          }),
          $(CmpPadLab, {
            icn: 'close',
            clk: () => nodSet(undefined),
          }),
        ]),
      }),
      opn &&
        $(CmpGrd, {
          dir: 'row',
          chdrn: addkey([
            $(CmpPadLab, {icn: 'subdirectory_arrow_right'}),
            // list of props
            $(CmpGrd, {
              grw: true,
              chdrn: tagCur.prpArr.map((prp) => {
                return $(CmpGrd, {
                  key: prp.key,
                  dir: prp.typ === 'chdrn' ? 'column' : 'row',
                  chdrn: addkey([
                    // property label
                    $(CmpPadLab, {lab: prp.key}),
                    // property value / input
                    (() => {
                      const chdrnOfPrp = (() => {
                        switch (prp.typ) {
                          case 'str':
                            return $(CmpPadStr, {
                              val: nod.prpObj[prp.key],
                              valSet: (i) =>
                                nodSet({
                                  ...nod,
                                  prpObj: {...nod.prpObj, [prp.key]: i},
                                }),
                            })
                          case 'num':
                            return $(CmpPadNum, {
                              val: nod.prpObj[prp.key],
                              valSet: (i) =>
                                nodSet({
                                  ...nod,
                                  prpObj: {...nod.prpObj, [prp.key]: i},
                                }),
                            })
                          case 'clr':
                            return $(CmpPadLab, {
                              lab: '#000',
                            })
                          case 'chdrn':
                            const chldNew: TypNod = {
                              id: random.string(),
                              tagId: 'div',
                              prpObj: {},
                            }
                            const chldArr = Array.isArray(nod.prpObj[prp.key])
                              ? (nod.prpObj[prp.key] as TypNod[])
                              : []
                            return $(CmpGrd, {
                              grw: true,
                              chdrn: addkey([
                                // list all children
                                ...chldArr.map((nodChld, index) => {
                                  return $(CmpNod2Tre, {
                                    nod: nodChld as TypNod,
                                    nodSet: (i) => {
                                      const a = [...chldArr]
                                      if (i) a.splice(index, 1, i)
                                      else a.splice(index, 1)
                                      nodSet({
                                        ...nod,
                                        prpObj: {...nod.prpObj, [prp.key]: a},
                                      })
                                    },
                                  })
                                }),
                                // add new child button
                                $(CmpPadLab, {
                                  icn: 'add',
                                  lab: 'Add',
                                  clk: () =>
                                    nodSet({
                                      ...nod,
                                      prpObj: {
                                        ...nod.prpObj,
                                        [prp.key]: [...chldArr, chldNew],
                                      },
                                    }),
                                }),
                              ]),
                            })
                          default:
                            return null
                        }
                      })()
                      return prp.typ === 'chdrn'
                        ? $(CmpGrd, {
                            dir: 'row',
                            chdrn: addkey([
                              $(CmpPadLab, {icn: 'data_array'}),
                              chdrnOfPrp,
                            ]),
                          })
                        : chdrnOfPrp
                    })(),
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
  val: string
  prpArr: Array<{
    typ: string
    key: string
  }>
}
/**
 *
 */
const tagDiv: TypTag = {
  id: 'div',
  lab: 'Div',
  val: 'asdf',
  prpArr: [
    {typ: 'str', key: 'id'},
    {typ: 'str', key: 'clsNam'},
    {typ: 'num', key: 'hgt'},
    {typ: 'num', key: 'wid'},
    {typ: 'clr', key: 'bgc'},
    {typ: 'chdrn', key: 'chldArr'},
  ],
}
/**
 *
 */
export const TAG_ARR: TypTag[] = [tagDiv]
