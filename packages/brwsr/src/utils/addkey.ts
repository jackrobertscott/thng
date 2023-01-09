import {createElement as $, ReactNode, Fragment} from 'react'
/**
 *
 */
export const addkey = (
  chdrn: ReactNode[],
  opts?: {rev?: boolean}
): ReactNode[] => {
  if (opts?.rev) chdrn = chdrn.reverse()
  return chdrn.map((child, index) => {
    return $(Fragment, {
      key: index.toString(),
      children: child,
    })
  })
}
