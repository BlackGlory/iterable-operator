import { toAsyncIterable } from '@test/utils'
import { toArrayAsync } from '@output/to-array-async'
import '@blackglory/jest-matchers'

describe('toArrayAsync<T>(iterable: AsyncIterable<T>): Promise<T[]>', () => {
  describe('call', () => {
    it('return array from iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = toArrayAsync(iter)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual([1, 2, 3])
    })
  })
})
