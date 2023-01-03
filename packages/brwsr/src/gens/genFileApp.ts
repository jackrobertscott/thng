/**
 *
 */
export const GenApp = () => {
  const txt = `
    import {createElement as $, FC} from 'react'
    import {css} from '@emotion/css'
    /**
     *
     */
    export const CmpApp: FC<{}> = ({}) => {
      return $('div', {
        children: 'Jack Scott',
        className: css({
          background: 'yellow',
        })
      })
    }
  `
  return txt
    .split('\n')
    .map((i) => i.slice(4)) // remove spaces at start
    .filter((i) => i.length)
    .join('\n')
}
