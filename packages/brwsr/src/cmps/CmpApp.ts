import {FIB} from '@/consts/FIB'
import {useThm} from '@/hooks/useThm'
import {addkey} from '@/utils/addkey'
import {css} from '@emotion/css'
import {createElement as $, FC, useEffect} from 'react'
import {CmpPrj} from './CmpPrj'
import {CmpPnlTre} from './CmpPnl/CmpPnlTre'
import {CmpPnlUi} from './CmpPnl/CmpPnlUi'
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
      gap: FIB[7],
      color: thm.fc.maj.normal,
      background: thm.bg.app.normal,
    }),
    children: addkey([
      $(CmpPrj),
      $('div', {
        className: css({
          gap: FIB[7],
          flexDirection: 'row',
          alignItems: 'start',
          flexGrow: 1,
        }),
        children: addkey([$(CmpPnlTre), $(CmpPnlUi)]),
      }),
    ]),
  })
}
