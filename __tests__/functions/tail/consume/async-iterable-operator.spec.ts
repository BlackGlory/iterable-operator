import { getSyncError } from '@test/return-style'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { asyncMethod } from '@test/style-helpers'
import { toAsyncIterable } from '@test/utils'
import { isPromise } from 'extra-promise'

const consume = asyncMethod(AsyncIterableOperator.prototype.consume)
const getIter = toAsyncIterable

describe('IterableOperator::consume', () => {
  describe('(consumer: (iterable: Iterable<T>) -> U) -> U', () => {
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

        const result = consume(iter, sum)
        const isPro = isPromise(result)
        const proResult = await result

        expect(isPro).toBe(true)
        expect(proResult).toEqual(6)
      })
    })

    describe('consumer throw error', () => {
      it('throw error', () => {
        const customError = new Error('CustomError')
        const iter = getIter([1, 2, 3])
        const fn = () => { throw customError }

        const err = getSyncError(() => consume(iter, fn))

        expect(err).toBe(customError)
      })
    })
  })
})
