import {createElement as $, FC} from 'react'
import {CmpPadLab} from './CmpPad/CmpPadLab'
import {css} from '@emotion/css'
import {addkey} from '@/utils/addkey'
import {hsla} from '@/utils/hsla'
import {CmpIcn} from './CmpIcn'
import {indent} from '@/utils/indent'
import {FIB} from '@/consts/FIB'
/**
 *
 */
export const CmpPrtyNod: FC<{
  lab?: string
  icn?: string
  x: number
  y: number
}> = ({lab, icn, x, y}) => {
  return $('div', {
    className: css({
      flexDirection: 'row',
      position: 'absolute',
      left: x,
      top: y,
    }),
    children: addkey([
      $(CmpPrtyNodHndl),
      $('div', {
        className: css({
          overflow: 'hidden',
          border: '2px solid ' + hsla(60, 100, 50).normal,
          background: hsla(60, 100, 40).normal,
          color: hsla(0, 0, 0, 0.8).normal,
          padding: indent(FIB[3]),
          fontWeight: 'bold',
          borderRadius: 5,
        }),
        children: addkey([
          lab && $('div', {children: lab}),
          icn && $(CmpIcn, {icn}),
        ]),
      }),
      $(CmpPrtyNodHndl, {
        rev: true,
      }),
    ]),
  })
}
/**
 *
 */
export const CmpPrtyNodHndl: FC<{rev?: boolean}> = ({rev}) => {
  return $('div', {
    className: css({
      flexDirection: 'row',
      alignItems: 'center',
    }),
    children: addkey(
      [
        $('div', {
          className: css({
            width: 11,
            height: 11,
            borderRadius: '100%',
            border: '2px solid yellow',
          }),
        }),
        $('div', {
          className: css({
            width: 10,
            height: 2,
            background: 'yellow',
          }),
        }),
      ],
      {rev}
    ),
  })
}
