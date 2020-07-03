import { getErrorAsync } from 'return-style'
import { RuntimeError } from '@src/error'
import { toAsyncIterable } from '@test/utils'
import { firstAsync } from '@output/first-async'
import '@test/matchers'

describe('firstAsync<T>(iterable: AsyncIterable<T>): Promise<T>', () => {
  describe('iterable is empty', () => {
    it('throw RuntimeError', async () => {
      const iter = toAsyncIterable([])

      const err = await getErrorAsync<RuntimeError>(firstAsync(iter))

      expect(err).toBeInstanceOf(RuntimeError)
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
