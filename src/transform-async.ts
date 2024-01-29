export function transformAsync<T, U>(
  iterable: Iterable<T>
, transformer: (iterable: Iterable<T>) => AsyncIterable<U>
): AsyncIterableIterator<Awaited<U>>
export function transformAsync<T, U>(
  iterable: AsyncIterable<T>
, transformer: (iterable: AsyncIterable<T>) => AsyncIterable<U>
): AsyncIterableIterator<Awaited<U>>
export async function* transformAsync<T>(
  iterable: unknown
, transformer: (iterable: any) => AsyncIterable<T>
): AsyncIterableIterator<Awaited<T>> {
  yield* transformer(iterable)
}
