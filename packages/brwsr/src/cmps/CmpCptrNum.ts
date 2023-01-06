import {TypFCProps} from '@/utils/props'
import {createElement as $, FC, useState} from 'react'
import {CmpCptrStr} from './CmpCptrStr'
/**
 *
 */
export const CmpCptrNum: FC<
  Omit<TypFCProps<typeof CmpCptrStr>, 'val' | 'valSet'> & {
    min?: number
    max?: number
    val?: number | null
    valSet?: (value: number | null) => void
  }
> = ({min, max, val, valSet, ...props}) => {
  const [dot, dotSet] = useState(false)
  const _change = (value: string | null) => {
    if (value === null) {
      return null
    }
    value = value.trim()
    if (value.length === 0) {
      return valSet?.(null)
    }
    if (value.charAt(value.length - 1) === '.') {
      if (!dot) dotSet(true)
    } else {
      if (dot) dotSet(false)
    }
    const i = parseFloat(value)
    if (!isNaN(i)) {
      if (typeof min !== 'number' || i >= min) {
        if (typeof max !== 'number' || i <= max) {
          valSet?.(i)
        }
      }
    }
  }
  return $(CmpCptrStr, {
    ...props,
    val: (typeof val === 'number' ? val : '') + (dot ? '.' : ''),
    keyDwn: (code) => {
      if (code === 'ArrowUp') _change((val || 0) + 1 + '')
      if (code === 'ArrowDown') _change((val || 0) - 1 + '')
    },
    valSet: _change,
  })
}
