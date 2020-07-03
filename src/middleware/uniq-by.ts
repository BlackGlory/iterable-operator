export function* uniqBy<T, U>(iterable: Iterable<T>, fn: (element: T, index: number) => U): Iterable<T> {
  const bucket = new Set<U>()
  let index = 0
  for (const element of iterable) {
    const result = fn(element, index)
    if (!bucket.has(result)) {
      yield element
      bucket.add(result)
    }
    index++
  }
}
