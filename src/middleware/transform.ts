export function* transform<T, U>(
  iterable: Iterable<T>
, transformer: (iterable: Iterable<T>) => Iterable<U>
): IterableIterator<U> {
  yield* transformer(iterable)
}
