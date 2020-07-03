export async function* uniqAsync<T>(iterable: AsyncIterable<T>): AsyncIterable<T> {
  const bucket = new Set<T>()
  for await (const element of iterable) {
    if (!bucket.has(element)) {
      yield element
      bucket.add(element)
    }
  }
}
