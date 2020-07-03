import { toArray, MockIterable } from '@test/utils'
import { transform } from '@middleware/transform'
import { getError } from 'return-style'
import '@test/matchers'

describe('transform<T, U>(iterable: Iterable<T>, transformer: (iterable: Iterable<T>) => Iterable<U>): Iterable<U>', () => {
  describe('call', () => {
    it('return result from transformer', () => {
      const iter = [1, 2, 3]
      const double = function* (iterable: Iterable<number>) {
        for (const element of iterable) {
          yield element * 2
        }
      }

      const result = transform(iter, double)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([2, 4, 6])
    })

    it('lazy evaluation', () => {
      const iter = new MockIterable([1, 2, 3])
      const fn = function* (iterable: Iterable<number>) {
        yield* iterable
      }

      const result = transform(iter, fn)
      const isLazy = iter.nextIndex === 0
      toArray(result)

      expect(isLazy).toBe(true)
    })
  })

  describe('transformer throw error', () => {
    it('throw error', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const result = transform(iter, fn)
      const err = getError(() => toArray(result))

      expect(err).toBe(customError)
    })
  })
})
