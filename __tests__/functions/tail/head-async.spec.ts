import { getAsyncError } from '@test/return-style'
import { RuntimeError } from '@src/error'
import { isPromise } from 'extra-promise'
import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { headAsync as call } from '@tail/head-async'
import { headAsync as pipe } from '@style/pipeline/tail/head-async'
import { headAsync as bind } from '@style/binding/tail/head-async'
import { HeadAsyncOperator } from '@style/chaining/tail/head-async'

describe('headAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>) -> Promise<T>', call)
  , testPipe('() -> (iterable: AsyncIterable<T>) -> Promise<T>', pipe)
  , testBind('(this: AsyncIterable<T>) -> Promise<T>', bind)
  , testAsyncMethod('AsyncIterableOperator::headAsync() -> Promise<T>', HeadAsyncOperator.prototype.headAsync)
  ])('%s', (_, headAsync) => {
    describe('iterable is empty', () => {
      it('throw RuntimeError', async () => {
        const iter = toAsyncIterable([])

        const err = await getAsyncError<RuntimeError>(() => headAsync(iter))

        expect(err).toBeInstanceOf(RuntimeError)
      })
    })

    describe('iterable isnt empty', () => {
      it('return the first element in the iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])

        const result = headAsync(iter)
        const isPro = isPromise(result)
        const proResult = await result

        expect(isPro).toBe(true)
        expect(proResult).toBe(1)
      })
    })
  })
})
