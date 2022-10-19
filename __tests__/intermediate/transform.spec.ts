import { consume, toArray, MockIterable } from '@test/utils'
import { transform } from '@intermediate/transform'
import { getError } from 'return-style'
import '@blackglory/jest-matchers'

describe('transform', () => {
  it('returns the iterable from transformer', () => {
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

  test('lazy evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const fn = function* (iterable: Iterable<number>) {
      yield* iterable
    }

    const result = transform(iter, fn)
    const isLazy = iter.nextIndex === 0
    consume(result)

    expect(isLazy).toBe(true)
  })

  describe('transformer throws an error', () => {
    it('throws an error', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const result = transform(iter, fn)
      const err = getError(() => toArray(result))

      expect(err).toBe(customError)
    })
  })
})
