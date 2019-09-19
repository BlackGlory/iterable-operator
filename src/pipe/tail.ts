// pipe
export function tail<T>(iterable: Iterable<T>): Iterable<T>
export function tail<T>(iterable: Iterable<T>, count: number): Iterable<T>
export function tail<T>(iterable: Iterable<T>, count: number = 1): Iterable<T> {
  if (count < 0) throw new RangeError('Invalid count value')
  return (function* () {
    const iterator = iterable[Symbol.iterator]()
    const buffer: T[] = []
    let result: IteratorResult<T>
    while (result = iterator.next(), !result.done) {
      buffer.push(result.value)
      if (buffer.length > count) {
        buffer.shift()
      }
    }
    yield* buffer
  })()
}
