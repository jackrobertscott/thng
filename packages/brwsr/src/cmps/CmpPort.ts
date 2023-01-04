import {FC, ReactNode, useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
/**
 *
 */
export const CmpPort: FC<{
  id?: string
  chdrn: ReactNode
}> = ({id = 'port', chdrn}) => {
  const [dom, domSet] = useState(document.getElementById(id))
  useEffect(() => {
    if (!dom)
      setTimeout(() => {
        const dom = document.getElementById(id)
        if (!dom) throw new Error('Failed to find DOM element for portal.')
        domSet(dom)
      })
  }, [dom, id])
  return dom ? createPortal(chdrn, dom) : null
}
