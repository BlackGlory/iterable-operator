export function* dropUntil<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T> {
  const iterator = iterable[Symbol.iterator]()
  let index = 0
  let result: IteratorResult<T>
  while (result = iterator.next(), !result.done) {
    if (fn(result.value, index++)) break
  }
  while (!result.done) {
    yield result.value
    result = iterator.next()
  }
}
