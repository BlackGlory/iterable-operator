import { isString } from '@blackglory/types'
import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils'
import { flattenBy } from '@src/flatten-by'
import { getError } from 'return-style'
import '@blackglory/jest-matchers'

describe('flattenBy', () => {
  test('called fn with [element, level]', () => {
    const iter = [0, [1]]
    const fn = jest.fn().mockReturnValue(true)

    const result = flattenBy(iter, fn)
    const calledTimesBeforeConsume = getCalledTimes(fn)
    consume(result)
    const calledTimesAfterConsume = getCalledTimes(fn)

    expect(calledTimesBeforeConsume).toBe(0)
    expect(calledTimesAfterConsume).toBe(1)
    expect(fn).nthCalledWith(1, [1], 1)
  })

  it('returns the flat iterable', () => {
    const iter = [
      'one', ['two']
    , 0, [1]
    ]
    const exceptString = (x: unknown) => !isString(x)

    const result = flattenBy(iter, exceptString)
    const arrResult = toArray(result)

    expect(result).toBeIterable()
    expect(arrResult).toEqual([
      'one', 'two'
    , 0, 1
    ])
  })

  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const fn = () => false

    const result = flattenBy(iter, fn)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('iterable is empty', () => {
    it('returns the empty iterable', () => {
      const iter: number[] = []
      const fn = () => true

      const result = flattenBy(iter, fn)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('iterable is string', () => {
    it('returns the iterable chars', () => {
      const iter = '123'
      const fn = () => true

      const result = flattenBy(iter, fn)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual(['1', '2', '3'])
    })
  })

  describe('fn throws an error', () => {
    it('throws an error when consuming iterable', () => {
      const customError = new Error('CustomError')
      const iter = [[1]]
      const fn = () => { throw customError }

      const result = flattenBy(iter, fn)
      const err = getError(() => toArray(result))

      expect(result).toBeIterable()
      expect(err).toBe(customError)
    })
  })
})
