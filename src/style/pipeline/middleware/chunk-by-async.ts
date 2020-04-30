import { getPipelineProxy } from '@style/utils'
import { chunkByAsync as target } from '@middleware/chunk-by-async'

export function chunkByAsync<T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T[]>
export function chunkByAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
