import {createElement as $, ReactNode, Fragment} from 'react'
/**
 *
 */
export const addkey = (
  chdrn: ReactNode[],
  options?: {reversed?: boolean}
): ReactNode[] => {
  if (options?.reversed) chdrn = chdrn.reverse()
  return chdrn.map((child, index) => {
    return $(Fragment, {
      key: index.toString(),
      children: child,
    })
  })
}
