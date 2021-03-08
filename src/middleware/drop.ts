import { go } from '@blackglory/go'
import { copyIterable } from '../utils'
import { InvalidArgumentError } from '@src/error'
export { InvalidArgumentError }

export function drop<T>(iterable: Iterable<T>, count: number): Iterable<T> {
  if (count < 0) throw new InvalidArgumentError('count', '>= 0')

  if (count === 0) return copyIterable(iterable)
  return go(function* () {
    const iterator = iterable[Symbol.iterator]()
    let result: IteratorResult<T>
    while (result = iterator.next(), !result.done) {
      if (count <= 0) break
      count--
    }
    while (!result.done) {
      yield result.value
      result = iterator.next()
    }
  })
}
