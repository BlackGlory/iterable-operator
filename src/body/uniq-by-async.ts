import { isAsyncIterable } from '../utils'

export function uniqByAsync<T, U>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => U | PromiseLike<U>): AsyncIterable<T> {
  if (isAsyncIterable(iterable)) {
    return uniqByAsyncIterable(iterable)
  } else {
    return uniqByIterable(iterable)
  }

  async function* uniqByAsyncIterable(iterable: AsyncIterable<T>) {
    const bucket = new Map<U, T>()
    let index = 0
    for await (const element of iterable) {
      const result = await fn(element, index)
      if (!bucket.has(result)) bucket.set(result, element)
      index++
    }
    yield* bucket.values()
  }

  async function* uniqByIterable(iterable: Iterable<T>) {
    const bucket = new Map<U, T>()
    let index = 0
    for (const element of iterable) {
      const result = await fn(element, index)
      if (!bucket.has(result)) bucket.set(result, element)
      index++
    }
    yield* bucket.values()
  }
}
