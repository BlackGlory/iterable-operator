import { InvalidArgumentError } from '@src/error'
export { InvalidArgumentError }

export function chunk<T>(iterable: Iterable<T>, size: number): Iterable<T[]> {
  if (size <= 0) throw new InvalidArgumentError('size', '> 0')

  return (function* () {
    let buffer: T[] = []
    for (const element of iterable) {
      buffer.push(element)
      if (buffer.length >= size) {
        yield buffer
        buffer = []
      }
    }
    yield buffer
  })()
}
