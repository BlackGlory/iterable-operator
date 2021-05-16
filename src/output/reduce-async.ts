import { isAsyncIterable, isUndefined } from '@blackglory/types'

export function reduceAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (accumulator: T, currentValue: T, index: number) => T | PromiseLike<T>
): Promise<T>
export function reduceAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (accumulator: U, currentValue: T, index: number) => U | PromiseLike<U>
, initialValue: U
): Promise<U>
export function reduceAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn:
    ((accumulator: T, currentValue: T, index: number) => T | PromiseLike<T>)
  & ((accumulator: U, currentValue: T, index: number) => U | PromiseLike<U>)
, initialValue?: U
) {
  if (isUndefined(initialValue)) {
    return reduceAsyncWithoutInitialValue<T>(iterable, fn)
  } else {
    return reduceAsyncWithInitialValue<T, U>(iterable, fn, initialValue)
  }
}

function reduceAsyncWithInitialValue<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (accumulator: U, currentValue: T, index: number) => U | PromiseLike<U>
, initialValue: U
): Promise<U> {
  if (isAsyncIterable(iterable)) {
    return reduceAsyncIterable(iterable)
  } else {
    return reduceIterable(iterable)
  }

  async function reduceIterable(iterable: Iterable<T>) {
    let result: U = initialValue
      , index = 0
    for (const currentValue of iterable) {
      result = await fn(result, currentValue, index++)
    }
    return result
  }

  async function reduceAsyncIterable(iterable: AsyncIterable<T>) {
    let result: U = initialValue
      , index = 0
    for await (const currentValue of iterable) {
      result = await fn(result, currentValue, index++)
    }
    return result
  }
}

function reduceAsyncWithoutInitialValue<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (accumulator: T, currentValue: T, index: number) => T | PromiseLike<T>
): Promise<T> {
  if (isAsyncIterable(iterable)) {
    return reduceAsyncIterable(iterable)
  } else {
    return reduceIterable(iterable)
  }

  async function reduceAsyncIterable(iterable: AsyncIterable<T>) {
    const [initialValue, iterator] = await readFirst(iterable)
    let result: T = initialValue
      , index = 1
    while (true) {
      const current = await iterator.next()
      if (current.done) break
      const currentValue = current.value
      result = await fn(result, currentValue, index++)
    }
    return result

    async function readFirst<T>(
      iterable: AsyncIterable<T>
    ): Promise<[T, AsyncIterator<T>]> {
      const iterator = iterable[Symbol.asyncIterator]()
      const result = await iterator.next()
      if (result.done) {
        throw new Error('Reduce of empty iterable with no initial value')
      }
      return [result.value, iterator]
    }
  }

  async function reduceIterable(iterable: Iterable<T>) {
    const [initialValue, iterator] = readFirst(iterable)
    let result: T = initialValue
      , index = 1
    while (true) {
      const current = iterator.next()
      if (current.done) break
      const currentValue = current.value
      result = await fn(result, currentValue, index++)
    }
    return result

    function readFirst<T>(iterable: Iterable<T>): [T, Iterator<T>] {
      const iterator = iterable[Symbol.iterator]()
      const result = iterator.next()
      if (result.done) {
        throw new Error('Reduce of empty iterable with no initial value')
      }
      return [result.value, iterator]
    }
  }
}
