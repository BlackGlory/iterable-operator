import { getPipelineProxy } from '@style/utils'
import { transformAsync as target } from '@middleware/transform-async'

export function transformAsync<T, U>(
  transformer: (iterable: Iterable<T>) => AsyncIterable<U>
): (iterable: Iterable<T>) => AsyncIterable<U>
export function transformAsync<T, U>(
  transformer: (iterable: AsyncIterable<T>) => AsyncIterable<U>
): (iterable: AsyncIterable<T>) => AsyncIterable<U>
export function transformAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
