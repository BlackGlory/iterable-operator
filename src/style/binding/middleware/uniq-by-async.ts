import { applyBinding } from '@style/utils'
import { uniqByAsync as target } from '@middleware/uniq-by-async'

export function uniqByAsync<T, U>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => U | PromiseLike<U>): AsyncIterable<T>
export function uniqByAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
