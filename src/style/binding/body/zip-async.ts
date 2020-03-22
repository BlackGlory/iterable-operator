import { applyBinding } from '@style/utils'
import { zipAsync as target } from '@body/zip-async'

export function zipAsync<T, T1>(
  this: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, iterable: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
): AsyncIterable<Array<T | T1>>
export function zipAsync<T, T1, T2>(
  this: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
): AsyncIterable<Array<T | T1 | T2>>
export function zipAsync<T, T1, T2, T3>(
  this: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
): AsyncIterable<Array<T | T1 | T2 | T3>>
export function zipAsync<T, T1, T2, T3, T4>(
  this: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
, iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
): AsyncIterable<Array<T | T1 | T2 | T3 | T4>>
export function zipAsync<T, T1, T2, T3, T4, T5>(
  this: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
, iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
, iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
): AsyncIterable<Array<T | T1 | T2 | T3 | T4 | T5>>
export function zipAsync<T, T1, T2, T3, T4, T5, T6>(
  this: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
, iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
, iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
, iterable6: Iterable<T6 | PromiseLike<T6>> | AsyncIterable<T6>
): AsyncIterable<Array<T | T1 | T2 | T3 | T4 | T5 | T6>>
export function zipAsync<T, T1, T2, T3, T4, T5, T6, T7>(
  this: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
, iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
, iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
, iterable6: Iterable<T6 | PromiseLike<T6>> | AsyncIterable<T6>
, iterable7: Iterable<T7 | PromiseLike<T7>> | AsyncIterable<T7>
): AsyncIterable<Array<T | T1 | T2 | T3 | T4 | T5 | T6 | T7>>
export function zipAsync<TResult>(
  this: Iterable<unknown | PromiseLike<unknown>> | AsyncIterable<unknown>
, ...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>
): AsyncIterable<TResult[]>
export function zipAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
