import { applyBinding } from '@style/utils'
import { findAsync as target } from '@tail/find-async'

export function findAsync<T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): Promise<T>
export function findAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
