import { isntNull, isntUndefined, isFunction } from 'extra-utils'

export function isAsyncIterable<T>(val: unknown): val is AsyncIterable<T> {
  return isntNull(val)
      && isntUndefined(val)
      && isFunction((val as any)[Symbol.asyncIterator])
}

export function isntAsyncIterable<T>(
  val: T
): val is Exclude<T, AsyncIterable<unknown>> {
  return !isAsyncIterable(val)
}
