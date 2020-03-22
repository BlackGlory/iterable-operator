export function isAsyncIterable<T>(val: any): val is AsyncIterable<T> {
  return typeof val[Symbol.asyncIterator] === 'function'
}

export async function* copyAsyncIterable<T>(iterable: AsyncIterable<T>) {
  for await (const element of iterable) {
    yield element
  }
}

export function* copyIterable<T>(iterable: Iterable<T>) {
  for (const element of iterable) {
    yield element
  }
}
