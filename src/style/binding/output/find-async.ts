import { applyBinding } from '@style/utils'
import { findAsync as target } from '@output/find-async'

export function findAsync<T>(this: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<T>
export function findAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
