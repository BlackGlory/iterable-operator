import { applyBinding } from '@style/utils'
import { mapAsync as target } from '@middleware/map-async'

export function mapAsync<T, U>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => U | PromiseLike<U>): AsyncIterable<U>
export function mapAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
