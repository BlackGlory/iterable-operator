export function toArray<T>(iterable: Iterable<T>, count: number = Infinity) {
  const result: T[] =[]
  for (const value of iterable) {
    result.push(value)
    count--
    if (count <= 0) break
  }
  return result
}

export async function toArrayAsync<T>(iterable: AsyncIterable<T>, count: number = Infinity) {
  const result: T[] = []
  for await (const value of iterable) {
    result.push(value)
    count--
    if (count <= 0) break
  }
  return result
}

export function consume<T>(iterable: Iterable<T>) {
  for (const _ of iterable) {}
}

export async function consumeAsync<T>(iterable: AsyncIterable<T>) {
  for await (const _ of iterable) {}
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

export function toAsyncFunction<T extends unknown[], U>(fn: (...args: T) => U): (...args: T) => Promise<U>  {
  return async (...args: T) => fn(...args)
}

export function toFunction<T extends unknown[], U>(fn: (...args: T) => U): (...args: T) => U {
  return (...args: T) => fn(...args)
}

export class MockIterable<T> implements Iterable<T> {
  nextIndex: number = 0

  constructor(private contents: T[] = []) {}

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.contents.length) {
          this.nextIndex++
          return { value: this.contents.shift()!, done: false } as const
        } else {
          return { value: undefined, done: true } as const
        }
      }
    , return: () => {
        return { done: true, value: undefined } as const
      }
    }
  }
}

export class MockAsyncIterable<T> implements AsyncIterable<T> {
  nextIndex: number = 0

  constructor(private contents: T[] = []) {}

  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        if (this.contents.length) {
          this.nextIndex++
          return { value: this.contents.shift()!, done: false } as const
        } else {
          return { value: undefined, done: true } as const
        }
      }
    , return: async () => {
        return { done: true, value: undefined } as const
      }
    }
  }
}

export function* take<T>(iterable: Iterable<T>, count: number) {
  if (count === 0) return
  for (const element of iterable) {
    yield element
    count--
    if (count === 0) break
  }
}

export async function* takeAsync<T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T> {
  if (count === 0) return
  for await (const element of iterable) {
    yield element
    count--
    if (count === 0) break
  }
}
