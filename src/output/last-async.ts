export async function lastAsync<T>(iterable: AsyncIterable<T>): Promise<T | undefined> {
  const iterator = iterable[Symbol.asyncIterator]()
  let done: boolean | undefined

  try {
    let value: T
    let result
    while ({ value, done } = await iterator.next(), !done) {
      result = value
    }
    return result
  } finally {
    if (!done) await iterator.return?.()
  }
}
