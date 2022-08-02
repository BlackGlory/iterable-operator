import { isIterable, isntChar } from '@blackglory/types'

export function flattenBy<T>(
  iterable: Iterable<unknown>
, predicate: (element: unknown, level: number) => unknown
): Iterable<T> {
  return flatten(iterable, predicate, 1)
}

function* flatten<T>(
  iterable: Iterable<unknown>
, predicate: (element: unknown, level: number) => unknown
, level: number
): Iterable<T> {
  for (const element of iterable) {
    if (isFiniteIterable(element) && predicate(element, level)) {
      yield* flatten<T>(element, predicate, level + 1)
    } else {
      yield element as T
    }
  }
}

function isFiniteIterable<T>(val: unknown): val is Iterable<T> {
  return isIterable(val) && isntChar(val)
}
