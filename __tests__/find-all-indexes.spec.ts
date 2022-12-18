import { getError } from 'return-style'
import { findAllIndexes } from '@src/find-all-indexes'
import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils'

describe('findAllIndexes', () => {
  test('called fn with [element, index]', () => {
    const iter = [1, 2, 3]
    const fn = jest.fn()

    const result = findAllIndexes(iter, fn)
    const calledTimesBeforeConsume = getCalledTimes(fn)
    consume(result)
    const calledTimesAfterConsume = getCalledTimes(fn)

    expect(calledTimesBeforeConsume).toBe(0)
    expect(calledTimesAfterConsume).toBe(3)
    expect(fn).nthCalledWith(1, 1, 0)
    expect(fn).nthCalledWith(2, 2, 1)
    expect(fn).nthCalledWith(3, 3, 2)
  })

  test('return the indexes iterable', () => {
    const iter = [1, 2, 3]
    const odd = (x: number) => x % 2 === 1

    const result = findAllIndexes(iter, odd)
    const arrResult = toArray(result)

    expect(arrResult).toEqual([0, 2])
  })

  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const fn = () => true

    const result = findAllIndexes(iter, fn)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('fn throws an error', () => {
    it('throws an error when consume', () => {
      const iter = [1, 2, 3]
      const fn = () => { throw new Error('CustomError') }

      const result = findAllIndexes(iter, fn)
      const err = getError(() => toArray(result))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('CustomError')
    })
  })
})
