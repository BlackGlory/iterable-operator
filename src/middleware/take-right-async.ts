import { go } from '@blackglory/go'
import { assert } from '@blackglory/errors'

export function takeRightAsync<T>(
  iterable: AsyncIterable<T>
, count: number
): AsyncIterable<T> {
  assert(Number.isInteger(count), 'The parameter count must be an integer')
  assert(count >= 0, 'The parameter count must be greater than or equal to 0')

  return go(async function* () {
    const iterator = iterable[Symbol.asyncIterator]()
    let done: boolean | undefined

    try {
      const buffer: T[] = []
      let value: T
      while ({ value, done } = await iterator.next(), !done) {
        buffer.push(value)
        if (buffer.length > count) buffer.shift()
      }
      yield* buffer
    } finally {
      if (!done) await iterator.return?.()
    }
  })
}
