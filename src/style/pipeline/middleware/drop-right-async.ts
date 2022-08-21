import { getPipelineProxy } from '@style/utils'
import { dropRightAsync as target } from '@middleware/drop-right-async'

export function dropRightAsync<T>(
  count: number
): (iterable: AsyncIterable<T>) => AsyncIterableIterator<T>
export function dropRightAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
