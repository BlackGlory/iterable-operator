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
): T | U {
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
  const iterator = iterable[Symbol.iterator]()
  let done: boolean | undefined

  try {
    let result: T = readInitialValue(iterator)
    let index = 1
    let value: T
    while ({ value, done } = iterator.next(), !done) {
      result = fn(result, value, index++)
    }
    return result
  } finally {
    if (!done) iterator.return?.()
  }

  // If iterable has only single element then return [element, undoneIterator(next done)]
  function readInitialValue<T>(iterator: Iterator<T>): T {
    const result = iterator.next()
    if (result.done) {
      done = true
      throw new Error('Reduce of empty iterable with no initial value')
    }
    return result.value
  }
}
