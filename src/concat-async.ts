import { go } from '@blackglory/go'
import { Awaitable } from 'justypes'

export function concatAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, ...otherIterables: Array<Iterable<Awaitable<U>> | AsyncIterable<Awaitable<U>>>
): AsyncIterableIterator<Awaited<T> | Awaited<U>> {
  return go(async function* () {
    for (const iter of [iterable, ...otherIterables]) {
      for await (const element of iter) {
        yield element
      }
    }
  })
}
