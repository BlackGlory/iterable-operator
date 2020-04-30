export function some<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): boolean {
  let index = 0
  for (const element of iterable) {
    if (fn(element, index)) return true
    index++
  }
  return false
}
