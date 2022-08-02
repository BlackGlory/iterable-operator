import { getPipelineProxy } from '@style/utils'
import { filter as target } from '@middleware/filter'

export function filter<T, U extends T = T>(
  predicate: (element: T, index: number) => unknown
): (iterable: Iterable<T>) => Iterable<U>
export function filter(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
