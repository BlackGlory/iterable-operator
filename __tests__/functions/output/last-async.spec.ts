import { toAsyncIterable } from '@test/utils'
import { lastAsync } from '@output/last-async'
import '@blackglory/jest-matchers'

describe('lastAsync<T>(iterable: AsyncIterable<T>): Promise<T | undefined>', () => {
  describe('iterable is empty', () => {
    it('return undefined', async () => {
      const iter = toAsyncIterable([])

      const result = lastAsync(iter)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })

  describe('iterable isnt empty', () => {
    it('return the last element in the iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = lastAsync(iter)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(3)
    })
  })
})
