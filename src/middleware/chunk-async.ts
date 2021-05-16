import { go } from '@blackglory/go'
import { assert } from '@blackglory/errors'

export function chunkAsync<T>(
  iterable: AsyncIterable<T>
, size: number
): AsyncIterable<T[]> {
  assert(Number.isInteger(size), 'The parameter size must be an integer')
  assert(size > 0, 'The parameter size must be greater than 0')

  return go(async function* () {
    let buffer: T[] = []
    for await (const element of iterable) {
      buffer.push(element)
      if (buffer.length >= size) {
        yield buffer
        buffer = []
      }
    }
    if (buffer.length) yield buffer
  })
}
