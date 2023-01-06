import {FC} from 'react'
/**
 *
 */
export type TypFCProps<T extends FC<any>> = T extends FC<infer X> ? X : never
