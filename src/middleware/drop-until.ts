export function* dropUntil<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown
): Iterable<T> {
  const iterator = iterable[Symbol.iterator]()
  let done: boolean | undefined

  try {
    let index = 0
    let value: T
    while ({ value, done } = iterator.next(), !done) {
      if (predicate(value, index++)) break
    }

    while (!done) {
      yield value
      ;({ value, done } = iterator.next())
    }
  } finally {
    if (!done) iterator.return?.()
  }
}
