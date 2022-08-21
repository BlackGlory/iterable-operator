import { applyBinding } from '@style/utils'
import { sliceAsync as target } from '@middleware/slice-async'

export function sliceAsync<T>(
  this: AsyncIterable<T>
, start: number
): AsyncIterableIterator<T>
export function sliceAsync<T>(
  this: AsyncIterable<T>
, start: number
, end: number
): AsyncIterableIterator<T>
export function sliceAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
