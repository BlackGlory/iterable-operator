export async function* flatMapAsync<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>
, fn: (element: T, index: number) => Iterable<U> | AsyncIterable<U>
): AsyncIterableIterator<U> {
  let index = 0
  for await (const element of iterable) {
    yield* fn(element, index)
    index++
  }
}
