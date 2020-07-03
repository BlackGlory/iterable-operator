import { toAsyncIterable, toArray } from '@test/utils'
import { toSetAsync } from '@output/to-set-async'
import '@test/matchers'

describe('toSetAsync<T>(iterable: AsyncIterable<T>): Promise<Set<T>>', () => {
  describe('call', () => {
    it('return Set from iterable', async () => {
      const iter = toAsyncIterable([1, 1, 2, 2, 3, 3])

      const result = toSetAsync(iter)
      const proResult = await result
      const arrResult = toArray(proResult)

      expect(result).toBePromise()
      expect(proResult).toBeInstanceOf(Set)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })
})
