import { InvalidArgumentError } from '@error'
export { InvalidArgumentError }

export function chunkAsync<T>(iterable: AsyncIterable<T>, size: number): AsyncIterable<T[]> {
  if (size <= 0) throw new InvalidArgumentError('size', '> 0')

  return (async function* () {
    let buffer: T[] = []
    for await (const element of iterable) {
      buffer.push(element)
      if (buffer.length >= size) {
        yield buffer
        buffer = []
      }
    }
    yield buffer
  })()
}
