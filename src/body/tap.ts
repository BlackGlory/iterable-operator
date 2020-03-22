export function* tap<T>(iterable: Iterable<T>, fn: (element: T, index: number) => unknown): Iterable<T> {
  let index = 0
  for (const element of iterable) {
    fn(element, index)
    yield element
    index++
  }
}
