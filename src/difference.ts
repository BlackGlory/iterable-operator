import { filter } from '@src/filter.js'
import { toSet } from '@src/to-set.js'

export function difference<T>(left: Iterable<T>, right: Iterable<T>): IterableIterator<T> {
  const rightSet = toSet(right)
  return filter(left, x => !rightSet.has(x))
}
