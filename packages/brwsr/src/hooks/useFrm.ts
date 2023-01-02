import {useMemo, useRef, useState} from 'react'
/**
 *
 */
export const useFrm = <T extends Record<string, any>>(initial: T) => {
  const refInitial = useRef(initial)
  const [formData, formDataSet] = useState(initial)
  const formDataPatch = (data: Partial<T>) =>
    formDataSet((i) => ({...i, ...data}))
  const formLink =
    <K extends keyof T>(key: K) =>
    (value: T[K]) =>
      formDataSet((i) => ({...i, [key]: value}))
  return useMemo(() => {
    return {
      data: formData,
      set: formDataSet,
      patch: formDataPatch,
      link: formLink,
      reset: () => formDataSet(initial),
      initial: () => ({...refInitial.current}),
    }
  }, [formData])
}
