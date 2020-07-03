import { getError } from 'return-style'
import { InvalidArgumentsLengthError } from '@src/error'
import { toArray, MockIterable } from '@test/utils'
import { zip } from '@middleware/zip'
import '@test/matchers'

describe('zip<T>(...iterables: Array<Iterable<unknown>>): Iterable<T>', () => {
  describe('size(iterables) < 2', () => {
    it('throw InvalidArgumentsLengthError', () => {
      const iter = [1, 2, 3]

      const err = getError<InvalidArgumentsLengthError>(() => zip(iter))

      expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
      expect(err!.message).toMatch('2')
    })
  })

  describe('size(iterables) >= 2', () => {
    it('lazy evaluation', () => {
      const iter1 = new MockIterable([1, 2, 3])
      const iter2: unknown[] = []

      const result = zip(iter1, iter2)
      const isLazy = iter1.nextIndex === 0
      toArray(result)
      const isPartial = iter1.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })

    describe('iterables have same size', () => {
      it('return zipped iterable', () => {
        const iter1 = [1, 2, 3]
        const iter2 = ['a', 'b', 'c']

        const result = zip(iter1, iter2)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
      })
    })

    describe('iterables have not same size', () => {
      it('return zipped iterable by the shortest iterable', () => {
        const iter1 = [1, 2, 3]
        const iter2 = ['a', 'b']

        const result = zip(iter1, iter2)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 'a'], [2, 'b']])
      })
    })
  })
})
