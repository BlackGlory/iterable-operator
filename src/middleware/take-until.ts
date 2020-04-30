export function* takeUntil<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T> {
  let index = 0
  for (const element of iterable) {
    if (fn(element, index)) break
    yield element
    index++
  }
}
