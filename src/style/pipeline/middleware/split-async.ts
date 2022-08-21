import { getPipelineProxy } from '@style/utils'
import { splitAsync as target } from '@middleware/split-async'

export function splitAsync<T>(
  separator: T
): (iterable: AsyncIterable<T>) => AsyncIterableIterator<T[]>
export function splitAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
