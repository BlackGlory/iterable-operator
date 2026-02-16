import { go } from '@blackglory/go'
import { assert } from '@blackglory/errors'
import { isntEmptyArray } from 'extra-utils'

export function repeatAsync<T>(
  iterable: AsyncIterable<T>
, times: number
): AsyncIterableIterator<Awaited<T>> {
  assert(
    times === Infinity || Number.isInteger(times)
  , 'The parameter times must be an integer'
  )
  assert(times >= 0, 'The parameter times must be greater than or equal to 0')

  return go(async function* () {
    const cache: T[] = []
    if (times > 0) {
      for await (const element of iterable) {
        yield element
        cache.push(element)
      }
      times--
    }

    while (isntEmptyArray(cache) && times > 0) {
      yield* cache
      times--
    }
  })
}
