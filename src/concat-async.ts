import { isAsyncIterable } from '@blackglory/types'
import { go } from '@blackglory/go'
import { Awaitable } from 'justypes'

export function concatAsync<T, U>(
  iterable: Iterable<Awaitable<T>> | AsyncIterable<T>
, ...otherIterables: Array<Iterable<Awaitable<U>> | AsyncIterable<U>>
): AsyncIterableIterator<T | U> {
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