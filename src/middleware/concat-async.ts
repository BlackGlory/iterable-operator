import { isAsyncIterable } from '@blackglory/types'

export function concatAsync<T, U>(
  iterable: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, ...otherIterables: Array<Iterable<U | PromiseLike<U>> | AsyncIterable<U>>
): AsyncIterable<T | U> {
  return (async function* () {
    for (const iter of [iterable, ...otherIterables]) {
      if (isAsyncIterable(iter)) {
        for await (const element of iter) {
          yield element
        }
      } else {
        for (const element of iter) {
          yield element
        }
      }
    }
  })()
}
