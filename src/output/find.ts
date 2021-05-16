export function find<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): T | undefined {
  let index = 0

  for (const element of iterable) {
    if (predicate(element, index)) return element
    index++
  }

  return undefined
}
