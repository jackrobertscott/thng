import {css} from '@emotion/css'
import {createElement as $, FC} from 'react'
/**
 *
 */
export const CmpCptrStr: FC<{
  typ?: string
  dis?: boolean
  plcHdr?: string
  autfoc?: boolean
  val?: string | null
  valSet?: (val: string | null) => void
  foc?: () => void
  blr?: () => void
  ent?: () => void
  keyDwn?: (key: string) => void
}> = ({
  typ = 'text',
  dis,
  plcHdr,
  autfoc,
  val,
  valSet,
  foc,
  blr,
  ent,
  keyDwn,
}) => {
  return $('input', {
    type: typ,
    value: val || '',
    placeholder: plcHdr,
    disabled: dis,
    autoFocus: autfoc,
    onBlur: dis ? undefined : () => blr?.(),
    onFocus: dis ? undefined : () => foc?.(),
    onChange: dis ? undefined : (evt) => valSet?.(evt.target.value || null),
    onKeyDown: dis
      ? undefined
      : (event) => {
          if (event.key === 'Enter') ent?.()
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
