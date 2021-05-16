export async function lastAsync<T>(iterable: AsyncIterable<T>): Promise<T | undefined> {
  const iterator = iterable[Symbol.asyncIterator]()
  let { value, done } = await iterator.next()
  if (done) return undefined

  let result = value
  while ({ value, done } = await iterator.next(), !done) {
    result = value
  }
  return result
}
