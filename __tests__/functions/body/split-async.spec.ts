import { toAsyncIterable, isAsyncIterable, toArrayAsync, MarkAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { splitAsync as call } from '@body/split-async'
import { splitAsync as pipe } from '@style/pipeline/body/split-async'
import { splitAsync as bind } from '@style/binding/body/split-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

describe('splitAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>, separator: T) -> AsyncIterable<T[]>', call)
  , testPipe('(separator: T) -> (iterable: AsyncIterable<T>)', pipe)
  , testBind('(this: AsyncIterable<T>, separator: T) -> AsyncIterable<T[]>', bind)
  , testAsyncIterableChain('AsyncIterableOperator::splitAsync(separator: T) -> AsyncIterable<T[]>', AsyncIterableOperator.prototype.splitAsync)
  ])('%s', (_, splitAsync) => {
    describe('call', () => {
      it('return splited iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3, 4, 5])
        const sep = 3

        const result = splitAsync(iter, sep)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })

      it('lazy evaluation', async () => {
        const iter = new MarkAsyncIterable()
        const sep = 3

        const result = splitAsync(iter, sep)
        const isEval1 = iter.isEvaluated()
        await toArrayAsync(result)
        const isEval2 = iter.isEvaluated()

        expect(isEval1).toBe(false)
        expect(isEval2).toBe(true)
      })
    })
  })
})
