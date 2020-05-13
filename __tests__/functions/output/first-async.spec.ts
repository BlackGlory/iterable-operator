import { getErrorAsync } from 'return-style'
import { RuntimeError } from '@src/error'
import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { firstAsync as call } from '@output/first-async'
import { firstAsync as pipe } from '@style/pipeline/output/first-async'
import { firstAsync as bind } from '@style/binding/output/first-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import '@test/matchers'

describe.each([
  testCall('firstAsync<T>(iterable: AsyncIterable<T>): Promise<T>', call)
, testPipe('firstAsync<T>(): (iterable: AsyncIterable<T>) => Promise<T>', pipe)
, testBind('firstAsync<T>(this: AsyncIterable<T>): Promise<T>', bind)
, testAsyncMethod('AsyncIterableOperator<T>::firstAsync(): Promise<T>', AsyncIterableOperator.prototype.firstAsync)
])('%s', (_, firstAsync) => {
  describe('iterable is empty', () => {
    it('throw RuntimeError', async () => {
      const iter = toAsyncIterable([])

      const err = await getErrorAsync<RuntimeError>(firstAsync(iter))

      expect(err).toBeInstanceOf(RuntimeError)
    })
  })

  describe('iterable isnt empty', () => {
    it('return the first element in the iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = firstAsync(iter)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(1)
    })
  })
})
