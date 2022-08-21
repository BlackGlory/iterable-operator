import { getPipelineProxy } from '@style/utils'
import { flattenAsync as target } from '@middleware/flatten-async'

export function flattenAsync<T>(): (
  iterable: AsyncIterable<unknown>
) => AsyncIterableIterator<T>
export function flattenAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
