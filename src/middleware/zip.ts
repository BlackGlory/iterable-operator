export function zip<T, U extends Array<Iterable<unknown>>>(
  iterable: Iterable<T>
, ...otherIterables: U
): Iterable<[T, ...ExtractTypeTupleFromIterableTuple<U>]> {
  return zipWithSize(iterable, ...otherIterables) as Iterable<[T, ...ExtractTypeTupleFromIterableTuple<U>]>
}

function* zipWithSize<T>(...iterables: Array<Iterable<T>>): Iterable<T[]> {
  const length = iterables.length
  const iterators = iterables.map(iterable => iterable[Symbol.iterator]())
  while (true) {
    const result = new Array<T>(length)
    for (let i = 0; i < length; i++) {
      const { value, done } = iterators[i].next()
      if (done) return
      result[i] = value
    }
    yield result
  }
}
