import { isPromise } from 'extra-promise'
import { toAsyncIterable, toArray } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { toSetAsync as call } from '@tail/to-set-async'
import { toSetAsync as pipe } from '@style/pipeline/tail/to-set-async'
import { toSetAsync as bind } from '@style/binding/tail/to-set-async'
import { ToSetAsyncOperator } from '@style/chaining/tail/to-set-async'

describe('toSetAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>) -> Promise<Set<T>>', call)
  , testPipe('() -> (iterable: AsyncIterable<T>) -> Promise<Set<T>>', pipe)
  , testBind('(this: AsyncIterable<T>) -> Promise<Set<T>>', bind)
  , testAsyncMethod('AsyncIterableOperator::toSetAsync() -> Promise<Set<T>>', ToSetAsyncOperator.prototype.toSetAsync)
  ])('%s', (_, toSetAsync) => {
    describe('call', () => {
      it('return Set from iterable', async () => {
        const iter = toAsyncIterable([1, 1, 2, 2, 3, 3])

        const result = toSetAsync(iter)
        const isPro = isPromise(result)
        const proResult = await result
        const arrResult = toArray(proResult)

        expect(isPro).toBe(true)
        expect(proResult).toBeInstanceOf(Set)
        expect(arrResult).toEqual([1, 2, 3])
      })
    })
  })
})
