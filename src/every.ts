export function every<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): boolean {
  let index = 0
  for (const element of iterable) {
    if (!predicate(element, index)) return false
    index++
  }
  return true
}
