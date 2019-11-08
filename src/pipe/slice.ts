export function slice<T>(iterable: Iterable<T>): Iterable<T>
export function slice<T>(iterable: Iterable<T>, start: number): Iterable<T>
export function slice<T>(iterable: Iterable<T>, start: number, end: number): Iterable<T>
export function slice<T>(iterable: Iterable<T>, start: number = 0, end: number = Infinity) {
  if (start < 0 || start >= end) throw new RangeError('Invalid start value')
  return (function* () {
    let index = 0
    for (const element of iterable) {
      if (index >= end) break
      if (index >= start) yield element
      index++
    }
  })()
}
