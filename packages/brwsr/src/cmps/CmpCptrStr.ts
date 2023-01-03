import {css} from '@emotion/css'
import {createElement as $, FC} from 'react'
/**
 *
 */
export const CmpCptrStr: FC<{
  typ?: string
  dis?: boolean
  plcHdr?: string
  fcs?: boolean
  val?: string | null
  valSet?: (val: string | null) => void
  onnFcs?: () => void
  onnblr?: () => void
  onnEnt?: () => void
  keyDwn?: (key: string) => void
}> = ({
  typ = 'text',
  dis,
  plcHdr,
  fcs,
  val,
  valSet,
  onnFcs,
  onnblr,
  onnEnt,
  keyDwn,
}) => {
  return $('input', {
    type: typ,
    value: val || '',
    placeholder: plcHdr,
    disabled: dis,
    autoFocus: fcs,
    onBlur: dis ? undefined : () => onnblr?.(),
    onFocus: dis ? undefined : () => onnFcs?.(),
    onChange: dis ? undefined : (evt) => valSet?.(evt.target.value || null),
    onKeyDown: dis
      ? undefined
      : (event) => {
          if (event.key === 'Enter') onnEnt?.()
          keyDwn?.(event.key)
        },
    className: css({
      width: 0,
      flexGrow: 1,
      minWidth: 'auto',
      transition: '200ms',
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        MozAppearance: 'textfield',
      },
    }),
  })
}
