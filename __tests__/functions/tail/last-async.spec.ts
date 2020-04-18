import { RuntimeError } from '@src/error'
import { isPromise } from 'extra-promise'
import { getAsyncError } from '@test/return-style'
import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { lastAsync as call } from '@tail/last-async'
import { lastAsync as pipe } from '@style/pipeline/tail/last-async'
import { lastAsync as bind } from '@style/binding/tail/last-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

describe('lastAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>) -> Promise<T>', call)
  , testPipe('() -> (iterable: AsyncIterable<T>) -> Promise<T>', pipe)
  , testBind('(this: AsyncIterable<T>) -> Promise<T>', bind)
  , testAsyncMethod('AsyncIterableOperator::lastAsync() -> Promise<T>', AsyncIterableOperator.prototype.lastAsync)
  ])('%s', (_, lastAsync) => {
    describe('iterable is empty', () => {
      it('throw RuntimeError', async () => {
        const iter = toAsyncIterable([])

        const err = await getAsyncError<RuntimeError>(() => lastAsync(iter))

        expect(err).toBeInstanceOf(RuntimeError)
      })
    })

    describe('iterable isnt empty', () => {
      it('return the last element in the iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])

        const result = lastAsync(iter)
        const isPro = isPromise(result)
        const proResult = await result

        expect(isPro).toBe(true)
        expect(proResult).toBe(3)
      })
    })
  })
})
