import { describe, test, expect, it, vi } from 'vitest'
import { getError } from 'return-style'
import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils.js'
import { map } from '@src/map.js'

describe('map', () => {
  test('called fn with [element, index]', () => {
    const iter = [1, 2, 3]
    const fn = vi.fn()

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

  it('returns the mapped iterable', () => {
    const iter = [1, 2, 3]
    const double = (x: number) => x * 2

    const result = map(iter, double)
    const arrResult = toArray(result)

    expect(arrResult).toEqual([2, 4, 6])
  })

  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const fn = vi.fn()

    const result = map(iter, fn)
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

      const result = map(iter, fn)
      const err = getError(() => toArray(result))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('CustomError')
    })
  })
})
