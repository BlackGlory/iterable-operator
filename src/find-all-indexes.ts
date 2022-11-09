import { pipe } from 'extra-utils'
import { map } from '@src/map'
import { filter } from '@src/filter'

export function findAllIndexes<T>(
  iterable: Iterable<T>
, predicate: (value: T, index: number) => unknown
): IterableIterator<number> {
  return pipe(
    iterable
  , iterable => map(iterable, (x, i) => [x, i] as const)
  , iterable => filter(iterable, ([x, i]) => predicate(x, i))
  , iterable => map(iterable, ([_, i]) => i)
  )
}
