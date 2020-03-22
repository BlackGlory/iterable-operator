import { getPipelineProxy } from '@style/utils'
import { toArrayAsync as target } from '@tail/to-array-async'

export function toArrayAsync<T>(): (iterable: AsyncIterable<T>) => Promise<T[]>
export function toArrayAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
