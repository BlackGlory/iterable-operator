import { getPipelineProxy } from '@style/utils'
import { groupBy as target } from '@output/group-by'

export function groupBy<T, U>(
  fn: (element: T, index: number) => U
): (iterable: Iterable<T>) => Map<U, T[]>
export function groupBy(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
