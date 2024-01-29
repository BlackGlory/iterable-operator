export async function* splitAsync<T>(
  iterable: AsyncIterable<T>
, separator: T
): AsyncIterableIterator<Array<Awaited<T>>> {
  let buffer: Array<Awaited<T>> = []
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
