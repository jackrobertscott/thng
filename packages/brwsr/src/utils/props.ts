import {FC} from 'react'
/**
 *
 */
export type TypeFCProps<T extends FC<any>> = T extends FC<infer X> ? X : never
