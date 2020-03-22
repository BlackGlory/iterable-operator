import { isAsyncIterable } from '../utils'
import { InvalidArgumentsLengthError } from '@error'
export { InvalidArgumentsLengthError }

export function concatAsync<T1, T2>(
  iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
): AsyncIterable<T1 | T2>
export function concatAsync<T1, T2, T3>(
  iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
): AsyncIterable<T1 | T2 | T3>
export function concatAsync<T1, T2, T3, T4>(
  iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
, iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
): AsyncIterable<T1 | T2 | T3 | T4>
export function concatAsync<T1, T2, T3, T4, T5>(
  iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
, iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
, iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
): AsyncIterable<T1 | T2 | T3 | T4 | T5>
export function concatAsync<T1, T2, T3, T4, T5, T6>(
  iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
, iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
, iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
, iterable6: Iterable<T6 | PromiseLike<T6>> | AsyncIterable<T6>
): AsyncIterable<T1 | T2 | T3 | T4 | T5 | T6>
export function concatAsync<T1, T2, T3, T4, T5, T6, T7>(
  iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
, iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
, iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
, iterable6: Iterable<T6 | PromiseLike<T6>> | AsyncIterable<T6>
, iterable7: Iterable<T7 | PromiseLike<T7>> | AsyncIterable<T7>
): AsyncIterable<T1 | T2 | T3 | T4 | T5 | T6 | T7>
export function concatAsync<TResult>(
  ...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>
): AsyncIterable<TResult>
export function concatAsync(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>) {
  if (iterables.length < 2) throw new InvalidArgumentsLengthError('concat', 2, iterables.length)

  return (async function* () {
    for (const iterable of iterables) {
      if (isAsyncIterable(iterable)) {
        for await (const element of iterable) {
          yield element
        }
      } else {
        for (const element of iterable) {
          yield element
        }
      }
    }
  })()
}
