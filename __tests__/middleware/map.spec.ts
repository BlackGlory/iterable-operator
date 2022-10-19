import { getError } from 'return-style'
import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils'
import { map } from '@middleware/map'
import '@blackglory/jest-matchers'

describe(`
  map<T, U>(
    iterable: Iterable<T>
  , fn: (element: T, index: number) => U
  ): IterableIterator<U>
`, () => {
  describe('fn called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()

      const result = map(iter, fn)
      const calledTimesBeforeConsume = getCalledTimes(fn)
      consume(result)
      const calledTimesAfterConsume = getCalledTimes(fn)

      expect(calledTimesBeforeConsume).toBe(0)
      expect(calledTimesAfterConsume).toBe(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })
  })

  describe('call', () => {
    it('return mapped iterable', () => {
      const iter = [1, 2, 3]
      const double = (x: number) => x * 2

      const result = map(iter, double)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([2, 4, 6])
    })

    it('lazy and partial evaluation', () => {
      const iter = new MockIterable([1, 2, 3])
      const fn = jest.fn()

      const result = map(iter, fn)
      const isLazy = iter.nextIndex === 0
      consume(take(result, 1))
      const isPartial = iter.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })
  })

  describe('fn throw error', () => {
    it('throw error when consume', () => {
      const iter = [1, 2, 3]
      const fn = () => { throw new Error('CustomError') }

      const result = map(iter, fn)
      const err = getError(() => toArray(result))

      expect(result).toBeIterable()
      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('CustomError')
    })
  })
})
