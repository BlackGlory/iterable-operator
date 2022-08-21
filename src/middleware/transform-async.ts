export function transformAsync<T, U>(
  iterable: Iterable<T>
, transformer: (iterable: Iterable<T>) => AsyncIterable<U>
): AsyncIterableIterator<U>
export function transformAsync<T, U>(
  iterable: AsyncIterable<T>
, transformer: (iterable: AsyncIterable<T>) => AsyncIterable<U>
): AsyncIterableIterator<U>
export async function* transformAsync<T>(
  iterable: unknown
, transformer: (...args: any[]) => AsyncIterable<T>
): AsyncIterableIterator<T> {
  yield* transformer(iterable)
}
