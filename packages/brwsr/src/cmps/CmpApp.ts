import {useThm} from '@/hooks/useThm'
import {css} from '@emotion/css'
import {createElement as $, FC, useEffect} from 'react'
import {CmpNodBrd} from './CmpNodBrd'
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
      color: thm.fc.maj.normal,
      background: thm.bg.app.normal,
    }),
    children: $(CmpNodBrd),
  })
}
