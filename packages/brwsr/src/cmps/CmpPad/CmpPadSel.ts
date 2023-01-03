import {FIB} from '@/consts/FIB'
import {addkeys} from '@/utils/addkeys'
import {createElement as $, FC, ReactNode} from 'react'
import {CmpPop} from '../CmpPop'
import {CmpPopWrp} from '../CmpPopWrp'
import {CmpPadLab} from './CmpPadLab'
/**
 *
 */
export const CmpPadSel: FC<{
  val?: string | null
  valSet: (value: string | null) => void
  optArr: {
    val: string
    lab: string
    icn?: string
  }[]
  wid?: number
  hed?: ReactNode
}> = ({val, valSet, optArr, wid, hed}) => {
  const current = val ? optArr.find((i) => i.val === val) : undefined
  return $(CmpPop, {
    grw: true,
    eleWrp: (open) =>
      $(CmpPadLab, {
        icn: current?.icn,
        lab: current?.lab || 'Select',
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
            return $(CmpPadLab, {
              key: opt.val,
              lab: opt.lab,
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
