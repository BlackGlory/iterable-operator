export function last<T>(iterable: Iterable<T>): T | undefined {
  const iterator = iterable[Symbol.iterator]()
  let done: boolean | undefined

  try {
    let value: T
    let result
    while ({ value, done } = iterator.next(), !done) {
      result = value
    }
    return result
  } finally {
    if (!done) iterator.return?.()
  }
}
