import {FIB} from '@/consts/FIB'
import {addkeys} from '@/utils/addkeys'
import {createElement as $, FC, ReactNode} from 'react'
import {CmpPop} from '../CmpPop'
import {CmpPopWrp} from '../CmpPopWrp'
import {CmpPadLbl} from './CmpPadLbl'
/**
 *
 */
export const CmpPadSel: FC<{
  val?: string | null
  valSet: (value: string | null) => void
  optArr: {
    val: string
    lbl: string
    icn?: string
  }[]
  wid?: number
  hed?: ReactNode
}> = ({val, valSet, optArr, wid, hed}) => {
  const current = val ? optArr.find((i) => i.val === val) : undefined
  return $(CmpPop, {
    grw: true,
    eleWrp: (open) =>
      $(CmpPadLbl, {
        icn: current?.icn,
        lbl: current?.lbl || 'Select',
        clk: open,
      }),
    elePop: (exit) =>
      $(CmpPopWrp, {
        wid,
        ali: 'left',
        hgt: FIB[12],
        ele: addkeys([
          hed,
          optArr.map((opt) => {
            return $(CmpPadLbl, {
              key: opt.val,
              lbl: opt.lbl,
              icn: opt.icn,
              clk: () => {
                valSet(opt.val)
                exit()
              },
            })
          }),
        ]),
      }),
  })
}
