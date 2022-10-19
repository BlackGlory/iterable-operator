import { consume } from '@terminal/consume'
import { getError } from 'return-style'
import '@blackglory/jest-matchers'

describe(`
  consume<T, U>(
    iterable: Iterable<T>
  , consumer: (iterable: Iterable<T>) => U
  ): U
`, () => {
  describe('call', () => {
    it('return result from consumer', async () => {
      const iter = [1, 2, 3]
      const sum = async (iterable: Iterable<number> | AsyncIterable<number>) => {
        let result = 0
        for await (const value of iterable) {
          result += value
        }
        return result
      }

      const result = consume(iter as any, sum)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toEqual(6)
    })
  })

  describe('consumer throw error', () => {
    it('throw error', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const err = getError(() => consume(iter as any, fn))

      expect(err).toBe(customError)
    })
  })
})
