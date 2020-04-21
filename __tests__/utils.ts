export function isIterable<T>(val: any): val is Iterable<T> {
  return typeof val[Symbol.iterator] === 'function'
}

export function isAsyncIterable<T>(val: any): val is AsyncIterable<T> {
  return typeof val[Symbol.asyncIterator] === 'function'
}

export function toArray<T>(iterable: Iterable<T>, count: number = Infinity) {
  const result: T[] =[]
  for (const value of iterable) {
    if (count <= 0) break
    result.push(value)
    count--
  }
  return result
}

export async function toArrayAsync<T>(iterable: AsyncIterable<T>, count: number = Infinity) {
  const result: T[] = []
  for await (const value of iterable) {
    if (count <= 0) break
    result.push(value)
    count--
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

export function isCalled(fn: jest.Mock) {
  return fn.mock.calls.length > 0
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

export class MarkIterable implements Iterable<void> {
  #evaluated = false

  ;* [Symbol.iterator]() {
    this.#evaluated = true
  }

  isEvaluated() {
    return this.#evaluated
  }
}

export class MarkAsyncIterable implements AsyncIterable<void> {
  #evaluated = false

  async * [Symbol.asyncIterator]() {
    this.#evaluated = true
  }

  isEvaluated() {
    return this.#evaluated
  }
}
