export function* filter<T, U extends T = T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<U> {
  let index = 0
  for (const element of iterable) {
    if (fn(element, index)) yield element as U
    index++
  }
}
