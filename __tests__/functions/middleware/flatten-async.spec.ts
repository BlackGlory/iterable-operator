import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { toAsyncIterable, toArrayAsync, MarkAsyncIterable } from '@test/utils'
import { flattenAsync as call } from '@middleware/flatten-async'
import { flattenAsync as pipe } from '@style/pipeline/middleware/flatten-async'
import { flattenAsync as bind } from '@style/binding/middleware/flatten-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import '@test/matchers'

describe.each([
  testCall('flattenAsync<T, U>(iterable: AsyncIterable<T>): AsyncIterable<U>', call)
, testPipe('flattenAsync<T, U>(): (iterable: AsyncIterable<T>) => AsyncIterable<U>', pipe)
, testBind('flattenAsync<T, U>(this: AsyncIterable<T>): AsyncIterable<U>', bind)
, testAsyncIterableChain('AsyncIterableOperator<T>::flattenAsync<U>() => AsyncIterableOperator<U>', AsyncIterableOperator.prototype.flattenAsync)
])('%s', (_, flattenAsync) => {
  it('lazy evaluation', async () => {
    const iter = new MarkAsyncIterable()

    const result = flattenAsync(iter)
    const isEval1 = iter.isEvaluated()
    await toArrayAsync(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('iterable is empty', () => {
    it('return empty iterable', async () => {
      const iter = toAsyncIterable([])

      const result = flattenAsync(iter)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('iterable isnt empty', () => {
    it('return flat iterable', async () => {
      const iter = toAsyncIterable([
        'one', ['two']
      , 0, [1, [2]]
      ])

      const result = flattenAsync(iter)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([
        'o','n','e', 'two'
      , 0, 1, [2]
      ])
    })
  })
})
