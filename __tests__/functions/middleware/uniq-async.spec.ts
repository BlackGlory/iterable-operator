import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable, takeAsync } from '@test/utils'
import { uniqAsync } from '@middleware/uniq-async'
import '@test/matchers'

describe('uniqAsync<T>(iterable: AsyncIterable<T>): AsyncIterable<T>', () => {
  describe('call', () => {
    it('return uniqed iterable', async () => {
      const iter = toAsyncIterable([1, 1, 2, 2, 3, 3])

      const result = uniqAsync(iter)
      const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([1, 2, 3])
    })

    it('lazy and partial evaluation', async () => {
      const iter = new MockAsyncIterable([1, 2, 3])

      const result = uniqAsync(iter)
      const isLazy = iter.nextIndex === 0
      await consumeAsync(takeAsync(result, 1))
      const isPartial = iter.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })
  })
})
