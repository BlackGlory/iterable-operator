import { go } from '@blackglory/go'
import { copyAsyncIterable } from '../utils'
import { assert } from '@blackglory/errors'

export function dropAsync<T>(
  iterable: AsyncIterable<T>
, count: number
): AsyncIterable<T> {
  assert(Number.isInteger(count), 'The parameter count must be an integer')
  assert(count >= 0, 'The parameter count must be greater than or equal to 0')
  if (count === 0) return copyAsyncIterable(iterable)

  return go(async function* () {
    const iterator = iterable[Symbol.asyncIterator]()
    let done: boolean | undefined

    try {
      let value: T
      while ({ value, done} = await iterator.next(), !done) {
        if (count <= 0) break
        count--
      }

      while (!done) {
        yield value
        ;({ value, done } = await iterator.next())
      }
    } finally {
      if (!done) await iterator.return?.()
    }
  })
}
