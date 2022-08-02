import { applyBinding } from '@style/utils'
import { findAsync as target } from '@output/find-async'
import { Awaitable } from 'justypes'

export function findAsync<T>(
  this: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<T | undefined>
export function findAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
