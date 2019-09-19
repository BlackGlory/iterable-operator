// pipe
export function* uniq<T>(iterable: Iterable<T>): Iterable<T> {
  yield* new Set(iterable)
}
