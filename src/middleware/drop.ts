import { go } from '@blackglory/go'
import { copyIterable } from '../utils'
import { assert } from '@blackglory/errors'

export function drop<T>(iterable: Iterable<T>, count: number): IterableIterator<T> {
  assert(Number.isInteger(count), 'The parameter count must be an integer')
  assert(count >= 0, 'The parameter count must be greater than or equal to 0')
  if (count === 0) return copyIterable(iterable)

  return go(function* () {
    const iterator = iterable[Symbol.iterator]()
    let done: boolean | undefined

    try {
      let value: T
      while ({ value, done } = iterator.next(), !done) {
        if (count <= 0) break
        count--
      }

      while (!done) {
        yield value
        ;({ value, done } = iterator.next())
      }
    } finally {
      if (!done) iterator.return?.()
    }
  })
}
