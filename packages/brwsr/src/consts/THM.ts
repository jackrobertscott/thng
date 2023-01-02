import {hsla} from '@/utils/hsla'
import {FIB} from './FIB'
/**
 *
 */
export const THM = {
  bg: {
    root: hsla(0, 0, 100),
    major: hsla(0, 0, 100),
    shadow: hsla(0, 0, 0, 0.05),
    toaster: hsla(0, 0, 100),
    border: hsla(0, 0, 0),
  },
  fc: {
    major: hsla(0, 0, 0),
    placeholder: hsla(0, 0, 50),
    toaster: hsla(0, 0, 0),
  },
  border: {
    solid: '2px solid ' + hsla(0, 0, 0).normal,
    dashed: '2px dashed ' + hsla(0, 0, 0).normal,
    toaster: '2px solid ' + hsla(0, 0, 0).normal,
  },
  padding: {
    box: FIB[5],
  },
  shadow: {
    clear: '0 0 0 0 transparent',
    major: [
      `0 0 15px 0 ${hsla(0, 0, 0, 0.15).normal}`,
      `0 0 25px -5px ${hsla(0, 0, 0, 0.15).normal}`,
    ].join(', '),
    minor: [
      `0 0 10px 0 ${hsla(0, 0, 0, 0.05).normal}`,
      `0 0 20px -5px ${hsla(0, 0, 0, 0.1).normal}`,
    ].join(', '),
  },
}
