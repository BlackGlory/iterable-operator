export async function* uniqAsync<T>(
  iterable: AsyncIterable<T>
): AsyncIterableIterator<Awaited<T>> {
  const bucket = new Set<Awaited<T>>()
  for await (const element of iterable) {
    if (!bucket.has(element)) {
      yield element
      bucket.add(element)
    }
  }
}
