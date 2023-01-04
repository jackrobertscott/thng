import {createElement as $, FC} from 'react'
import {css} from '@emotion/css'
import {TypTstr} from '@/ctxs/CtxTstr'
import {useThm} from '@/hooks/useThm'
import {media} from '@/utils/media'
import {CmpPadLab} from './CmpPad/CmpPadLab'
import {addkey} from '@/utils/addkey'
import {FIB} from '@/consts/FIB'
/**
 *
 */
export const CmpTstr: FC<{
  tstrArr: TypTstr[]
}> = ({tstrArr}) => {
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
    children: tstrArr.map((tstr) => {
      return $('div', {
        key: tstr.id,
        className: css({
          maxWidth: '100%',
          overflow: 'hidden',
          transition: '200ms',
          pointerEvents: 'all',
          flexDirection: 'row',
          width: FIB[13] - FIB[9],
          border: thm.bdr.tstr,
          color: thm.fc.tstr.normal,
          background: thm.bg.tstr.normal,
          '& > *:not(:last-child)': {
            borderRight: thm.bdr.tstr,
          },
        }),
        children: addkey([
          $(CmpPadLab, {
            grw: true,
            lab: tstr.txt,
            icn: tstr.type === 'error' ? 'notification_important' : undefined,
          }),
          $(CmpPadLab, {
            icn: 'close',
            clk: tstr.exit,
            bgd: thm.bg.tstr,
          }),
        ]),
      })
    }),
  })
}
