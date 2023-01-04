import {FIB} from '@/consts/FIB'
import {useThm} from '@/hooks/useThm'
import {addkey} from '@/utils/addkey'
import {css} from '@emotion/css'
import {createElement as $, FC, useEffect} from 'react'
import {CmpPrj} from './CmpPrj'
/**
 *
 */
export const CmpApp: FC<{}> = ({}) => {
  const thm = useThm()
  useEffect(() => {
    window.brdg?.ping().then((i) => console.log(i))
    window.brdg?.rload(() => window.location.reload())
  }, [])
  return $('div', {
    className: css({
      flexGrow: 1,
      width: '100%',
      overflow: 'auto',
      padding: FIB[7],
      color: thm.fc.maj.normal,
      background: thm.bg.app.normal,
    }),
    children: addkey([$(CmpPrj)]),
  })
}
