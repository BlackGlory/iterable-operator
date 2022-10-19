import { toAsyncIterable } from '@test/utils'
import { includesAsync } from '@terminal/includes-async'
import '@blackglory/jest-matchers'

describe('includesAsync', () => {
  describe('value is included in the iterable', () => {
    it('returns true', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = includesAsync(iter, 2)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })

  describe('value isnt included in the iterable', () => {
    it('returns false', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = includesAsync(iter, 4)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(false)
    })
  })
})
