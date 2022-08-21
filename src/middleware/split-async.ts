export async function* splitAsync<T>(
  iterable: AsyncIterable<T>
, separator: T
): AsyncIterableIterator<T[]> {
  let buffer: T[] = []
  for await (const element of iterable) {
    if (element === separator) {
      yield buffer
      buffer = []
    } else {
      buffer.push(element)
    }
  }
  yield buffer
}
