import { getPipelineProxy } from '@style/utils'
import { reduceAsync as target } from '@output/reduce-async'
import { Awaitable } from 'justypes'

export function reduceAsync<T>(
  fn: (accumulator: T, currentValue: T, index: number) => Awaitable<T>
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<T>
export function reduceAsync<T, U>(
  fn: (accumulator: U, currentValue: T, index: number) => Awaitable<U>
, initialValue: U
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<U>
export function reduceAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
