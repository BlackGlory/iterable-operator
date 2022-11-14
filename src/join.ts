export function* join<T, U = T>(
  iterable: Iterable<T>
, separator: U
): IterableIterator<T | U> {
  let first = true

  for (const element of iterable) {
    if (first) {
      first = false
    } else {
      yield separator
    }
    yield element
  }
}
