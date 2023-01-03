import {FIB} from '@/consts/FIB'
import {useThm} from '@/hooks/useThm'
import {addkeys} from '@/utils/addkeys'
import {css} from '@emotion/css'
import {createElement as $, FC, ReactNode} from 'react'
/**
 *
 */
export const CmpPopWrp: FC<{
  wid?: number
  hgt?: number
  ele: ReactNode
  ali?: 'left' | 'right' | 'center'
  pos?: 'above' | 'below'
}> = ({wid = FIB[11] + 1, hgt, ele, ali = 'center', pos = 'below'}) => {
  const thm = useThm()
  return $('div', {
    className: css({
      zIndex: 100,
      position: 'absolute',
      alignItems:
        ali === 'right' ? 'end' : ali === 'center' ? 'center' : 'start',
      left: ali === 'right' ? undefined : ali === 'center' ? '50%' : -2,
      right: ali === 'right' ? -1 : undefined,
      [pos === 'above' ? 'top' : 'bottom']: 0,
      transform: `translateX(${ali === 'center' ? '-50%' : '0'}) translateY(${
        pos === 'above' ? '-100%' : '100%'
      })`,
    }),
    children: addkeys(
      [
        /**
         * diamond tooltip pointer
         */
        $('div', {
          className: css({
            margin: [FIB[4] - FIB[1], FIB[5]].map((i) => i + 'px').join(' '),
            width: FIB[5] + FIB[2],
            height: FIB[5] + FIB[2],
            background: thm.bg.brdr.normal,
            transform: 'rotate(45deg)',
          }),
        }),
        /**
         * bordered content wrapper
         */
        $('div', {
          children: ele,
          className: css({
            zIndex: 200,
            width: wid,
            maxHeight: hgt,
            overflow: 'auto',
            position: 'relative',
            borderRadius: FIB[5],
            [pos === 'above' ? 'marginBottom' : 'marginTop']: -FIB[6],
            border: thm.brdr.solid,
            color: thm.fc.maj.normal,
            background: thm.bg.maj.normal,
            boxShadow: thm.shdw.maj,
            '& > *:not(:last-child)': {borderBottom: thm.brdr.solid},
          }),
        }),
      ],
      {reversed: pos === 'above'}
    ),
  })
}
