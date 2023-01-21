import { toAsyncIterable } from '@test/utils.js'
import { includesAsync } from '@src/includes-async.js'

describe('includesAsync', () => {
  describe('value is included in the iterable', () => {
    it('returns true', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = await includesAsync(iter, 2)

      expect(result).toBe(true)
    })
  })

  describe('value isnt included in the iterable', () => {
    it('returns false', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = await includesAsync(iter, 4)

      expect(result).toBe(false)
    })
  })
})
