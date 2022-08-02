import { getPipelineProxy } from '@style/utils'
import { uniqBy as target } from '@middleware/uniq-by'

export function uniqBy<T, U>(
  fn: (element: T, index: number) => U
): (iterable: Iterable<T>) => Iterable<T>
export function uniqBy(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
