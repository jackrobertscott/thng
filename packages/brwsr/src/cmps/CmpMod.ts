import {css} from '@emotion/css'
import {createElement as $, FC, ReactNode, useEffect, useRef} from 'react'
import {useZidx} from '@/hooks/useZidx'
import {watch} from '@/utils/watch'
import {useThm} from '@/hooks/useThm'
import {CmpPort} from './CmpPort'
import {addkey} from '@/utils/addkey'
import {FIB} from '@/consts/FIB'
/**
 *
 */
export const CmpMod: FC<{
  chdrn: ReactNode
  ext?: () => void
  wid?: number
  minHgt?: number
}> = ({chdrn, ext, wid, minHgt}) => {
  const ref = useRef()
  const zidx = useZidx()
  const thm = useThm()
  const unfRef = useRef(true)
  useEffect(() => {
    zidx.on()
    return () => zidx.off()
  }, [])
  useEffect(() => {
    return watch.element(ref.current, {
      mousedown: () => {
        const el = document.querySelector(':focus-within')
        unfRef.current = !el || el === document.children[0]
      },
      click: ({target, currentTarget}) => {
        if (target !== currentTarget) return
        if (unfRef.current) ext?.()
      },
    })
  }, [])
  return $(CmpPort, {
    chdrn: $('div', {
      className: css({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        overflow: 'auto',
        position: 'fixed',
      }),
      children: addkey([
        $('div', {
          ref,
          className: css({
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            position: 'absolute',
            background: thm.bg.shdw.normal,
          }),
        }),
        $('div', {
          className: css({
            flexGrow: 1,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            position: 'relative',
          }),
          children: $('div', {
            className: css({
              width: '100%',
              maxHeight: '100%',
              overflowY: 'auto',
              alignItems: 'center',
              flexDirection: 'column',
              padding: FIB[6],
              '& > *': {pointerEvents: 'auto'},
            }),
            children: $('div', {
              children: chdrn,
              className: css({
                width: wid,
                minHeight: minHgt,
                maxWidth: '100%',
                overflow: 'auto',
                flexDirection: 'column',
                border: thm.bdr.thck,
                background: thm.bg.app.normal,
                boxShadow: thm.shdw.maj,
                borderRadius: FIB[5],
                '& > *:not(:last-child)': {borderBottom: thm.bdr.thck},
              }),
            }),
          }),
        }),
      ]),
    }),
  })
}
