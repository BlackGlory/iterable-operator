import { getPipelineProxy } from '@style/utils'
import { repeatAsync as target } from '@middleware/repeat-async'

export function repeatAsync<T>(
  times: number
): (iterable: AsyncIterable<T>) => AsyncIterableIterator<T>
export function repeatAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
