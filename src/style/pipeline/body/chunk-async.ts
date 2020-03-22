import { getPipelineProxy } from '@style/utils'
import { chunkAsync as target } from '@body/chunk-async'

export function chunkAsync<T>(size: number): (iterable: AsyncIterable<T>) => AsyncIterable<T[]>
export function chunkAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
