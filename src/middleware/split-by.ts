export function* splitBy<T>(iterable: Iterable<T>, predicate: (element: T, index: number) => unknown): Iterable<T[]> {
  let buffer: T[] = []
  let index = 0

  for (const element of iterable) {
    if (predicate(element, index)) {
      yield buffer
      buffer = []
    } else {
      buffer.push(element)
    }
    index++
  }

  yield buffer
}
