import {random} from './random'
/**
 *
 */
export const idobj = {
  /**
   *
   */
  add<T extends {id: string; [K: string]: any}>(
    idArray: T[],
    obj: Omit<T, 'id'> & {id?: string}
  ) {
    return [...idArray, {id: obj.id || random.string(), ...obj}]
  },
  /**
   *
   */
  upsert<T extends {id: string; [K: string]: any}>(idArray: T[], obj: T) {
    return idArray.findIndex((i) => i.id === obj.id) !== -1
      ? idArray.map((i) => (i.id === obj.id ? obj : i))
      : [...idArray, {...obj, id: obj.id || random.string()}]
  },
  /**
   *
   */
  set<T extends {id: string; [K: string]: any}>(idArray: T[], obj: T) {
    return idArray.map((i) => (i.id === obj.id ? obj : i))
  },
  /**
   *
   */
  del<T extends {id: string; [K: string]: any}>(idArray: T[], id: string) {
    return idArray.filter((i) => i.id !== id)
  },
  /**
   *
   */
  pop<T extends {id: string; [K: string]: any}>(idArray: T[]) {
    return idArray.slice(0, -1)
  },
}
