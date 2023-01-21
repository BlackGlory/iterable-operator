import { GetTypeOfIterable } from './utils.js'

export type ExtractTypeTupleFromIterableTuple<T> = {
  [K in keyof T]: GetTypeOfIterable<T[K]>
}

export function zip<T, U extends Array<Iterable<unknown>>>(
  iterable: Iterable<T>
, ...otherIterables: U
): IterableIterator<[T, ...ExtractTypeTupleFromIterableTuple<U>]> {
  return zipWithSize(
    iterable
  , ...otherIterables
  ) as IterableIterator<[T, ...ExtractTypeTupleFromIterableTuple<U>]>
}

function* zipWithSize<T>(...iterables: Array<Iterable<T>>): IterableIterator<T[]> {
  const length = iterables.length
  const iterators = iterables.map(iterable => iterable[Symbol.iterator]())
  const dones = iterators.map(() => false)

  try {
    while (true) {
      const result = new Array<T>(length)
      for (let i = 0; i < length; i++) {
        const { value, done } = iterators[i].next()
        if (done) {
          dones[i] = true
          return
        }
        result[i] = value
      }
      yield result
    }
  } finally {
    const undoneIterators = iterators.filter((_, i) => !dones[i])
    undoneIterators.forEach(x => x.return?.())
  }
}
