import { toAsyncIterable } from '@test/utils'
import { consumeAsync } from '@src/consume-async'
import { getErrorAsync } from 'return-style'
import '@blackglory/jest-matchers'

describe('consumeAsync', () => {
  it('returns the result from consumer', async () => {
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

  describe('consumer throws an error', () => {
    it('throws an error', async () => {
      const customError = new Error('CustomError')
      const iter = toAsyncIterable([1, 2, 3])
      const fn = () => { throw customError }

      const err = await getErrorAsync(() => consumeAsync(iter, fn))

      expect(err).toBe(customError)
    })
  })
})
