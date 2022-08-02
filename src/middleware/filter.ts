export function* filter<T, U extends T = T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): Iterable<U> {
  let index = 0
  for (const element of iterable) {
    if (predicate(element, index)) yield element as U
    index++
  }
}
