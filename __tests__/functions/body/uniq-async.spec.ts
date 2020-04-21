import { toAsyncIterable, isAsyncIterable, toArrayAsync, MarkAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { uniqAsync as call } from '@body/uniq-async'
import { uniqAsync as pipe } from '@style/pipeline/body/uniq-async'
import { uniqAsync as bind } from '@style/binding/body/uniq-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

describe('uniqAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>) -> AsyncIterable<T>', call)
  , testPipe('() -> (iterable: AsyncIterable<T>) -> AsyncIterable<T>', pipe)
  , testBind('(this: AsyncIterable<T>) -> AsyncIterable<T>', bind)
  , testAsyncIterableChain('AsyncIterableOperator::uniqAsync() -> AsyncIterableOperator<T>', AsyncIterableOperator.prototype.uniqAsync)
  ])('%s', (_, uniqAsync) => {
    describe('call', () => {
      it('return uniqed iterable', async () => {
        const iter = toAsyncIterable([1, 1, 2, 2, 3, 3])

        const result = uniqAsync(iter)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([1, 2, 3])
      })

      it('lazy evaluation', async () => {
        const iter = new MarkAsyncIterable()

        const result = uniqAsync(iter)
        const isEval1 = iter.isEvaluated()
        await toArrayAsync(result)
        const isEval2 = iter.isEvaluated()

        expect(isEval1).toBe(false)
        expect(isEval2).toBe(true)
      })
    })
  })
})
