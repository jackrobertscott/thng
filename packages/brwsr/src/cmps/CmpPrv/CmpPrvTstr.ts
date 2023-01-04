import {createElement as $, FC, ReactNode, useState} from 'react'
import {addkey} from '@/utils/addkey'
import {random} from '@/utils/random'
import {CmpTstr} from '../CmpTstr'
import {CtxTstr, TypCtxTstr, TypTstr} from '@/ctxs/CtxTstr'
/**
 *
 */
export const CmpPrvTstr: FC<{ele: ReactNode}> = ({ele}) => {
  const [tstrArr, tstrArrSet] = useState<TypTstr[]>([])
  const delById = (id: string) =>
    tstrArrSet((i) => i.filter((x) => x.id !== id))
  const newTstr = (txt: string, type: TypTstr['type'], time?: number) => {
    const id = random.string()
    const exit = () => delById(id)
    setTimeout(() => exit(), time ?? type === 'error' ? 5000 : 3000)
    return {
      id,
      txt,
      type,
      exit,
    } as TypTstr
  }
  const value: TypCtxTstr = {
    tstrArr: tstrArr,
    notif: (txt, time) =>
      tstrArrSet((i) => [...i, newTstr(txt, 'normal', time)]),
    err: (txt) => tstrArrSet((i) => [...i, newTstr(txt, 'error')]),
  }
  return $(CtxTstr.Provider, {
    value,
    children: addkey([
      ele,
      $(CmpTstr, {
        tstrArr: tstrArr,
      }),
    ]),
  })
}
