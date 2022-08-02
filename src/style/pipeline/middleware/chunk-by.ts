import { getPipelineProxy } from '@style/utils'
import { chunkBy as target } from '@middleware/chunk-by'

export function chunkBy<T>(
  predicate: (element: T, index: number) => unknown
): (iterable: Iterable<T>) => Iterable<T[]>
export function chunkBy(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
