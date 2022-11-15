export function* flatMap<T, U>(
  iterable: Iterable<T>
, fn: (element: T, index: number) => Iterable<U>
): IterableIterator<U> {
  let index = 0
  for (const element of iterable) {
    yield* fn(element, index)
    index++
  }
}
