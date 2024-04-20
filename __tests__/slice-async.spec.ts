import { describe, test, expect, it } from 'vitest'
import { getError } from 'return-style'
import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable, takeAsync } from '@test/utils.js'
import { sliceAsync } from '@src/slice-async.js'

describe('sliceAsync', () => {
  test('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const start = 0
    const end = 10

    const result = sliceAsync(iter, start, end)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('start < 0', () => {
    it('throws an error', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const start = -1
      const end = 1

      const err = getError(() => sliceAsync(iter, start, end))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('start')
    })
  })

  describe('start >= 0', () => {
    describe('start >= size(iterable', () => {
      it('returns the empty iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const start = 3
        const end = 5

        const result = sliceAsync(iter, start, end)
        const arrResult = await toArrayAsync(result)

        expect(arrResult).toEqual([])
      })
    })

    describe('start < size(iterable)', () => {
      describe('start < end', () => {
        it('returns the iterable [start:end-1]', async () => {
          const iter = toAsyncIterable([1, 2, 3])
          const start = 1
          const end = 2

          const result = sliceAsync(iter, start, end)
          const arrResult = await toArrayAsync(result)

          expect(arrResult).toEqual([2])
        })
      })

      describe('start = end', () => {
        it('returns the empty iterable', async () => {
          const iter = toAsyncIterable([1, 2, 3])
          const start = 1
          const end = 1

          const result = sliceAsync(iter, start, end)
          const arrResult = await toArrayAsync(result)

          expect(arrResult).toEqual([])
        })
      })

      describe('start > end', () => {
        it('throws an error', async () => {
          const iter = toAsyncIterable([1, 2, 3])
          const start = 2
          const end = 1

          const err = getError(() => sliceAsync(iter, start, end))

          expect(err).toBeInstanceOf(Error)
          expect(err!.message).toMatch('end')
        })
      })
    })
  })
})
