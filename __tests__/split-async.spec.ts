import { describe, test, it, expect } from 'vitest'
import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable, takeAsync } from '@test/utils.js'
import { splitAsync } from '@src/split-async.js'

describe('splitAsync', () => {
  describe('separator in iterable', () => {
    describe('separator is first', () => {
      it('returns the splited iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3, 4, 5])
        const sep = 1

        const result = splitAsync(iter, sep)
        const arrResult = await toArrayAsync(result)

        expect(arrResult).toEqual([[], [2, 3, 4, 5]])
      })
    })

    describe('separator is middle', () => {
      it('returns the splited iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3, 4, 5])
        const sep = 3

        const result = splitAsync(iter, sep)
        const arrResult = await toArrayAsync(result)

        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })
    })

    describe('separator is last', () => {
      it('returns the splited iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3, 4, 5])
        const sep = 5

        const result = splitAsync(iter, sep)
        const arrResult = await toArrayAsync(result)

        expect(arrResult).toEqual([[1, 2, 3, 4], []])
      })
    })
  })

  describe('separator not in iterable', () => {
    it('returns the splited iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3, 4, 5])
      const sep = 0

      const result = splitAsync(iter, sep)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
    })
  })

  test('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const sep = 1

    const result = splitAsync(iter, sep)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  test('edge: empty iterable', async () => {
    const iter = toAsyncIterable([])
    const sep = 0

    const result = splitAsync(iter, sep)
    const arrResult = await toArrayAsync(result)

    expect(arrResult).toEqual([[]])
  })
})
