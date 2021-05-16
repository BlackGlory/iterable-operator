export function last<T>(iterable: Iterable<T>): T | undefined {
  const iterator = iterable[Symbol.iterator]()
  let { value, done } = iterator.next()
  if (done) return undefined

  let result = value
  while ({ value, done } = iterator.next(), !done) {
    result = value
  }
  return result
}
