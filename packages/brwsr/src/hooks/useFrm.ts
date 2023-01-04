import {useMemo, useRef, useState} from 'react'
/**
 *
 */
export const useFrm = <
  X extends Record<string, any>,
  T extends {[K in keyof X]: X[K] | null}
>(
  initial: X
) => {
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
