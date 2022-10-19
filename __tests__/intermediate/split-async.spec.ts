import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable, takeAsync } from '@test/utils'
import { splitAsync } from '@intermediate/split-async'
import '@blackglory/jest-matchers'

describe(`
  splitAsync<T>(iterable: AsyncIterable<T>, separator: T): AsyncIterableIterator<T[]>
`, () => {
  describe('separator in iterable', () => {
    describe('separator is first', () => {
      it('return splited iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3, 4, 5])
        const sep = 1

        const result = splitAsync(iter, sep)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[], [2, 3, 4, 5]])
      })
    })

    describe('separator is middle', () => {
      it('return splited iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3, 4, 5])
        const sep = 3

        const result = splitAsync(iter, sep)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })
    })

    describe('separator is last', () => {
      it('return splited iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3, 4, 5])
        const sep = 5

        const result = splitAsync(iter, sep)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[1, 2, 3, 4], []])
      })
    })
  })

  describe('separator not in iterable', () => {
    it('return splited iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3, 4, 5])
      const sep = 0

      const result = splitAsync(iter, sep)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
    })
  })

  it('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const sep = 1

    const result = splitAsync(iter, sep)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })
})
