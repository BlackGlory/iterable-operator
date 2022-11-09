import { filter } from '@src/filter'
import { toSet } from '@src/to-set'

export function intersection<T>(left: Iterable<T>, right: Iterable<T>): IterableIterator<T> {
  const rightSet = toSet(right)
  return filter(left, x => rightSet.has(x))
}
