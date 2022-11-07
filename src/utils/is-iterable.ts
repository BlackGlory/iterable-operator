import { isFunction, isntNull, isntUndefined } from '@blackglory/types'

export function isIterable<T>(val: unknown): val is Iterable<T> {
  return isntNull(val)
      && isntUndefined(val)
      && isFunction((val as any)[Symbol.iterator])
}

export function isntIterable<T>(val: T): val is Exclude<T, Iterable<unknown>> {
  return !isIterable(val)
}
