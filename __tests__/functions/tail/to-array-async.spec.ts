import { isPromise } from 'extra-promise'
import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { toArrayAsync as call } from '@tail/to-array-async'
import { toArrayAsync as pipe } from '@style/pipeline/tail/to-array-async'
import { toArrayAsync as bind } from '@style/binding/tail/to-array-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

describe('toArrayAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>) -> Promise<T[]>', call)
  , testPipe('() -> (iterable: AsyncIterable<T>) -> Promise<T[]>', pipe)
  , testBind('(this: AsyncIterable<T>) -> Promise<T[]>', bind)
  , testAsyncMethod('AsyncIterableOperator::toArrayAsync() -> Promise<T[]>', AsyncIterableOperator.prototype.toArrayAsync)
  ])('%s', (_, toArrayAsync) => {
    describe('call', () => {
      it('return array from iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])

        const result = toArrayAsync(iter)
        const isPro = isPromise(result)
        const proResult = await result

        expect(isPro).toBe(true)
        expect(proResult).toEqual([1, 2, 3])
      })
    })
  })
})
