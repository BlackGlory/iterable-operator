export async function* joinAsync<T, U = T>(
  iterable: AsyncIterable<T>
, separator: U
): AsyncIterableIterator<Awaited<T> | U> {
  let first = true

  for await (const element of iterable) {
    if (first) {
      first = false
    } else {
      yield separator
    }
    yield element
  }
}
