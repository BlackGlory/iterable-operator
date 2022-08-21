import { getPipelineProxy } from '@style/utils'
import { flattenBy as target } from '@middleware/flatten-by'

export function flattenBy<T>(
  predicate: (element: unknown, level: number) => unknown
): (iterable: Iterable<unknown>) => IterableIterator<T>
export function flattenBy(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
