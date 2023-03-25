import { isUndefined } from 'extra-utils'
import { Awaitable } from 'justypes'
import { isAsyncIterable } from '@src/is-async-iterable.js'

export function reduceAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (accumulator: T, currentValue: T, index: number) => Awaitable<T>
): Promise<T>
export function reduceAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (accumulator: U, currentValue: T, index: number) => Awaitable<U>
, initialValue: U
): Promise<U>
export function reduceAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn:
    ((accumulator: T, currentValue: T, index: number) => Awaitable<T>)
  & ((accumulator: U, currentValue: T, index: number) => Awaitable<U>)
, initialValue?: U
) {
  if (isUndefined(initialValue)) {
    return reduceAsyncWithoutInitialValue<T>(iterable, fn)
  } else {
    return reduceAsyncWithInitialValue<T, U>(iterable, fn, initialValue)
  }
}

async function reduceAsyncWithInitialValue<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (accumulator: U, currentValue: T, index: number) => Awaitable<U>
, initialValue: U
): Promise<U> {
  let result: U = initialValue
    , index = 0
  for await (const currentValue of iterable) {
    result = await fn(result, currentValue, index++)
  }
  return result
}

function reduceAsyncWithoutInitialValue<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (accumulator: T, currentValue: T, index: number) => Awaitable<T>
): Promise<T> {
  if (isAsyncIterable(iterable)) {
    return reduceAsyncIterable(iterable)
  } else {
    return reduceIterable(iterable)
  }

  async function reduceAsyncIterable(iterable: AsyncIterable<T>): Promise<T> {
    const iterator = iterable[Symbol.asyncIterator]()
    let done: boolean | undefined

    try {
      let result: T = await readInitialValue(iterator)
      let index = 1
      let value: T
      while ({ value, done } = await iterator.next(), !done) {
        result = await fn(result, value, index++)
      }
      return result
    } finally {
      if (!done) await iterator.return?.()
    }

    async function readInitialValue<T>(
      iterator: AsyncIterator<T>
    ): Promise<T> {
      const result = await iterator.next()
      if (result.done) {
        done = true
        throw new Error('Reduce of empty iterable with no initial value')
      }
      return result.value
    }
  }

  async function reduceIterable(iterable: Iterable<T>): Promise<T> {
    const iterator = iterable[Symbol.iterator]()
    let done: boolean | undefined

    try {
      let result: T = readInitialValue(iterator)
      let index = 1
      let value: T
      while ({ value, done } = iterator.next(), !done) {
        result = await fn(result, value, index++)
      }
      return result
    } finally {
      if (!done) iterator.return?.()
    }

    function readInitialValue<T>(iterator: Iterator<T>): T {
      const result = iterator.next()
      if (result.done) {
        done = true
        throw new Error('Reduce of empty iterable with no initial value')
      }
      return result.value
    }
  }
}
