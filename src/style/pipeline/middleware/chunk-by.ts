import { getPipelineProxy } from '@style/utils'
import { chunkBy as target } from '@middleware/chunk-by'

export function chunkBy<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T[]>
export function chunkBy(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
