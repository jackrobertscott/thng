import {createElement as $, FC, ReactNode, useState} from 'react'
import {addkeys} from '@/utils/addkeys'
import {random} from '@/utils/random'
import {CmpTst} from '../CmpTst'
import {CtxTst, TypCtxTst, TypTst} from '@/ctxs/CtxTst'
/**
 *
 */
export const CmpPrvTst: FC<{ele: ReactNode}> = ({ele}) => {
  const [toastArray, toastArraySet] = useState<TypTst[]>([])
  const removeById = (id: string) =>
    toastArraySet((i) => i.filter((x) => x.id !== id))
  const createToast = (
    message: string,
    type: TypTst['type'],
    timeout?: number
  ) => {
    const id = random.string()
    const toastClose = () => removeById(id)
    const piece: TypTst = {
      id,
      message,
      type,
      remove: toastClose,
    }
    setTimeout(() => toastClose(), timeout ?? type === 'error' ? 5000 : 3000)
    return piece
  }
  return $(CtxTst.Provider, {
    value: {
      toastArray,
      notify: (message, time) =>
        toastArraySet((i) => [...i, createToast(message, 'normal', time)]),
      error: (message) =>
        toastArraySet((i) => [...i, createToast(message, 'error')]),
      missing: (fieldName) =>
        toastArraySet((i) => [
          ...i,
          createToast(`Please provide a ${fieldName}.`, 'error'),
        ]),
    } as TypCtxTst,
    children: addkeys([
      ele,
      $(CmpTst, {
        tstArr: toastArray,
      }),
    ]),
  })
}
