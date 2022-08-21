import { applyBinding } from '@style/utils'
import { flattenAsync as target } from '@middleware/flatten-async'

export function flattenAsync<T>(this: AsyncIterable<unknown>): AsyncIterableIterator<T>
export function flattenAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
