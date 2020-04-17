import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { isPromise } from 'extra-promise'
import { getAsyncError } from '@test/return-style'
import { consumeAsync as call } from '@tail/consume-async'
import { consumeAsync as pipe } from '@style/pipeline/tail/consume-async'
import { consumeAsync as bind } from '@style/binding/tail/consume-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

describe('consumeAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>, consumer: (iterable: AsyncIterable<T>) -> PromiseLike<U>) -> Promise<U>', call)
  , testPipe('(consumer: (iterable: AsyncIterable<T>) -> PromiseLike<U>) -> Promise<U>', pipe)
  , testBind('(this: AsyncIterable<T>, consumer: (iterable: AsyncIterable<T>) -> PromiseLike<U>) -> Promise<U>', bind)
  , testAsyncMethod('AsyncIterableOperator::consumeAsync(consumer: (iterable: AsyncIterable<T>) -> PromiseLike<U>) -> Promise<U>', AsyncIterableOperator.prototype.consumeAsync)
  ])('%s', (_, consumeAsync) => {
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
        const isPro = isPromise(result)
        const proResult = await result

        expect(isPro).toBe(true)
        expect(proResult).toEqual(6)
      })
    })

    describe('consumer throw errror', () => {
      it('throw error', async () => {
        const customError = new Error('CustomError')
        const iter = toAsyncIterable([1, 2, 3])
        const fn = () => { throw customError }

        const err = await getAsyncError(() => consumeAsync(iter, fn))

        expect(err).toBe(customError)
      })
    })
  })
})
