export function* chunkBy<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T[]> {
  let buffer: T[] = []
    , index = 0
  for (const element of iterable) {
    buffer.push(element)
    if (fn(element, index)) {
      yield buffer
      buffer = []
    }
    index++
  }
  yield buffer
}
