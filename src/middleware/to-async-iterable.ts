export async function* toAsyncIterable<T>(iterable: Iterable<T | PromiseLike<T>>): AsyncIterable<T> {
  for (const value of iterable) {
    yield value
  }
}
