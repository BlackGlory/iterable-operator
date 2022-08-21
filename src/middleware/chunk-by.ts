export function* chunkBy<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): IterableIterator<T[]> {
  let buffer: T[] = []
  let index = 0

  for (const element of iterable) {
    buffer.push(element)
    if (predicate(element, index)) {
      yield buffer
      buffer = []
    }
    index++
  }

  if (buffer.length) yield buffer
}
