import {hsla} from '@/utils/hsla'
import {FIB} from './FIB'
/**
 *
 */
export const THM = {
  bg: {
    app: hsla(0, 0, 20),
    maj: hsla(0, 0, 0, 0.2),
    tstr: hsla(0, 0, 100),
    brdr: hsla(0, 0, 0),
    shdw: hsla(0, 0, 0, 0.1),
  },
  fc: {
    maj: hsla(0, 0, 100),
    plchldr: hsla(0, 0, 50),
    tstr: hsla(0, 0, 0),
  },
  bdr: {
    wid: 2,
    thck: '2px solid ' + hsla(0, 0, 0).normal,
    dash: '2px dashed ' + hsla(0, 0, 0).normal,
    tstr: '2px solid ' + hsla(0, 0, 0).normal,
  },
  pad: {
    box: FIB[3],
  },
  shdw: {
    clr: '0 0 0 0 transparent',
    maj: [
      `0 0 15px 0 ${hsla(0, 0, 0, 0.15).normal}`,
      `0 0 25px -5px ${hsla(0, 0, 0, 0.15).normal}`,
    ].join(', '),
    min: [
      `0 0 10px 0 ${hsla(0, 0, 0, 0.05).normal}`,
      `0 0 20px -5px ${hsla(0, 0, 0, 0.1).normal}`,
    ].join(', '),
  },
}
