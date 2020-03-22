import { isPromise } from 'extra-promise'
import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { includesAsync as call } from '@tail/includes-async'
import { includesAsync as pipe } from '@style/pipeline/tail/includes-async'
import { includesAsync as bind } from '@style/binding/tail/includes-async'
import { IncludesAsyncOperator } from '@style/chaining/tail/includes-async'

describe('includesAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>, value: T) -> Promise<boolean>', call)
  , testPipe('(value: T) -> (iterable: AsyncIterable<T>) -> Promise<boolean>', pipe)
  , testBind('(this: AsyncIterable<T>, value: T) -> Promise<boolean>', bind)
  , testAsyncMethod('AsyncIterableOperator::includesAsync(value: T) -> Promise<boolean>', IncludesAsyncOperator.prototype.includesAsync)
  ])('%s', (_, includesAsync) => {
    describe('value is included in the iterable', () => {
      it('return true', async () => {
        const iter = toAsyncIterable([1, 2, 3])

        const result = includesAsync(iter, 2)
        const isPro = isPromise(result)
        const proResult = await result

        expect(isPro).toBe(true)
        expect(proResult).toBe(true)
      })
    })

    describe('value isnt included in the iterable', () => {
      it('return false', async () => {
        const iter = toAsyncIterable([1, 2, 3])

        const result = includesAsync(iter, 4)
        const isPro = isPromise(result)
        const proResult = await result

        expect(isPro).toBe(true)
        expect(proResult).toBe(false)
      })
    })
  })
})
