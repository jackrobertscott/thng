import {Filter} from 'mongodb'
/**
 *
 */
export const falsy = <T = any>(key: keyof T) =>
  ({$or: [{[key]: {$exists: false}}, {[key]: {$eq: false}}]} as Filter<T>)
