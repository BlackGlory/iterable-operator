export function each<T>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => unknown
): void {
  let index = 0
  for (const element of iterable) {
    fn(element, index)
    index++
  }
}
