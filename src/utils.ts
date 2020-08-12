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
