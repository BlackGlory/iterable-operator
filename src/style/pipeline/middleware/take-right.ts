import { getPipelineProxy } from '@style/utils'
import { takeRight as target } from '@middleware/take-right'

export function takeRight<T>(
  count: number
): (iterable: Iterable<T>) => IterableIterator<T>
export function takeRight(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
