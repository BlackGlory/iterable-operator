import { toAsyncIterable, toArray } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { toSetAsync as call } from '@output/to-set-async'
import { toSetAsync as pipe } from '@style/pipeline/output/to-set-async'
import { toSetAsync as bind } from '@style/binding/output/to-set-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import '@test/matchers'

describe.each([
  testCall('toSetAsync<T>(iterable: AsyncIterable<T>): Promise<Set<T>>', call)
, testPipe('toSetAsync<T>(): (iterable: AsyncIterable<T>) => Promise<Set<T>>', pipe)
, testBind('toSetAsync<T>(this: AsyncIterable<T>): Promise<Set<T>>', bind)
, testAsyncMethod('AsyncIterableOperator<T>::toSetAsync(): Promise<Set<T>>', AsyncIterableOperator.prototype.toSetAsync)
])('%s', (_, toSetAsync) => {
  describe('call', () => {
    it('return Set from iterable', async () => {
      const iter = toAsyncIterable([1, 1, 2, 2, 3, 3])

      const result = toSetAsync(iter)
      const proResult = await result
      const arrResult = toArray(proResult)

      expect(result).toBePromise()
      expect(proResult).toBeInstanceOf(Set)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })
})
