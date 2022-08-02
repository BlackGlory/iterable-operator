import { getPipelineProxy } from '@style/utils'
import { splitBy as target } from '@middleware/split-by'

export function splitBy<T>(
  predicate: (element: T, index: number) => unknown
): (iterable: Iterable<T>) => Iterable<T[]>
export function splitBy(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
