export function* transform<T, U>(iterable: Iterable<T>, transformer: (iterable: Iterable<T>) => Iterable<U>): Iterable<U> {
  yield* transformer(iterable)
}
