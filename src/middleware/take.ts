import { InvalidArgumentError } from '@src/error'
export { InvalidArgumentError }

export function take<T>(iterable: Iterable<T>, count: number): Iterable<T> {
  if (count < 0) throw new InvalidArgumentError('count', '>= 0')

  return (function* () {
    for (const element of iterable) {
      if (count <= 0) break
      yield element
      count--
    }
  })()
}
