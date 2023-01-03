import {FIB} from '@/consts/FIB'
import {genAll} from '@/gens/genAll'
import {useLcl} from '@/hooks/useLcl'
import {useThm} from '@/hooks/useThm'
import {addkeys} from '@/utils/addkeys'
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
    children: addkeys([
      $('div', {
        className: css({
          fontSize: 16,
          fontFamily: 'monospace',
          fontWeight: 'bold',
          whiteSpace: 'pre',
        }),
        children: 'Hello world',
      }),
      $('div', {
        className: css({
          gap: FIB[5],
        }),
        children: addkeys([
          $(CmpBtnSmp, {
            label: 'Select folder' + (fldr ? ': ' + fldr : ''),
            click: async () => {
              const i = await window.brdg?.pickFldr()
              fldrSet(typeof i === 'string' ? i : undefined)
            },
          }),
          fldr &&
            $(CmpBtnSmp, {
              label: 'Save',
              click: () => genAll(fldr),
            }),
        ]),
      }),
    ]),
  })
}
/**
 *
 */
export const CmpBtnSmp: FC<{label: string; click: () => void}> = ({
  label,
  click,
}) => {
  const thm = useThm()
  return $('button', {
    onClick: click,
    children: label,
    className: css({
      border: thm.brdr.solid,
      color: thm.fc.maj.normal,
      background: thm.bg.maj.normal,
      borderRadius: 5,
      padding: 5,
    }),
  })
}
