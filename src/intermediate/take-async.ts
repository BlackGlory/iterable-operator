import { go } from '@blackglory/go'
import { assert } from '@blackglory/errors'

export function takeAsync<T>(
  iterable: AsyncIterable<T>
, count: number
): AsyncIterableIterator<T> {
  assert(Number.isInteger(count), 'The parameter count must be an integer')
  assert(count >=0, 'The parameter count must be greater than or equal to 0')

  return go(async function* () {
    if (count === 0) return
    for await (const element of iterable) {
      yield element
      count--
      if (count === 0) break
    }
  })
}
