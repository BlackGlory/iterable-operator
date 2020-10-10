import { testIterable, testAsyncIterable } from '@test/test-fixtures'
import { consume } from '@output/consume'
import { getError } from 'return-style'
import '@blackglory/jest-matchers'

describe('consume<T, U>(iterable: Iterable<T> | AsyncIterable<T>, consumer: (iterable: Iterable<T> | AsyncIterable<T>) => U): U', () => {
  describe.each([
    testIterable('Iterable<T>')
  , testAsyncIterable('AsyncIterable<T>')
  ])('%s', (_, getIter) => {
    describe('call', () => {
      it('return result from consumer', async () => {
        const iter = getIter([1, 2, 3])
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
        const iter = getIter([1, 2, 3])
        const fn = () => { throw customError }

        const err = getError(() => consume(iter as any, fn))

        expect(err).toBe(customError)
      })
    })
  })
})
