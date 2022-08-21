import { applyBinding } from '@style/utils'
import { flattenDeepAsync as target } from '@middleware/flatten-deep-async'

export function flattenDeepAsync<T>(
  this: AsyncIterable<unknown>
): AsyncIterableIterator<T>
export function flattenDeepAsync<T>(
  this: AsyncIterable<unknown>
, depth: number
): AsyncIterableIterator<T>
export function flattenDeepAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
