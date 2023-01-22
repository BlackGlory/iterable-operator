import { getError } from 'return-style'
import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils.js'
import { flatMap } from '@src/flat-map.js'
import { jest } from '@jest/globals'

describe('flatMap', () => {
  test('called fn with [element, index]', () => {
    const iter = [1, 2, 3]
    const fn = jest.fn(x => [x])

    const result = flatMap(iter, fn)
    const calledTimesBeforeConsume = getCalledTimes(fn)
    consume(result)
    const calledTimesAfterConsume = getCalledTimes(fn)

    expect(calledTimesBeforeConsume).toBe(0)
    expect(calledTimesAfterConsume).toBe(3)
    expect(fn).nthCalledWith(1, 1, 0)
    expect(fn).nthCalledWith(2, 2, 1)
    expect(fn).nthCalledWith(3, 3, 2)
  })

  it('returns the flatten mapped iterable', () => {
    const iter = [1, 2, 3]
    const double = (x: number) => [x, x * 2]

    const result = flatMap(iter, double)
    const arrResult = toArray(result)

    expect(arrResult).toEqual([1, 2, 2, 4, 3, 6])
  })

  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const fn = jest.fn(x => [x])

    const result = flatMap(iter, fn)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('fn throws an error', () => {
    it('throws an error when consuming iterable', () => {
      const iter = [1, 2, 3]
      const fn = () => { throw new Error('CustomError') }

      const result = flatMap(iter, fn)
      const err = getError(() => toArray(result))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('CustomError')
    })
  })
})
