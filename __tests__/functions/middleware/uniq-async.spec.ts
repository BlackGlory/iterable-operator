import { toAsyncIterable, toArrayAsync, MarkAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { uniqAsync as call } from '@middleware/uniq-async'
import { uniqAsync as pipe } from '@style/pipeline/middleware/uniq-async'
import { uniqAsync as bind } from '@style/binding/middleware/uniq-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import '@test/matchers'

describe.each([
  testCall('uniqAsync<T>(iterable: AsyncIterable<T>): AsyncIterable<T>', call)
, testPipe('uniqAsync<T>(): (iterable: AsyncIterable<T>) => AsyncIterable<T>', pipe)
, testBind('uniqAsync<T>(this: AsyncIterable<T>): AsyncIterable<T>', bind)
, testAsyncIterableChain('AsyncIterableOperator<T>::uniqAsync(): AsyncIterableOperator<T>', AsyncIterableOperator.prototype.uniqAsync)
])('%s', (_, uniqAsync) => {
  describe('call', () => {
    it('return uniqed iterable', async () => {
      const iter = toAsyncIterable([1, 1, 2, 2, 3, 3])

      const result = uniqAsync(iter)
      const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
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
