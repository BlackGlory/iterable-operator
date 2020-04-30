export function* uniqBy<T, U>(iterable: Iterable<T>, fn: (element: T, index: number) => U): Iterable<T> {
  const bucket = new Map<U, T>()
  let index = 0
  for (const element of iterable) {
    const result = fn(element, index)
    if (!bucket.has(result)) bucket.set(result, element)
    index++
  }
  yield* bucket.values()
}
