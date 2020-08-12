import { isIterable, isntChar } from '@blackglory/types'

export function flattenBy<T>(iterable: Iterable<unknown>, fn: (element: unknown, level: number) => boolean): Iterable<T> {
  return flatten(iterable, 1)

  function* flatten<T>(iterable: Iterable<unknown>, level: number): Iterable<T> {
    for (const element of iterable) {
      if (isFiniteIterable(element) && fn(element, level)) {
        yield* flatten<T>(element, level + 1)
      } else {
        yield element as T
      }
    }
  }
}

function isFiniteIterable<T>(val: unknown): val is Iterable<T> {
  return isIterable(val) && isntChar(val)
}
