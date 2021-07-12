import { getError } from 'return-style'
import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils'
import { tap } from '@middleware/tap'
import '@blackglory/jest-matchers'

describe(`
  tap<T>(iterable: Iterable<T>, fn: (element: T, index: number) => unknown): Iterable<T>
`, () => {
  describe('fn is called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()

      const result = tap(iter, fn)
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
    it('call fn and return iterable', () => {
      const iter = [1, 2, 3]
      const sideResult: Array<[number, number]> = []
      const pushToSideResult = (x: number, i: number) => sideResult.push([x, i])

      const result = tap(iter, pushToSideResult)
      const isSideResultEmptyInStage1 = !sideResult.length
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(isSideResultEmptyInStage1).toBe(true)
      expect(arrResult).toEqual([1, 2, 3])
      expect(sideResult).toEqual([[1, 0], [2, 1], [3, 2]])
    })

    it('lazy and partial evaluation', () => {
      const iter = new MockIterable([1, 2, 3])
      const fn = jest.fn()

      const result = tap(iter, fn)
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
      const justThrow = () => { throw new Error('CustomError') }

      const result = tap(iter, justThrow)
      const err = getError(() => toArray(result))

      expect(result).toBeIterable()
      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('CustomError')
    })
  })
})
