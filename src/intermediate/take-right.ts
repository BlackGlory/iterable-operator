import { go } from  '@blackglory/go'
import { assert } from '@blackglory/errors'

export function takeRight<T>(
  iterable: Iterable<T>
, count: number
): IterableIterator<T> {
  assert(Number.isInteger(count), 'The parameter count must be an integer')
  assert(count >= 0, 'The parameter count must be greater than or equal to 0')

  return go(function* () {
    const iterator = iterable[Symbol.iterator]()
    let done: boolean | undefined

    try {
      const buffer: T[] = []
      let value: T
      while ({ value, done } = iterator.next(), !done) {
        buffer.push(value)
        if (buffer.length > count) buffer.shift()
      }
      yield* buffer
    } finally {
      if (!done) iterator.return?.()
    }
  })
}
