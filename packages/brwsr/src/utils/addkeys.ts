import {createElement as $, ReactNode, Fragment} from 'react'
/**
 *
 */
export const addkeys = (
  children: ReactNode[],
  options?: {reversed?: boolean}
): ReactNode[] => {
  if (options?.reversed) children = children.reverse()
  return children.map((child, index) => {
    return $(Fragment, {
      key: index.toString(),
      children: child,
    })
  })
}
