import { applyBinding } from '@style/utils'
import { transformAsync as target } from '@middleware/transform-async'

export function transformAsync<T, U>(
  this: Iterable<T>
, transformer: (iterable: Iterable<T>) => AsyncIterable<U>
): AsyncIterable<U>
export function transformAsync<T, U>(
  this: AsyncIterable<T>
, transformer: (iterable: AsyncIterable<T>) => AsyncIterable<U>
): AsyncIterable<U>
export function transformAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
