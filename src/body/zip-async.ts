import { InvalidArgumentsLengthError } from '@src/error'
import { isAsyncIterable } from '../utils'
export { InvalidArgumentsLengthError }

export function zipAsync<T1, T2>(
  iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
): AsyncIterable<Array<T1 | T2>>
export function zipAsync<T1, T2, T3>(
  iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
): AsyncIterable<Array<T1 | T2 | T3>>
export function zipAsync<T1, T2, T3, T4>(
  iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
, iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
): AsyncIterable<Array<T1 | T2 | T3 | T4>>
export function zipAsync<T1, T2, T3, T4, T5>(
  iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
, iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
, iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
): AsyncIterable<Array<T1 | T2 | T3 | T4 | T5>>
export function zipAsync<T1, T2, T3, T4, T5, T6>(
  iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
, iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
, iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
, iterable6: Iterable<T6 | PromiseLike<T6>> | AsyncIterable<T6>
): AsyncIterable<Array<T1 | T2 | T3 | T4 | T5 | T6>>
export function zipAsync<T1, T2, T3, T4, T5, T6, T7>(
  iterable1: Iterable<T1 | PromiseLike<T1>> | AsyncIterable<T1>
, iterable2: Iterable<T2 | PromiseLike<T2>> | AsyncIterable<T2>
, iterable3: Iterable<T3 | PromiseLike<T3>> | AsyncIterable<T3>
, iterable4: Iterable<T4 | PromiseLike<T4>> | AsyncIterable<T4>
, iterable5: Iterable<T5 | PromiseLike<T5>> | AsyncIterable<T5>
, iterable6: Iterable<T6 | PromiseLike<T6>> | AsyncIterable<T6>
, iterable7: Iterable<T7 | PromiseLike<T7>> | AsyncIterable<T7>
): AsyncIterable<Array<T1 | T2 | T3 | T4 | T5 | T6 | T7>>
export function zipAsync<TResult>(
  ...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>
): AsyncIterable<TResult[]>
export function zipAsync<TResult>(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): AsyncIterable<TResult[]> {
  if (iterables.length < 2) throw new InvalidArgumentsLengthError('zip', 2, iterables.length)

  return zipWithSize(iterables, iterables.length)
}

async function* zipWithSize<T>(iterables: Array<Iterable<any> | AsyncIterable<any>>, size: number): AsyncIterable<T[]> {
  const iterators: Array<[Symbol, Iterator<T> | AsyncIterator<T>]> = iterables.map(iterable => {
    if (isAsyncIterable(iterable)) {
      return [Symbol.asyncIterator, iterable[Symbol.asyncIterator]()]
    } else {
      return [Symbol.iterator, iterable[Symbol.iterator]()]
    }
  })
  while (true) {
    const result = new Array<T>(size)
    for (let i = 0, dones = 0; i < size; i++) {
      const [type, iterator] = iterators[i]
      let temp: IteratorResult<T>
      if (type === Symbol.asyncIterator) {
        temp = await (iterator as AsyncIterator<T>).next()
      } else {
        temp = (iterator as Iterator<T>).next()
      }
      if (temp.done) {
        dones++
        if (dones === size) return
      }
      result[i] = temp.value
    }
    yield result
  }
}
