import { getError } from 'return-style'
import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils'
import { uniqBy } from '@middleware/uniq-by'
import '@test/matchers'

describe('uniqBy<T, U>(iterable: Iterable<T>, fn: (element: T, index: number) => U): Iterable<T>', () => {
  describe('fn called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()

      const result = uniqBy(iter, fn)
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
    it('return iterable unique by fn', () => {
      const iter = [1, 2, 3]
      const modTwo = (x: number) => x % 2

      const result = uniqBy(iter, modTwo)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([1, 2])
    })

    it('lazy and partial evaluation', () => {
      const iter = new MockIterable([1, 2, 3])
      const fn = () => true

      const result = uniqBy(iter, fn)
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

      const result = uniqBy(iter, fn)
      const err = getError(() => toArray(result))

      expect(result).toBeIterable()
      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('CustomError')
    })
  })
})
