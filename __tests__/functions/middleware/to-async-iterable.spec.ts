import { isAsyncIterable, toArrayAsync, MarkIterable } from '@test/utils'
import { testCall, testPipe, testBind, testIterableChainAsync } from '@test/test-fixtures'
import { toAsyncIterable as call } from '@middleware/to-async-iterable'
import { toAsyncIterable as pipe } from '@style/pipeline/middleware/to-async-iterable'
import { toAsyncIterable as bind } from '@style/binding/middleware/to-async-iterable'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe.each([
  testCall('toAsyncIterable<T>(iterable: Iterable<T>): AsyncIterable<T>', call)
, testPipe('toAsyncIterable<T>(): (iterable: Iterable<T>) => AsyncIterable<T>', pipe)
, testBind('toAsyncIterable<T>(this: Iterable<T>): AsyncIterable<T>', bind)
, testIterableChainAsync('IterableOperator<T>::toAscynIterable(): AsyncIterableOperator<T>', IterableOperator.prototype.toAsyncIterable)
])('%s', (_, toAsyncIterable) => {
  describe('(iterable: Iterable<T>) => AsyncIterable<T>', () => {
    describe('call', () => {
      it('return AsyncIterable', async () => {
        const iter = [1, 2, 3]

        const result = toAsyncIterable(iter)
        const isAsyncIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isAsyncIter).toBe(true)
        expect(arrResult).toEqual([1, 2, 3])
      })

      it('lazy evaluation', async () => {
        const iter = new MarkIterable()

        const result = toAsyncIterable(iter)
        const isEval1 = iter.isEvaluated()
        await toArrayAsync(result)
        const isEval2 = iter.isEvaluated()

        expect(isEval1).toBe(false)
        expect(isEval2).toBe(true)
      })
    })
  })

  describe('(iterable: Iterable<PromiseLike<T>>) => AsyncIterable<T>', () => {
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
