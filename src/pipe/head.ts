export function head<T>(iterable: Iterable<T>): Iterable<T>
export function head<T>(iterable: Iterable<T>, count: number): Iterable<T>
export function head<T>(iterable: Iterable<T>, count: number = 1) {
  if (count < 0) throw new RangeError('Invalid count value')
  return (function* () {
    for (const element of iterable) {
      if (--count < 0) break
      yield element
    }
  })()
}
