import { applyBinding } from '@style/utils'
import { flattenDeepAsync as target } from '@middleware/flatten-deep-async'

export function flattenDeepAsync<T>(this: AsyncIterable<unknown>): AsyncIterable<T>
export function flattenDeepAsync<T>(this: AsyncIterable<unknown>, depth: number): AsyncIterable<T>
export function flattenDeepAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
