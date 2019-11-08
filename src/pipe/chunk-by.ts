export function  chunkBy<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T[]>
export function  chunkBy<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean, drop: boolean): Iterable<T[]>
export function* chunkBy<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean, drop: boolean = false): Iterable<T[]> {
  let buffer: T[] = []
    , index = 0
  for (const element of iterable) {
    if (fn(element, index++)) {
      if (!drop) buffer.push(element)
      yield buffer
      buffer = []
    } else {
      buffer.push(element)
    }
  }
  yield buffer
}
