import { getAsyncError } from '@test/return-style'
import { RuntimeError } from '@src/error'
import { isPromise } from 'extra-promise'
import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { firstAsync as call } from '@tail/first-async'
import { firstAsync as pipe } from '@style/pipeline/tail/first-async'
import { firstAsync as bind } from '@style/binding/tail/first-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

describe('firstAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>) -> Promise<T>', call)
  , testPipe('() -> (iterable: AsyncIterable<T>) -> Promise<T>', pipe)
  , testBind('(this: AsyncIterable<T>) -> Promise<T>', bind)
  , testAsyncMethod('AsyncIterableOperator::firstAsync() -> Promise<T>', AsyncIterableOperator.prototype.firstAsync)
  ])('%s', (_, firstAsync) => {
    describe('iterable is empty', () => {
      it('throw RuntimeError', async () => {
        const iter = toAsyncIterable([])

        const err = await getAsyncError<RuntimeError>(() => firstAsync(iter))

        expect(err).toBeInstanceOf(RuntimeError)
      })
    })

    describe('iterable isnt empty', () => {
      it('return the first element in the iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])

        const result = firstAsync(iter)
        const isPro = isPromise(result)
        const proResult = await result

        expect(isPro).toBe(true)
        expect(proResult).toBe(1)
      })
    })
  })
})
