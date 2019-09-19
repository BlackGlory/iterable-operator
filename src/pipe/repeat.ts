// pipe
export function repeat<T>(iterable: Iterable<T>): Iterable<T>
export function repeat<T>(iterable: Iterable<T>, times: number): Iterable<T>
export function repeat<T>(iterable: Iterable<T>, times: number = Infinity): Iterable<T> {
  if (times < 0) throw new RangeError('Invalid times value')
  return (function* () {
    if (times === 0) return
    while (times--) yield* iterable
  })()
}
