export function* uniq<T>(iterable: Iterable<T>): IterableIterator<T> {
  const bucket = new Set<T>()
  for (const element of iterable) {
    if (!bucket.has(element)) {
      yield element
      bucket.add(element)
    }
  }
}
