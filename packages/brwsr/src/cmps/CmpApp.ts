import {FIB} from '@/consts/FIB'
import {useThm} from '@/hooks/useThm'
import {css} from '@emotion/css'
import {createElement as $, FC, useEffect} from 'react'
/**
 *
 */
export const CmpApp: FC<{}> = ({}) => {
  const thm = useThm()
  useEffect(() => {
    console.log('app started')
    console.log(window.versions)
    window.versions?.ping?.().then((i) => console.log(i))
    window.versions?.lisRel?.(() => {
      // window.location.reload()
      console.log('called')
    })
  }, [])
  return $('div', {
    className: css({
      flexGrow: 1,
      width: '100%',
      overflow: 'auto',
      background: thm.bg.app.normal,
      color: thm.fc.maj.normal,
      padding: FIB[10],
      fontSize: FIB[8],
    }),
    children: 'Hello world',
  })
}
