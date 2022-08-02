import { applyBinding } from '@style/utils'
import { dropRightAsync as target } from '@middleware/drop-right-async'

export function dropRightAsync<T>(
  this: AsyncIterable<T>
, count: number
): AsyncIterable<T>
export function dropRightAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
