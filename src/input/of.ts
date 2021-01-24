export function* of<T>(val: T): Iterable<T> {
  yield val
}
