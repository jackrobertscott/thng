import {useThm} from '@/hooks/useThm'
import {addkey} from '@/utils/addkey'
import {css} from '@emotion/css'
import {createElement as $, FC, Fragment, useEffect, useState} from 'react'
import {CmpPadLab} from './CmpPad/CmpPadLab'
import {CmpMod} from './CmpMod'
import {CmpPadStr} from './CmpPad/CmpPadStr'
import {useFrm} from '@/hooks/useFrm'
import {useTstr} from '@/hooks/useTstr'
import {random} from '@/utils/random'
import {FIB} from '@/consts/FIB'
import {useGlb} from '@/hooks/useGlb'
import {TypPrj} from '@/ctxs/CtxGlb'
import {CmpGrdRow} from './CmpGrdRow'
import {CmpGrdCol} from './CmpGrdCol'
/**
 *
 */
export const CmpPrj: FC<{}> = ({}) => {
  const glb = useGlb()
  const [frmOpn, frmOpnSet] = useState(false)
  const [prjUpdId, prjUpdIdSet] = useState<string>()
  const prjUpd = glb.prjArr.find((i) => i.id === prjUpdId)
  return $(Fragment, {
    children: addkey([
      $(CmpGrdCol, {
        bdr: true,
        chdrn: addkey([
          glb.prjArr.map((prj) => {
            return $(CmpGrdRow, {
              key: prj.id,
              chdrn: addkey([
                $(CmpPadLab, {
                  grw: true,
                  lab: prj.lab + ' : ' + prj.fldrPth,
                  clk: () => glb.prjCurIdSet(prj.id),
                }),
                prj.id === glb.prjCur?.id &&
                  $(CmpPadLab, {
                    icn: 'star',
                  }),
                $(CmpPadLab, {
                  icn: 'settings',
                  clk: () => {
                    prjUpdIdSet(prj.id)
                    frmOpnSet(true)
                  },
                }),
              ]),
            })
          }),
          $(CmpPadLab, {
            lab: 'Add New',
            clk: () => frmOpnSet(true),
          }),
        ]),
      }),
      frmOpn &&
        $(CmpMod, {
          wid: FIB[11],
          ext: () => frmOpnSet(false),
          chdrn: $(CmpPrjNew, {
            prj: prjUpd,
            prjSet: (i) => {
              glb.prjSet(i)
              frmOpnSet(false)
              if (prjUpdId) prjUpdIdSet(undefined)
            },
          }),
        }),
    ]),
  })
}
/**
 *
 */
export const CmpPrjNew: FC<{
  prj?: TypPrj
  prjSet: (prj: TypPrj) => void
}> = ({prj, prjSet}) => {
  const tstr = useTstr()
  const thm = useThm()
  const frm = useFrm({
    lab: '',
    fldrPth: '',
  })
  useEffect(() => {
    frm.set({...frm.data, ...prj})
  }, [prj])
  return $('div', {
    className: css({
      '& > *:not(:last-child)': {borderBottom: thm.bdr.thck},
    }),
    children: addkey([
      $(CmpPadStr, {
        val: frm.data.lab,
        valSet: frm.link('lab'),
      }),
      $(CmpPadLab, {
        lab: frm.data.fldrPth || 'Select Folder',
        clk: async () =>
          frm.patch({
            fldrPth: await window.brdg?.pickFldr(),
          }),
      }),
      $(CmpPadLab, {
        lab: 'Submit',
        clk: () => {
          const prjTmp = {
            ...prj,
            lab: frm.data.lab.trim(),
          }
          if (!prjTmp.lab) return tstr.notif('Please provide a valid label.')
          prjSet({
            ...prjTmp,
            id: prjTmp.id || random.string(),
          })
        },
      }),
    ]),
  })
}
