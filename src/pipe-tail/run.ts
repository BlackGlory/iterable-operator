// pipe end
export function run(iterable: Iterable<unknown>): void
export function run<T>(iterable: Iterable<T>, fn: (element: T, index: number) => void): void
export function run<T>(iterable: Iterable<T>, fn?: (element: T, index: number) => void): void {
  const iterator = iterable[Symbol.iterator]()
  if (fn) {
    let result, index = 0
    while (result = iterator.next(), !result.done) fn(result.value, index++)
  } else {
    while (!iterator.next().done) {}
  }
}
