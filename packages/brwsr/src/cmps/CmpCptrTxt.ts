import {css} from '@emotion/css'
import {ChangeEvent, createElement as $, FC} from 'react'
/**
 *
 */
export const CmpCptrTxt: FC<{
  rowCnt?: number
  dis?: boolean
  plcHdr?: string
  fcs?: boolean
  val?: string | null
  valSet?: (val: string | null) => void
  foc?: () => void
  onnBlr?: () => void
}> = ({rowCnt, dis, plcHdr, fcs, val, valSet, foc, onnBlr}) => {
  return $('textarea', {
    value: val,
    placeholder: plcHdr,
    disabled: dis,
    rows: rowCnt ?? 3,
    autoFocus: fcs,
    onBlur: () => !dis && onnBlr?.(),
    onFocus: () => !dis && foc?.(),
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) =>
      !dis && valSet?.(event.target.value || null),
    className: css({
      flexGrow: 1,
      width: 'auto',
      minWidth: 'auto',
      transition: '200ms',
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        MozAppearance: 'textfield',
      },
    }),
  })
}
