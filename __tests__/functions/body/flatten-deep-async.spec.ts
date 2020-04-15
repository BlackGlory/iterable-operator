import { InvalidArgumentError } from '@src/error'
import { toAsyncIterable, isAsyncIterable, toArrayAsync } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { getSyncError } from '@test/return-style'
import { flattenDeepAsync as call } from '@body/flatten-deep-async'
import { flattenDeepAsync as pipe } from '@style/pipeline/body/flatten-deep-async'
import { flattenDeepAsync as bind } from '@style/binding/body/flatten-deep-async'
import { FlattenDeepAsyncOperator } from '@style/chaining/body/flatten-deep-async'

describe('flattenDeepAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<unknown>, depth: number) -> AsyncIterable<T>', call)
  , testPipe('(depth: number) -> (iterable: AsyncIterable<unknown>) -> AsyncIterable<T>', pipe)
  , testBind('(this: AsyncIterable<unknown>, depth: number) -> AsyncIterable<T>', bind)
  , testAsyncIterableChain('AsyncIterableOperator::flattenDeepAsync<T>(depth: number) -> AsyncIterableOperator<T>', FlattenDeepAsyncOperator.prototype.flattenDeepAsync)
  ])('%s', (_, flattenDeepAsync) => {
    describe('(iterable: AsyncIterable<unknown>, depth: number) -> AsyncIterable<T>', () => {
      describe('iterable is empty', () => {
        it('return empty iterable', async () => {
          const iter = toAsyncIterable([])
          const depth = Infinity

          const result = flattenDeepAsync(iter, depth)
          const isIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([])
        })
      })

      describe('iterable isnt empty', () => {
        describe('depth < 0', () => {
          it('throw InvalidArgumentError', () => {
            const iter = toAsyncIterable([])
            const depth = -1

            const err = getSyncError<InvalidArgumentError>(() => flattenDeepAsync(iter, depth))

            expect(err).toBeInstanceOf(InvalidArgumentError)
            expect(err!.message).toMatch('depth')
          })
        })

        describe('depth = 0', () => {
          it('return iterable copy', async () => {
            const iter = toAsyncIterable([0, [1]])
            const depth = 0

            const result = flattenDeepAsync(iter, depth)
            const isIter = isAsyncIterable(result)
            const arrResult = await toArrayAsync(result)

            expect(isIter).toBe(true)
            expect(result).not.toBe(iter)
            expect(arrResult).toEqual([0, [1]])
          })
        })

        describe('depth > 0', () => {
          it('return flat iterable', async () => {
            const iter = toAsyncIterable([
              'one', ['two', ['three']]
            , 0, [1, [2, [3]]]
            ])
            const depth = 2

            const result = flattenDeepAsync(iter, depth)
            const isIter = isAsyncIterable(result)
            const arrResult = await toArrayAsync(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([
              'o','n','e', 't','w','o', 'three'
            , 0, 1, 2, [3]
            ])
          })
        })
      })
    })
  })
})
