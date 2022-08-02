import { isAsyncIterable } from '@blackglory/types'

export function dropUntilAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
): AsyncIterable<T> {
  if (isAsyncIterable(iterable)) {
    return dropUntilAsyncIterable(iterable, predicate)
  } else {
    return dropUntilIterable(iterable, predicate)
  }
}

async function* dropUntilAsyncIterable<T>(
  iterable: AsyncIterable<T>
, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
) {
  const iterator = iterable[Symbol.asyncIterator]()
  let done: boolean | undefined

  try {
    let index = 0
    let value: T
    while ({ value, done } = await iterator.next(), !done) {
      if (await predicate(value, index++)) break
    }

    while (!done) {
      yield value
      ;({ value, done } = await iterator.next())
    }
  } finally {
    if (!done) await iterator.return?.()
  }
}

async function* dropUntilIterable<T>(
  iterable: Iterable<T>
, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
) {
  const iterator = iterable[Symbol.iterator]()
  let done: boolean | undefined

  try {
    let index = 0
    let value: T

    while ({ value, done } = iterator.next(), !done) {
      if (await predicate(value, index++)) break
    }

    while (!done) {
      yield value
      ;({ value, done } = iterator.next())
    }
  } finally {
    if (!done) iterator.return?.()
  }
}
