import { getPipelineProxy } from '@style/utils'
import { lastAsync as target } from '@output/last-async'

export function lastAsync<T>(): (
  iterable: AsyncIterable<T>
) => Promise<T | undefined>
export function lastAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
