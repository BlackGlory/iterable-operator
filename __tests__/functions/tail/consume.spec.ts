import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { consume as call } from '@tail/consume'
import { consume as pipe } from '@style/pipeline/tail/consume'
import { consume as bind } from '@style/binding/tail/consume'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { getSyncError } from '@test/return-style'

describe('consume', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, consumer: (iterable: Iterable<T>) -> U) -> U', call)
  , testPipe('(consumer: (iterable: Iterable<T>) -> U) -> (iterable: Iterable<T>) -> U', pipe)
  , testBind('(this: Iterable<T>, consumer: (iterable: Iterable<T>) -> U) -> U', bind)
  , testMethod('Operator<T>::(consumer: (iterable: Iterable<T>) -> U) -> U', IterableOperator.prototype.consume)
  ])('%s', (_, consume) => {
    describe('call', () => {
      it('return result from consumer', () => {
        const iter = [1, 2, 3]
        const sum = (iterable: Iterable<number>) => {
          let result = 0
          for (const value of iterable) {
            result += value
          }
          return result
        }

        const result = consume(iter, sum)

        expect(result).toEqual(6)
      })
    })

    describe('consumer throw error', () => {
      it('throw error', async () => {
        const customError = new Error('CustomError')
        const iter = [1, 2, 3]
        const fn = () => { throw customError }

        const err = getSyncError(() => consume(iter, fn))

        expect(err).toBe(customError)
      })
    })
  })
})
