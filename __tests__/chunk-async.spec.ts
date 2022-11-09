import { getError } from 'return-style'
import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable, takeAsync }
  from '@test/utils'
import { chunkAsync } from '@src/chunk-async'
import '@blackglory/jest-matchers'

describe('chunkAsync', () => {
  test('lazy and evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const size = 1

    const result = chunkAsync(iter, size)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('size > 0', () => {
    describe('size = size(iterable)', () => {
      it('returns the chunked iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const size = 3

        const result = chunkAsync(iter, size)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[1, 2, 3]])
      })
    })

    describe('size < size(iterable)', () => {
      it('returns the chunked iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const size = 2

        const result = chunkAsync(iter, size)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[1, 2], [3]])
      })
    })

    describe('size > size(iterable)', () => {
      it('returns the chunked iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const size = 5

        const result = chunkAsync(iter, size)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[1, 2, 3]])
      })
    })
  })

  describe('size = 0', () => {
    it('throws an error', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const size = 0

      const err = getError(() => chunkAsync(iter, size))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('size')
    })
  })

  describe('size < 0', () => {
    it('throws an error', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const size = -1

      const err = getError(() => chunkAsync(iter, size))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('size')
    })
  })
})
