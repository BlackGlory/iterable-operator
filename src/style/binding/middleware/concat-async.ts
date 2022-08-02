import { applyBinding } from '@style/utils'
import { concatAsync as target } from '@middleware/concat-async'
import { Awaitable } from 'justypes'

export function concatAsync<T, U>(
  this: Iterable<Awaitable<T>> | AsyncIterable<T>
, ...iterables: Array<Iterable<Awaitable<U>> | AsyncIterable<U>>
): AsyncIterable<T | U>
export function concatAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
