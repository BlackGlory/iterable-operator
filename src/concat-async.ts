import { go } from '@blackglory/go'
import { Awaitable } from 'justypes'

export function concatAsync<T, U>(
  iterable: Iterable<Awaitable<T>> | AsyncIterable<T>
, ...otherIterables: Array<Iterable<Awaitable<U>> | AsyncIterable<U>>
): AsyncIterableIterator<T | U> {
  return go(async function* () {
    for (const iter of [iterable, ...otherIterables]) {
      for await (const element of iter) {
        yield element
      }
    }
  })
}
