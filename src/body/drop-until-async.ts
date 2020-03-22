import { isAsyncIterable } from '../utils'

export function dropUntilAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | Promise<boolean>): AsyncIterable<T> {
  if (isAsyncIterable(iterable)) {
    return dropUntilAsyncIterable(iterable)
  } else {
    return dropUntilIterable(iterable)
  }

  async function* dropUntilAsyncIterable(iterable: AsyncIterable<T>) {
    const iterator = iterable[Symbol.asyncIterator]()
    let index = 0
    let result: IteratorResult<T>
    while (result = await iterator.next(), !result.done) {
      if (await fn(result.value, index++)) break
    }
    while (!result.done) {
      yield result.value
      result = await iterator.next()
    }
  }

  async function* dropUntilIterable(iterable: Iterable<T>) {
    const iterator = iterable[Symbol.iterator]()
    let index = 0
    let result: IteratorResult<T>
    while (result = iterator.next(), !result.done) {
      if (await fn(result.value, index++)) break
    }
    while (!result.done) {
      yield result.value
      result = iterator.next()
    }
  }
}
