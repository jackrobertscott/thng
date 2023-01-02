import {createElement as $, FC} from 'react'
import {css} from '@emotion/css'
import {TypTst} from '@/ctxs/CtxTst'
import {useThm} from '@/hooks/useThm'
import {media} from '@/utils/media'
import {CmpPadLbl} from './CmpPad/CmpPadLbl'
import {addkeys} from '@/utils/addkeys'
import {FIB} from '@/consts/FIB'
/**
 *
 */
export const CmpTst: FC<{
  tstArr: TypTst[]
}> = ({tstArr}) => {
  const thm = useThm()
  return $('div', {
    className: css({
      position: 'fixed',
      zIndex: 1000,
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      transition: '200ms',
      pointerEvents: 'none',
      flexDirection: 'column',
      alignItems: 'center',
      padding: FIB[6],
      gap: FIB[4],
      [media.smaller(FIB[13])]: {
        padding: FIB[4],
      },
    }),
    children: tstArr.map((tst) => {
      return $('div', {
        key: tst.id,
        className: css({
          maxWidth: '100%',
          overflow: 'hidden',
          transition: '200ms',
          pointerEvents: 'all',
          flexDirection: 'row',
          width: FIB[13] - FIB[9],
          border: thm.border.toaster,
          color: thm.fc.toaster.normal,
          background: thm.bg.toaster.normal,
          '& > *:not(:last-child)': {
            borderRight: thm.border.toaster,
          },
        }),
        children: addkeys([
          $(CmpPadLbl, {
            grw: true,
            lbl: tst.message,
            icn: tst.type === 'error' ? 'notification_important' : undefined,
          }),
          $(CmpPadLbl, {
            icn: 'close',
            clk: tst.remove,
            bgd: thm.bg.toaster,
          }),
        ]),
      })
    }),
  })
}
