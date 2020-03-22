import { toAsyncIterable, isAsyncIterable, toArrayAsync } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { uniqAsync as call } from '@body/uniq-async'
import { uniqAsync as pipe } from '@style/pipeline/body/uniq-async'
import { uniqAsync as bind } from '@style/binding/body/uniq-async'
import { UniqAsyncOperator } from '@style/chaining/body/uniq-async'

describe('uniqAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>) -> AsyncIterable<T>', call)
  , testPipe('() -> (iterable: AsyncIterable<T>) -> AsyncIterable<T>', pipe)
  , testBind('(this: AsyncIterable<T>) -> AsyncIterable<T>', bind)
  , testAsyncIterableChain('AsyncIterableOperator::uniqAsync() -> AsyncIterableOperator<T>', UniqAsyncOperator.prototype.uniqAsync)
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
    })
  })
})
