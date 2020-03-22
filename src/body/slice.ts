import { InvalidArgumentError } from '@error'
export { InvalidArgumentError }

export function slice<T>(iterable: Iterable<T>, start: number): Iterable<T>
export function slice<T>(iterable: Iterable<T>, start: number, end: number): Iterable<T>
export function slice<T>(iterable: Iterable<T>, start: number, end: number = Infinity): Iterable<T> {
  if (start < 0) throw new InvalidArgumentError('start', '>= 0')
  if (end < start) throw new InvalidArgumentError('end', '>= start')

  return (function* () {
    let index = 0
    for (const element of iterable) {
      if (index >= end) break
      if (index >= start) yield element
      index++
    }
  })()
}
