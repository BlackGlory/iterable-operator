import { go } from '@blackglory/go'
import { assert } from '@blackglory/errors'

export function chunk<T>(iterable: Iterable<T>, size: number): IterableIterator<T[]> {
  assert(Number.isInteger(size), 'The parameter size must be an integer')
  assert(size > 0, 'The parameter size must be greater than 0')

  return go(function* () {
    let buffer: T[] = []
    for (const element of iterable) {
      buffer.push(element)
      if (buffer.length >= size) {
        yield buffer
        buffer = []
      }
    }
    if (buffer.length) yield buffer
  })
}
