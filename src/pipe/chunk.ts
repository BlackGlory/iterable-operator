// pipe
export function chunk<T>(iterable: Iterable<T>, length: number): Iterable<T[]> {
  if (length <= 0) throw new RangeError('Invalid length value')
  return (function* () {
    let buffer: T[] = []
    for (const element of iterable) {
      buffer.push(element)
      if (buffer.length === length) {
        yield buffer
        buffer = []
      }
    }
    yield buffer
  })()
}
