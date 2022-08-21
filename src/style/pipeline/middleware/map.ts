import { getPipelineProxy } from '@style/utils'
import { map as target } from '@middleware/map'

export function map<T, U>(
  fn: (element: T, index: number) => U
): (iterable: Iterable<T>) => IterableIterator<U>
export function map(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
