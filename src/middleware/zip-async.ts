import { isAsyncIterable } from '@blackglory/types'
import { GetTypeOfIterable } from '@src/utils'

export type ExtractTypeTupleFromAsyncLikeIterableTuple<T> = {
  [K in keyof T]:
    T[K] extends AsyncIterable<infer U> ? U :
      T[K] extends Iterable<PromiseLike<infer V>> ? V :
        GetTypeOfIterable<T[K]>
}

export function zipAsync<T, U extends Array<Iterable<unknown> | AsyncIterable<unknown>>>(
  iterable: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, ...otherIterables: U
): AsyncIterable<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]> {
  return zipWithSize(iterable, ...otherIterables) as AsyncIterable<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]>
}

async function* zipWithSize<T>(...iterables: Array<Iterable<T | PromiseLike<T>> | AsyncIterable<T>>): AsyncIterable<T[]> {
  const length = iterables.length
  const iterators: Array<[Symbol, Iterator<T | PromiseLike<T>> | AsyncIterator<T>]> = iterables.map(iterable => {
    if (isAsyncIterable(iterable)) {
      return [Symbol.asyncIterator, iterable[Symbol.asyncIterator]()]
    } else {
      return [Symbol.iterator, iterable[Symbol.iterator]()]
    }
  })
  while (true) {
    const result = new Array<T>(length)
    for (let i = 0; i < length; i++) {
      const [type, iterator] = iterators[i]
      let temp: IteratorResult<T>
      if (type === Symbol.asyncIterator) {
        temp = await (iterator as AsyncIterator<T>).next()
      } else {
        temp = (iterator as Iterator<T>).next()
      }
      if (temp.done) return
      result[i] = temp.value
    }
    yield result
  }
}
