import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { includesAsync as call } from '@output/includes-async'
import { includesAsync as pipe } from '@style/pipeline/output/includes-async'
import { includesAsync as bind } from '@style/binding/output/includes-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import '@test/matchers'

describe.each([
  testCall('includesAsync<T>(iterable: AsyncIterable<T>, value: T): Promise<boolean>', call)
, testPipe('includesAsync<T>(value: T): (iterable: AsyncIterable<T>) => Promise<boolean>', pipe)
, testBind('includesAsync<T>(this: AsyncIterable<T>, value: T): Promise<boolean>', bind)
, testAsyncMethod('AsyncIterableOperator<T>::includesAsync(value: T): Promise<boolean>', AsyncIterableOperator.prototype.includesAsync)
])('%s', (_, includesAsync) => {
  describe('value is included in the iterable', () => {
    it('return true', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = includesAsync(iter, 2)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })

  describe('value isnt included in the iterable', () => {
    it('return false', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = includesAsync(iter, 4)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(false)
    })
  })
})
