import { getError } from 'return-style'
import { InvalidArgumentsLengthError } from '@src/error'
import { toArray, MockIterable, take } from '@test/utils'
import { concat } from '@middleware/concat'
import '@test/matchers'

describe('concat<T>(...iterables: Array<Iterable<unknown>>): Iterable<T>', () => {
  it('lazy and partial evaluation', () => {
    const iter1 = new MockIterable([1, 2, 3])
    const iter2: number[] = []

    const result = concat(iter1, iter2)
    const isLazy = iter1.nextIndex === 0
    toArray(take(result, 1))
    const isPartial = iter1.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('size(iterables) < 2', () => {
    it('throw InvalidArgumentsLengthError', () => {
      const iter = [1, 2, 3]

      const err = getError<InvalidArgumentsLengthError>(() => concat(iter))

      expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
      expect(err!.message).toMatch('2')
    })
  })

  describe('size(iterables) >= 2', () => {
    it('return concated iterable', () => {
      const iter1 = [1, 2, 3]
      const iter2 = ['a', 'b', 'c']

      const result = concat(iter1, iter2)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([1, 2, 3, 'a', 'b', 'c'])
    })
  })
})
