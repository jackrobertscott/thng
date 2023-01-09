import crossSvg from '../assets/cross.svg'
import {css} from '@emotion/css'
import {createElement as $, FC, useState} from 'react'
import {CmpPadLab} from './CmpPad/CmpPadLab'
import {addkey} from '@/utils/addkey'
import {random} from '@/utils/random'
import {useLcl} from '@/hooks/useLcl'
import {CmpPrtyNod} from './CmpPrtyNod'
/**
 *
 */
export const CmpNodBrd: FC<{}> = ({}) => {
  const [shwNodSel, shwNodSelSet] = useState<{x: number; y: number}>()
  const [pinArr, pinArrSet] = useLcl<
    {id: string; x: number; y: number; nod: TypNod}[]
  >('pinArr', [])
  return $('div', {
    onClick: () => {
      if (shwNodSel) shwNodSelSet(undefined)
    },
    onDoubleClick: (e: MouseEvent) => {
      if (e.target !== e.currentTarget) return
      if (!shwNodSel) shwNodSelSet({x: e.clientX, y: e.clientY})
      console.log(shwNodSel)
    },
    className: css({
      flexGrow: 1,
      background: `url(${crossSvg})`,
      position: 'relative',
    }),
    children: addkey([
      shwNodSel &&
        $('div', {
          className: css({
            position: 'absolute',
            top: shwNodSel.y,
            left: shwNodSel.x,
          }),
          children: $('div', {
            className: css({
              alignItems: 'start',
            }),
            // list all the nodes
            children: NOD_ARR.map((i) => {
              return $(CmpPadLab, {
                key: i.key,
                lab: i.lab,
                clk: () => {
                  // gen node and add to board
                  pinArrSet([
                    ...pinArr,
                    {
                      ...shwNodSel,
                      id: random.string(),
                      nod: {key: i.key},
                    },
                  ])
                },
              })
            }),
          }),
        }),
      pinArr.map((pin) => {
        const nodDef = NOD_ARR.find((i) => i.key === pin.nod.key)
        if (!nodDef) return null
        return $(CmpPrtyNod, {
          key: pin.id,
          x: pin.x,
          y: pin.y,
          lab: nodDef.lab,
        })
      }),
    ]),
  })
}
const NOD_ARR: {
  key: string
  lab: string
}[] = [{key: 'val:str', lab: 'String'}]
/**
 *
 */
type TypNod<T extends {key: string} = {key: string}> = T & {}
/**
 * Value
 */
type TypNodValStr = TypNod<{
  key: 'val:str'
  val?: string
}>
type TypNodValNum = TypNod<{
  key: 'val:num'
  val?: number
}>
type TypNodValBol = TypNod<{
  key: 'val:bol'
  val?: number
}>
type TypNodValObj = TypNod<{
  key: 'val:obj'
  prpObj?: {[K: string]: TypNodVal}
  typObj?: TypNodTypObj<{[K: string]: TypNodTyp}>
}>
type TypNodVal = TypNodValStr | TypNodValNum | TypNodValBol | TypNodValObj
/**
 * Type
 */
type TypNodTypStr = TypNod<{
  key: 'typ:str'
}>
type TypNodTypNum = TypNod<{
  key: 'typ:num'
}>
type TypNodTypBol = TypNod<{
  key: 'typ:bol'
}>
type TypNodTypObj<T extends {[K: string]: TypNodTyp}> = TypNod<{
  key: 'typ:obj'
  prpObj?: T
}>
type TypNodTyp =
  | TypNodTypStr
  | TypNodTypNum
  | TypNodTypBol
  | TypNodTypObj<{[K: string]: TypNodTyp}> // typescript error if not written in {}
/**
 * Variable
 */
type TypNodVarDef = TypNod<{
  key: 'var:def'
  id?: string
  lab?: string
  typ?: TypNodTyp
  val?: TypNodVal
}>
type TypNodVarPut = TypNod<{
  key: 'var:put'
  varDefId?: string
  val?: TypNodVal
}>
/**
 * Function
 */
type TypNodFncDef<
  I extends TypNodTyp = TypNodTyp,
  O extends TypNodTyp = TypNodTyp,
  T extends {key: string; in?: I; out?: O} = {key: string; in?: I; out?: O}
> = TypNod<T>
const NodFncMthAdd: TypNodFncDef = {
  key: 'fnc:mth:add',
  in: {
    key: 'typ:obj',
    prpObj: {
      a: {key: 'typ:num'},
      b: {key: 'typ:num'},
    },
  },
  out: {key: 'typ:num'},
}
const NodFncMthMns: TypNodFncDef = {
  key: 'fnc:mth:mns',
  in: {
    key: 'typ:obj',
    prpObj: {
      a: {key: 'typ:num'},
      b: {key: 'typ:num'},
    },
  },
  out: {key: 'typ:num'},
}
const NodFncStrJon: TypNodFncDef = {
  key: 'fnc:str:jon',
  in: {
    key: 'typ:obj',
    prpObj: {
      a: {key: 'typ:str'},
      b: {key: 'typ:str'},
    },
  },
  out: {key: 'typ:str'},
}
const EXP_FNC_DEF_ARR = [NodFncMthAdd, NodFncMthMns, NodFncStrJon]
