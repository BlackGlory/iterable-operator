import { getError } from 'return-style'
import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable } from '@test/utils'
import { dropRightAsync } from '@intermediate/drop-right-async'
import '@blackglory/jest-matchers'

describe('dropRightAsync', () => {
  test('lazy evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const count = 1

    const result = dropRightAsync(iter, count)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(result)

    expect(isLazy).toBe(true)
  })

  describe('count > 0', () => {
    describe('count > size(iterable)', () => {
      it('returns an empty iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 5

        const result = dropRightAsync(iter, count)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('count = size(iterable)', () => {
      it('returns an empty iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 3

        const result = dropRightAsync(iter, count)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('count < size(iterable)', () => {
      it('returns the iterable that dropped the last count elements', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 2

        const result = dropRightAsync(iter, count)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([1])
      })
    })
  })

  describe('count = 0', () => {
    it('returns the iterable copy', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 0

      const result = dropRightAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('count < 0', () => {
    it('throws an error', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = -1

      const err = getError(() => dropRightAsync(iter, count))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('count')
    })
  })
})
