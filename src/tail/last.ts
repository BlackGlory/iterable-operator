import { RuntimeError } from '@src/error'
export { RuntimeError }

export function last<T>(iterable: Iterable<T>): T {
  const iterator = iterable[Symbol.iterator]()
  let { value, done } = iterator.next()
  if (done) throw new RuntimeError('Iterable is empty')
  let result = value
  while ({ value, done } = iterator.next(), !done) {
    result = value
  }
  return result
}
