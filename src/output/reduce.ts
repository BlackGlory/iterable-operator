import { isUndefined } from '@blackglory/types'

export function reduce<T>(
  iterable: Iterable<T>
, fn: (accumulator: T, currentValue: T, index: number) => T
): T
export function reduce<T, U>(
  iterable: Iterable<T>
, fn: (accumulator: U, currentValue: T, index: number) => U
, initialValue: U
): U
export function reduce<T, U>(
  iterable: Iterable<T>
, fn:
    ((accumulator: T, currentValue: T, index: number) => T)
  & ((accumulator: U, currentValue: T, index: number) => U)
, initialValue?: U
) {
  if (isUndefined(initialValue)) {
    return reduceWithoutInitialValue<T>(iterable, fn)
  } else {
    return reduceWithInitialValue<T, U>(iterable, fn, initialValue)
  }
}

function reduceWithInitialValue<T, U>(
  iterable: Iterable<T>
, fn: (accumulator: U, currentValue: T, index: number) => U
, initialValue: U
): U {
  let result: U = initialValue
    , index = 0
  for (const currentValue of iterable) {
    result = fn(result, currentValue, index++)
  }
  return result
}

function reduceWithoutInitialValue<T>(
  iterable: Iterable<T>
, fn: (accumulator: T, currentValue: T, index: number) => T
): T {
  const [initialValue, iterator] = readFirst(iterable)
  let result: T = initialValue
    , index = 1
  while (true) {
    const current = iterator.next()
    if (current.done) break
    const currentValue = current.value
    result = fn(result, currentValue, index++)
  }
  return result

  // If iterable has only single element then return [element, undoneIterator(next done)]
  function readFirst<T>(iterable: Iterable<T>): [T, Iterator<T>] {
    const iterator = iterable[Symbol.iterator]()
    const result = iterator.next()
    if (result.done) throw new Error('Reduce of empty iterable with no initial value')
    return [result.value, iterator]
  }
}
