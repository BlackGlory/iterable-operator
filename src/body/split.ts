export function* split<T>(iterable: Iterable<T>, separator: T): Iterable<T[]> {
  let buffer: T[] = []
  for (const element of iterable) {
    if (element === separator) {
      yield buffer
      buffer = []
    } else {
      buffer.push(element)
    }
  }
  yield buffer
}
