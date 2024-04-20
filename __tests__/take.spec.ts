import { describe, test, expect, it } from 'vitest'
import { consume, toArray, MockIterable, take as testTake } from '@test/utils.js'
import { getError } from 'return-style'
import { take } from '@src/take.js'

describe('take', () => {
  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const count = 2

    const result = take(iter, count)
    const isLazy = iter.nextIndex === 0
    consume(testTake(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('count > size(iterable)', () => {
    it('returns the iterable copy', () => {
      const iter = [1, 2, 3]
      const count = 5

      const result = take(iter, count)
      const arrResult = toArray(result)

      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('0 < count < size(iterable)', () => {
    it('returns the iterable that take first count elements', () => {
      const iter = [1, 2, 3]
      const count = 2

      const result = take(iter, count)
      const arrResult = toArray(result)

      expect(arrResult).toEqual([1, 2])
    })
  })

  describe('count = 0', () => {
    it('returns the empty iterable', () => {
      const iter = [1, 2, 3]
      const count = 0

      const result = take(iter, count)
      const arrResult = toArray(result)

      expect(arrResult).toEqual([])
    })
  })

  describe('count < 0', () => {
    it('throws an error', () => {
      const iter: number[] = []
      const count = -1

      const err = getError(() => take(iter, count))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('count')
    })
  })
})
