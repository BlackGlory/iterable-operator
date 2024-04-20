import { describe, it, expect } from 'vitest'
import { consumeAsync, toArrayAsync, toAsyncIterable, MockAsyncIterable, takeAsync as testTakeAsync } from '@test/utils.js'
import { getError } from 'return-style'
import { takeAsync } from '@src/take-async.js'

describe('takeAsync', () => {
  it('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const count = 2

    const result = takeAsync(iter, count)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(testTakeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('count > size(iterable)', () => {
    it('returns the iterable copy', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 5

      const result = takeAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('0 < count < size(iterable)', () => {
    it('returns the iterable that taken the first count elements', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 2

      const result = takeAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toEqual([1, 2])
    })
  })

  describe('count = 0', () => {
    it('returns the empty iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 0

      const result = takeAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toEqual([])
    })
  })

  describe('count < 0', () => {
    it('throws an error', () => {
      const iter = toAsyncIterable([])
      const count = -1

      const err = getError(() => takeAsync(iter, count))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('count')
    })
  })
})
