import { RuntimeError } from '@src/error'
import { getErrorAsync } from 'return-style'
import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { lastAsync as call } from '@output/last-async'
import { lastAsync as pipe } from '@style/pipeline/output/last-async'
import { lastAsync as bind } from '@style/binding/output/last-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import '@test/matchers'

describe.each([
  testCall('lastAsync<T>(iterable: AsyncIterable<T>): Promise<T>', call)
, testPipe('lastAsync<T>(): (iterable: AsyncIterable<T>) => Promise<T>', pipe)
, testBind('lastAsync<T>(this: AsyncIterable<T>): Promise<T>', bind)
, testAsyncMethod('AsyncIterableOperator<T>::lastAsync(): Promise<T>', AsyncIterableOperator.prototype.lastAsync)
])('%s', (_, lastAsync) => {
  describe('iterable is empty', () => {
    it('throw RuntimeError', async () => {
      const iter = toAsyncIterable([])

      const err = await getErrorAsync<RuntimeError>(lastAsync(iter))

      expect(err).toBeInstanceOf(RuntimeError)
    })
  })

  describe('iterable isnt empty', () => {
    it('return the last element in the iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = lastAsync(iter)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(3)
    })
  })
})
