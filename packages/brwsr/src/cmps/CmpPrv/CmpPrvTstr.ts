import {createElement as $, FC, ReactNode, useState} from 'react'
import {addkeys} from '@/utils/addkeys'
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
  const newTstr = (txt: string, type: TypTstr['type'], timeout?: number) => {
    const id = random.string()
    const exit = () => delById(id)
    setTimeout(() => exit(), timeout ?? type === 'error' ? 5000 : 3000)
    return {
      id,
      txt,
      type,
      exit,
    } as TypTstr
  }
  return $(CtxTstr.Provider, {
    value: {
      tstrArr: tstrArr,
      notif: (message, time) =>
        tstrArrSet((i) => [...i, newTstr(message, 'normal', time)]),
      error: (message) => tstrArrSet((i) => [...i, newTstr(message, 'error')]),
      missing: (fieldName) =>
        tstrArrSet((i) => [
          ...i,
          newTstr(`Please provide a ${fieldName}.`, 'error'),
        ]),
    } as TypCtxTstr,
    children: addkeys([
      ele,
      $(CmpTstr, {
        tstrArr: tstrArr,
      }),
    ]),
  })
}
