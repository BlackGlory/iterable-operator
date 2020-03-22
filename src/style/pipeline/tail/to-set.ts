import { getPipelineProxy } from '@style/utils'
import { toSet as target } from '@tail/to-set'

export function toSet<T>(): (iterable: Iterable<T>) => Set<T>
export function toSet(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
