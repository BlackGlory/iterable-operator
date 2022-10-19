import { toAsyncIterable } from '@test/utils'
import { consumeAsync } from '@terminal/consume-async'
import { getErrorAsync } from 'return-style'
import '@blackglory/jest-matchers'

describe(`
  consumeAsync<T, U>(
    iterable: AsyncIterable<T>
  , consumer: (iterable: AsyncIterable<T>) => U
  ): U
`, () => {
  describe('call', () => {
    it('return result from consumer', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const sum = async (iterable: AsyncIterable<number>) => {
        let result = 0
        for await (const value of iterable) {
          result += value
        }
        return result
      }

      const result = consumeAsync(iter, sum)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual(6)
    })
  })

  describe('consumer throw error', () => {
    it('throw error', async () => {
      const customError = new Error('CustomError')
      const iter = toAsyncIterable([1, 2, 3])
      const fn = () => { throw customError }

      const err = await getErrorAsync(() => consumeAsync(iter, fn))

      expect(err).toBe(customError)
    })
  })
})
