import { toAsyncIterable } from '@test/utils'
import { firstAsync } from '@terminal/first-async'
import '@blackglory/jest-matchers'

describe('firstAsync<T>(iterable: AsyncIterable<T>): Promise<T | undefined>', () => {
  describe('iterable is empty', () => {
    it('return undefined', async () => {
      const iter = toAsyncIterable([])

      const result = firstAsync(iter)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })

  describe('iterable isnt empty', () => {
    it('return the first element in the iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = firstAsync(iter)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(1)
    })
  })
})
