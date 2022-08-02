import { applyBinding } from '@style/utils'
import { reduceAsync as target } from '@output/reduce-async'
import { Awaitable } from 'justypes'

export function reduceAsync<T>(
  this: Iterable<T> | AsyncIterable<T>
, fn: (accumulator: T, currentValue: T, index: number) => Awaitable<T>
): Promise<T>
export function reduceAsync<T, U>(
  this: Iterable<T> | AsyncIterable<T>
, fn: (accumulator: U, currentValue: T, index: number) => Awaitable<U>
, initialValue: U
): Promise<U>
export function reduceAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
