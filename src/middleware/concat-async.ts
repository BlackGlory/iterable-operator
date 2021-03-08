import { isAsyncIterable } from '@blackglory/types'
import { go } from '@blackglory/go'

export function concatAsync<T, U>(
  iterable: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, ...otherIterables: Array<Iterable<U | PromiseLike<U>> | AsyncIterable<U>>
): AsyncIterable<T | U> {
  return go(async function* () {
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
  })
}
