export function* takeUntil<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): IterableIterator<T> {
  let index = 0

  for (const element of iterable) {
    if (predicate(element, index)) break
    yield element
    index++
  }
}
