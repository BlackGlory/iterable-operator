import { applyBinding } from '@style/utils'
import { uniqAsync as target } from '@middleware/uniq-async'

export function uniqAsync<T>(iterable: AsyncIterable<T>): AsyncIterable<T>
export function uniqAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
