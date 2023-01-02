import {keyframes} from '@emotion/css'
import {FIB} from './FIB'
/**
 *
 */
export const KEY_FRM = {
  fade: keyframes({
    '0%': {opacity: 0},
    '100%': {opacity: 1},
  }),
  spin: keyframes({
    '0%': {transform: 'rotateZ(360deg)'},
    '100%': {transform: 'rotateZ(0deg)'},
  }),
  fadeDown: keyframes({
    '0%': {
      opacity: 0,
      transform: `translateY(-${FIB[6]}px)`,
    },
    '100%': {
      opacity: 1,
      transform: 'none',
    },
  }),
}
