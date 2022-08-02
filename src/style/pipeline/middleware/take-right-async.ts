import { getPipelineProxy } from '@style/utils'
import { takeRightAsync as target } from '@middleware/take-right-async'

export function takeRightAsync<T>(
  count: number
): (iterable: AsyncIterable<T>) => AsyncIterable<T>
export function takeRightAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
