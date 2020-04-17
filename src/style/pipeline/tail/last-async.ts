import { getPipelineProxy } from '@style/utils'
import { lastAsync as target } from '@tail/last-async'

export function lastAsync<T>(): (iterable: AsyncIterable<T>) => Promise<T>
export function lastAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
