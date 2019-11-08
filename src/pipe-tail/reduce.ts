import { BreakFlag, ContinueFlag } from '../$'

export function reduce<T>(iterable: Iterable<T>, fn: (previousValue: T | undefined, currentValue: T, currentIndex: number) => T): T
export function reduce<T>(iterable: Iterable<T>, fn: (previousValue: T, currentValue: T, currentIndex: number) => T, initialValue: T): T
export function reduce<T, U>(iterable: Iterable<T>, fn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U
export function reduce<T, U>(iterable: Iterable<T>, fn: (previousValue: U | undefined, currentValue: T, currentIndex: number) => U, initialValue?: U) {
  let result = initialValue
    , index = 0
  for (const current of iterable) {
    try {
      result = fn(result, current, index++)
    } catch (e) {
      if (e === BreakFlag) break
      if (e === ContinueFlag) continue
      throw e
    }
  }
  return result
}
