export function transformAsync<T, U>(iterable: Iterable<T>, transformer: (iterable: Iterable<T>) => AsyncIterable<U>): AsyncIterable<U>
export function transformAsync<T, U>(iterable: AsyncIterable<T>, transformer: (iterable: AsyncIterable<T>) => AsyncIterable<U>): AsyncIterable<U>
export async function* transformAsync<T>(iterable: unknown, transformer: (...args: any[]) => AsyncIterable<T>): AsyncIterable<T> {
  yield* transformer(iterable)
}
