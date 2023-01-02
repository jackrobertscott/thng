import {useState} from 'react'
import {config} from '@/config'
import {local} from '@/utils/local'
/**
 *
 */
export const useLcl = <T>(key: string, data?: T | (() => T)) => {
  const prefixKey = [config.prefix, key].join('.')
  const [current, _currentSet] = useState<T>(local.get(prefixKey) ?? data)
  const currentSet = (value: T) => {
    _currentSet(value)
    if (value === undefined || value === null) local.remove(prefixKey)
    else local.set(prefixKey, value)
  }
  return [current, currentSet] as const
}
