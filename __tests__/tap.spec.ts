import { getError } from 'return-style'
import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils.js'
import { tap } from '@src/tap.js'
import { jest } from '@jest/globals'

describe('tap', () => {
  test('called fn with [element, index]', () => {
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

  it('returns the iterable', () => {
    const iter = [1, 2, 3]
    const sideResult: Array<[number, number]> = []
    const pushToSideResult = (x: number, i: number) => sideResult.push([x, i])

    const result = tap(iter, pushToSideResult)
    const isSideResultEmptyInStage1 = !sideResult.length
    const arrResult = toArray(result)

    expect(isSideResultEmptyInStage1).toBe(true)
    expect(arrResult).toEqual([1, 2, 3])
    expect(sideResult).toEqual([[1, 0], [2, 1], [3, 2]])
  })

  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const fn = jest.fn()

    const result = tap(iter, fn)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('fn throws an error', () => {
    it('throws an error when consuming iterable', () => {
      const iter = [1, 2, 3]
      const justThrow = () => { throw new Error('CustomError') }

      const result = tap(iter, justThrow)
      const err = getError(() => toArray(result))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('CustomError')
    })
  })
})
