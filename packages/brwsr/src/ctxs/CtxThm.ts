import {THM} from '@/consts/THM'
import {createContext} from 'react'
/**
 *
 */
export type TypCtxThm = typeof THM
/**
 *
 */
export const CtxThm = createContext<TypCtxThm>(THM)
