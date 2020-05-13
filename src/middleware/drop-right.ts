import { copyIterable } from '../utils'
import { InvalidArgumentError } from '@src/error'
export { InvalidArgumentError }

export function dropRight<T>(iterable: Iterable<T>, count: number): Iterable<T> {
  if (count < 0) throw new InvalidArgumentError('count', '>= 0')

  if (count === 0) return copyIterable(iterable)
  return (function* () {
    const arr = Array.from(iterable)
    yield* arr.slice(0, -count)
  })()
}