export function* dropUntil<T>(iterable: Iterable<T>, predicate: (element: T, index: number) => unknown): Iterable<T> {
  const iterator = iterable[Symbol.iterator]()

  let index = 0
  let result: IteratorResult<T>

  while (result = iterator.next(), !result.done) {
    if (predicate(result.value, index++)) break
  }

  while (!result.done) {
    yield result.value
    result = iterator.next()
  }
}
