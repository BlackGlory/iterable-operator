import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable } from '@test/utils'
import { getError } from 'return-style'
import { takeRightAsync } from '@middleware/take-right-async'
import '@blackglory/jest-matchers'

describe(`
  takeRightAsync<T>(
    iterable: AsyncIterable<T>
  , count: number
  ): AsyncIterable<T>
`, () => {
  it('lazy evaluation', async () => {
    const iter = new MockAsyncIterable()
    const count = 5

    const result = takeRightAsync(iter, count)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(result)

    expect(isLazy).toBe(true)
  })

  describe('count > size(iterable)', () => {
    it('return iterable copy', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 5

      const result = takeRightAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('0 < count < size(iterable)', () => {
    it('return iterable that taken the first count elements', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 2

      const result = takeRightAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([2, 3])
    })
  })

  describe('count = 0', () => {
    it('throw empty iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 0

      const result = takeRightAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('count < 0', () => {
    it('throw Error', () => {
      const iter = toAsyncIterable([])
      const count = -1

      const err = getError(() => takeRightAsync(iter, count))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('count')
    })
  })
})
