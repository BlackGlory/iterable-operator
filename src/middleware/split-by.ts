export function* splitBy<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T[]> {
  let buffer: T[] = []
    , index = 0
  for (const element of iterable) {
    if (fn(element, index)) {
      yield buffer
      buffer = []
    } else {
      buffer.push(element)
    }
    index++
  }
  yield buffer
}
