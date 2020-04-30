import { getPipelineProxy } from '@style/utils'
import { toSetAsync as target } from '@output/to-set-async'

export function toSetAsync<T>(): (iterable: AsyncIterable<T>) => Promise<Set<T>>
export function toSetAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
