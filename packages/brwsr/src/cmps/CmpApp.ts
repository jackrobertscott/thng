import {FIB} from '@/consts/FIB'
import {genAll} from '@/gens/genAll'
import {useLcl} from '@/hooks/useLcl'
import {useThm} from '@/hooks/useThm'
import {addkey} from '@/utils/addkey'
import {css} from '@emotion/css'
import {createElement as $, FC, useEffect} from 'react'
/**
 *
 */
export const CmpApp: FC<{}> = ({}) => {
  const thm = useThm()
  const [fldr, fldrSet] = useLcl<string | undefined>('fldr')
  useEffect(() => {
    window.brdg?.ping().then((i) => console.log(i))
    window.brdg?.rload(() => window.location.reload())
  }, [])
  return $('div', {
    className: css({
      flexGrow: 1,
      width: '100%',
      overflow: 'auto',
      background: thm.bg.app.normal,
      color: thm.fc.maj.normal,
      padding: FIB[10],
    }),
    children: addkey([]),
  })
}
