import { getPipelineProxy } from '@style/utils'
import { reduceAsync as target } from '@tail/reduce-async'

export function reduceAsync<T>(
  fn: (accumulator: T, currentValue: T, index: number) => T | PromiseLike<T>
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<T>
export function reduceAsync<T, U>(
  fn: (accumulator: U, currentValue: T, index: number) => U | PromiseLike<U>
, initialValue: U
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<U>
export function reduceAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
