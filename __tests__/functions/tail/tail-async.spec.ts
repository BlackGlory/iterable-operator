import { RuntimeError } from '@src/error'
import { isPromise } from 'extra-promise'
import { getAsyncError } from '@test/return-style'
import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { tailAsync as call } from '@tail/tail-async'
import { tailAsync as pipe } from '@style/pipeline/tail/tail-async'
import { tailAsync as bind } from '@style/binding/tail/tail-async'
import { TailAsyncOperator } from '@style/chaining/tail/tail-async'

describe('tailAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>) -> Promise<T>', call)
  , testPipe('() -> (iterable: AsyncIterable<T>) -> Promise<T>', pipe)
  , testBind('(this: AsyncIterable<T>) -> Promise<T>', bind)
  , testAsyncMethod('AsyncIterableOperator::tailAsync() -> Promise<T>', TailAsyncOperator.prototype.tailAsync)
  ])('%s', (_, tailAsync) => {
    describe('iterable is empty', () => {
      it('throw RuntimeError', async () => {
        const iter = toAsyncIterable([])

        const err = await getAsyncError<RuntimeError>(() => tailAsync(iter))

        expect(err).toBeInstanceOf(RuntimeError)
      })
    })

    describe('iterable isnt empty', () => {
      it('return the last element in the iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])

        const result = tailAsync(iter)
        const isPro = isPromise(result)
        const proResult = await result

        expect(isPro).toBe(true)
        expect(proResult).toBe(3)
      })
    })
  })
})
