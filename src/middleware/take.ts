import { go } from '@blackglory/go'
import { InvalidArgumentError } from '@src/error'
export { InvalidArgumentError }

export function take<T>(iterable: Iterable<T>, count: number): Iterable<T> {
  if (count < 0) throw new InvalidArgumentError('count', '>= 0')

  return go(function* () {
    if (count === 0) return
    for (const element of iterable) {
      yield element
      count--
      if (count === 0) break
    }
  })
}
