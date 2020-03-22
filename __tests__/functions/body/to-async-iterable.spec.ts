import { isAsyncIterable, toArrayAsync } from '@test/utils'
import { testCall, testPipe, testBind, testIterableChainAsync } from '@test/test-fixtures'
import { toAsyncIterable as call } from '@body/to-async-iterable'
import { toAsyncIterable as pipe } from '@style/pipeline/body/to-async-iterable'
import { toAsyncIterable as bind } from '@style/binding/body/to-async-iterable'
import { ToAsyncIterableOperator } from '@style/chaining/body/to-async-iterable'

describe('toAsyncIterable', () => {
  describe.each([
    testCall('(iterable: Iterable<T>) -> AsyncIterable<T>', call)
  , testPipe('() -> (iterable: Iterable<T>) -> AsyncIterable<T>', pipe)
  , testBind('(this: Iterable<T>) -> AsyncIterable<T>', bind)
  , testIterableChainAsync('AsyncIterableOperator::toAscynIterable() -> AsyncIterable<T>', ToAsyncIterableOperator.prototype.toAsyncIterable)
  ])('%s', (_, toAsyncIterable) => {
    describe('(iterable: Iterable<T>) -> AsyncIterable<T>', () => {
      describe('call', () => {
        it('return AsyncIterable', async () => {
          const iter = [1, 2, 3]

          const result = toAsyncIterable(iter)
          const isAsyncIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isAsyncIter).toBe(true)
          expect(arrResult).toEqual([1, 2, 3])
        })
      })
    })

    describe('(iterable: Iterable<PromiseLike<T>>) -> AsyncIterable<T>', () => {
      describe('call', () => {
        it('return AsyncIterable', async () => {
          const iter = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]

          const result = toAsyncIterable(iter)
          const isAsyncIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isAsyncIter).toBe(true)
          expect(arrResult).toEqual([1, 2, 3])
        })
      })
    })
  })
})
