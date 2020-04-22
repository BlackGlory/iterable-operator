import { getSyncError } from '@test/return-style'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { method } from '@test/style-helpers'
import { toIterable } from '@test/utils'
import { isPromise } from 'extra-promise'

const consume = method(IterableOperator.prototype.consume)
const getIter = toIterable

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
      it('throw error', async () => {
        const customError = new Error('CustomError')
        const iter = getIter([1, 2, 3])
        const fn = () => { throw customError }

        const err = getSyncError(() => consume(iter, fn))

        expect(err).toBe(customError)
      })
    })
  })
})
