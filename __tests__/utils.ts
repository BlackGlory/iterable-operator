import { pass } from '@blackglory/pass'

export function toArray<T>(iterable: Iterable<T>, count: number = Infinity): T[] {
  const result: T[] =[]
  for (const value of iterable) {
    result.push(value)
    count--
    if (count <= 0) break
  }
  return result
}

export async function toArrayAsync<T>(
  iterable: AsyncIterable<T>
, count: number = Infinity
): Promise<T[]> {
  const result: T[] = []
  for await (const value of iterable) {
    result.push(value)
    count--
    if (count <= 0) break
  }
  return result
}

export function consume<T>(iterable: Iterable<T>): void {
  for (const _ of iterable) {
    pass()
  }
}

export async function consumeAsync<T>(iterable: AsyncIterable<T>) {
  for await (const _ of iterable) {
    pass()
  }
}

export function getCalledTimes(fn: jest.Mock) {
  return fn.mock.calls.length
}

export function* toIterable<T>(iterable: Iterable<T>): Iterable<T> {
  for (const element of iterable) {
    yield element
  }
}

export async function* toAsyncIterable<T>(iterable: Iterable<T>): AsyncIterable<T> {
  for (const element of iterable) {
    yield element
  }
}

export function toAsyncFunction<T extends unknown[], U>(
  fn: (...args: T) => U
): (...args: T) => Promise<U>  {
  return async (...args: T) => fn(...args)
}

export function toFunction<T extends unknown[], U>(
  fn: (...args: T) => U
): (...args: T) => U {
  return (...args: T) => fn(...args)
}

export class MockIterable<T> implements Iterable<T> {
  nextIndex: number = 0
  done: boolean = false
  iterator: Iterator<T>
  returnCalled: boolean = false

  constructor(contents: Iterable<T> = []) {
    this.iterator = contents[Symbol.iterator]()
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        const { value, done } = this.iterator.next()
        if (done) {
          this.done = true
          return { value, done } as const
        } else {
          this.nextIndex++
          return { value, done } as const
        }
      }
    , return: () => {
        this.returnCalled = true
        this.done = true
        this.iterator.return?.()
        return { done: true, value: undefined } as const
      }
    }
  }
}

export class MockAsyncIterable<T> implements AsyncIterable<T> {
  nextIndex: number = 0
  done: boolean = false
  iterator: Iterator<T>
  returnCalled: boolean = false

  constructor(contents: Iterable<T> = []) {
    this.iterator = contents[Symbol.iterator]()
  }

  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        const { value, done } = this.iterator.next()
        if (done) {
          this.done = true
          return { value, done } as const
        } else {
          this.nextIndex++
          return { value, done } as const
        }
      }
    , return: async () => {
        this.returnCalled = true
        this.done = true
        this.iterator.return?.()
        return { done: true, value: undefined } as const
      }
    }
  }
}

export function* take<T>(iterable: Iterable<T>, count: number): Iterable<T> {
  if (count === 0) return
  for (const element of iterable) {
    yield element
    count--
    if (count === 0) break
  }
}

export async function* takeAsync<T>(
  iterable: AsyncIterable<T>, count: number
): AsyncIterable<T> {
  if (count === 0) return
  for await (const element of iterable) {
    yield element
    count--
    if (count === 0) break
  }
}
