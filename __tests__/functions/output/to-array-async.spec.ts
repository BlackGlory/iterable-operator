import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { toArrayAsync as call } from '@output/to-array-async'
import { toArrayAsync as pipe } from '@style/pipeline/output/to-array-async'
import { toArrayAsync as bind } from '@style/binding/output/to-array-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

describe.each([
  testCall('toArrayAsync<T>(iterable: AsyncIterable<T>): Promise<T[]>', call)
, testPipe('toArrayAsync<T>() => (iterable: AsyncIterable<T>): Promise<T[]>', pipe)
, testBind('toArrayAsync<T>(this: AsyncIterable<T>): Promise<T[]>', bind)
, testAsyncMethod('AsyncIterableOperator::toArrayAsync(): Promise<T[]>', AsyncIterableOperator.prototype.toArrayAsync)
])('%s', (_, toArrayAsync) => {
  describe('call', () => {
    it('return array from iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = toArrayAsync(iter)
      const proResult = await result

      expect(result).toBeInstanceOf(Promise)
      expect(proResult).toEqual([1, 2, 3])
    })
  })
})
