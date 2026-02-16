import { describe, test, expect, vi, it } from 'vitest'
import { getError } from 'return-style'
import { consumeAsync, toArrayAsync, toAsyncIterable, MockAsyncIterable, takeAsync } from '@test/utils.js'
import { repeatAsync } from '@src/repeat-async.js'
import { pass } from '@blackglory/pass'

describe('repeatAsync', () => {
  test('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const times = 2

    const result = repeatAsync(iter, times)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('times > 0', () => {
    it('returns the repeated iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const times = 2

      const result = repeatAsync(iter, times)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toStrictEqual([1, 2, 3, 1, 2, 3])
    })
  })

  describe('times = 0', () => {
    it('returns the empty iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const times = 0

      const result = repeatAsync(iter, times)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toStrictEqual([])
    })
  })

  describe('times < 0', () => {
    it('throws an error', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const times = -1

      const err = getError(() => repeatAsync(iter, times))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('times')
    })
  })

  test('times = Infinity', async () => {
    const iter = toAsyncIterable([])

    const result = repeatAsync(iter, Infinity)
    const arrResult = await toArrayAsync(result)

    expect(arrResult).toStrictEqual([])
  })
})
