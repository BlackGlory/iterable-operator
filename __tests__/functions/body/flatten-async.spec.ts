import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { toAsyncIterable, isAsyncIterable, toArrayAsync } from '@test/utils'
import { flattenAsync as call } from '@body/flatten-async'
import { flattenAsync as pipe } from '@style/pipeline/body/flatten-async'
import { flattenAsync as bind } from '@style/binding/body/flatten-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

describe('flattenAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>) -> AsyncIterable<U>', call)
  , testPipe('() -> (iterable: AsyncIterable<T>) -> AsyncIterable<U>', pipe)
  , testBind('(this: AsyncIterable<T>) -> AsyncIterable<U>', bind)
  , testAsyncIterableChain('AsyncIterableOperator::flattenAsync() -> AsyncIterableOperator<T>', AsyncIterableOperator.prototype.flattenAsync)
  ])('%s', (_, flattenAsync) => {
    describe('iterable is empty', () => {
      it('return empty iterable', async () => {
        const iter = toAsyncIterable([])

        const result = flattenAsync(iter)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
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
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([
          'o','n','e', 'two'
        , 0, 1, [2]
        ])
      })
    })
  })
})
