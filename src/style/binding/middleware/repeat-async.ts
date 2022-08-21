import { applyBinding } from '@style/utils'
import { repeatAsync as target } from '@middleware/repeat-async'

export function repeatAsync<T>(
  this: AsyncIterable<T>
, times: number
): AsyncIterableIterator<T>
export function repeatAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
