import { go } from '@blackglory/go'
import { assert } from '@blackglory/errors'
import { copyAsyncIterable } from './utils.js'
import { toArrayAsync } from '@src/to-array-async.js'

export function dropRightAsync<T>(
  iterable: AsyncIterable<T>
, count: number
): AsyncIterableIterator<T> {
  assert(Number.isInteger(count), 'The parameter count must be an integer')
  assert(count >= 0, 'The parameter count must be greater than or equal to 0')
  if (count === 0) return copyAsyncIterable(iterable)

  return go(async function* () {
    const arr = await toArrayAsync(iterable)
    const result = arr.slice(0, -count)
    for (const value of result) {
      yield value
    }
  })
}
