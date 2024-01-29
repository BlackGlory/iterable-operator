import { consume } from '@src/consume.js'
import { getError } from 'return-style'

describe('consume', () => {
  it('returns the result from consumer', async () => {
    const iter = [1, 2, 3]
    const sum = async (iterable: Iterable<number> | AsyncIterable<number>) => {
      let result = 0
      for await (const value of iterable) {
        result += value
      }
      return result
    }

    const result = await consume(iter, sum)

    expect(result).toEqual(6)
  })

  describe('consumer throw error', () => {
    it('throws an error', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const err = getError(() => consume(iter, fn))

      expect(err).toBe(customError)
    })
  })
})
