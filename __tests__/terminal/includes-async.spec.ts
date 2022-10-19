import { toAsyncIterable } from '@test/utils'
import { includesAsync } from '@terminal/includes-async'
import '@blackglory/jest-matchers'

describe('includesAsync<T>(iterable: AsyncIterable<T>, value: T): Promise<boolean>', () => {
  describe('value is included in the iterable', () => {
    it('return true', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = includesAsync(iter, 2)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })

  describe('value isnt included in the iterable', () => {
    it('return false', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = includesAsync(iter, 4)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(false)
    })
  })
})
