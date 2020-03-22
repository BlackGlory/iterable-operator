import { getPipelineProxy } from '@style/utils'
import { toArray as target } from '@tail/to-array'

export function toArray<T>(): (iterable: Iterable<T>) => T[]
export function toArray(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
