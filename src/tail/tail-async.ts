import { RuntimeError } from '@src/error'
export { RuntimeError }

export async function tailAsync<T>(iterable: AsyncIterable<T>): Promise<T> {
  const iterator = iterable[Symbol.asyncIterator]()
  let { value, done } = await iterator.next()
  if (done) throw new RuntimeError('Iterable is empty')
  let result = value
  while ({ value, done } = await iterator.next(), !done) {
    result = value
  }
  return result
}
