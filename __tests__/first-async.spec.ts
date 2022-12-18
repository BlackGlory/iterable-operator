import { toAsyncIterable } from '@test/utils'
import { firstAsync } from '@src/first-async'

describe('firstAsync', () => {
  describe('iterable is empty', () => {
    it('returns undefined', async () => {
      const iter = toAsyncIterable([])

      const result = await firstAsync(iter)

      expect(result).toBeUndefined()
    })
  })

  describe('iterable isnt empty', () => {
    it('returns the first element in the iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = await firstAsync(iter)

      expect(result).toBe(1)
    })
  })
})
