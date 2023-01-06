import {TAG_ARR, TypNod} from '@/cmps/CmpPnl/CmpPnlTre'
import {TypPrj} from '@/ctxs/CtxGlb'
/**
 *
 */
export const genFileApp = (prj: TypPrj) => {
  const txt = `
    import {createElement as $, FC} from 'react'
    import {css} from '@emotion/css'
    /**
     *
     */
    export const GenApp: FC<{}> = ({}) => {
      return ${genCdeFrmNod(prj.nod)}
    }
  `
  return txt
    .split('\n')
    .map((i) => i.slice(4)) // remove spaces at start
    .filter((i) => i.length)
    .join('\n')
}
/**
 *
 */
const genCdeFrmNod = (nod?: TypNod) => {
  if (!nod) return 'null'
  let tag = TAG_ARR.find((i) => nod.tagId === i.id)
  if (!tag) return 'null'
  let txt = ''
  txt += `$('${tag.val}')`
  return txt
}
