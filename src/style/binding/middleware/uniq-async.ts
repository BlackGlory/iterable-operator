import { applyBinding } from '@style/utils'
import { uniqAsync as target } from '@middleware/uniq-async'

export function uniqAsync<T>(this: AsyncIterable<T>): AsyncIterableIterator<T>
export function uniqAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
