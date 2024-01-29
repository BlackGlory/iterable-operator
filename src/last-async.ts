export async function lastAsync<T>(
  iterable: AsyncIterable<T>
): Promise<Awaited<T> | undefined> {
  const iterator = iterable[Symbol.asyncIterator]()
  let done: boolean | undefined

  try {
    let value: T
    let result
    while ({ value, done } = await iterator.next(), !done) {
      result = value
    }
    return await result
  } finally {
    if (!done) await iterator.return?.()
  }
}
