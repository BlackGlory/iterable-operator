import { applyBinding } from '@style/utils'
import { eachAsync as target } from '@output/each-async'

export function eachAsync<T>(
  this: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => unknown | PromiseLike<unknown>
): Promise<void>
export function eachAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
