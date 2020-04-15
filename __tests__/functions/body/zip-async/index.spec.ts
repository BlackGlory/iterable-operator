import { getSyncError } from '@test/return-style'
import { InvalidArgumentsLengthError } from '@src/error'
import { testIterable, testAsyncIterable, testCall, testPipe, testBind } from '@test/test-fixtures'
import { isAsyncIterable, toArrayAsync, toIterable, toAsyncIterable } from '@test/utils'
import { zipAsync as call } from '@body/zip-async'
import { zipAsync as pipe } from '@style/pipeline/body/zip-async'
import { zipAsync as bind } from '@style/binding/body/zip-async'

describe('zipAsync', () => {
  describe.each([
    testCall('(...iterables: Array<Iterable | AsyncIterable>) -> AsyncIterable', call)
  , testPipe('(...iterables: Array<Iterable | AsyncIterable>) -> (iterable: Iterable | AsyncIterable) AsyncIterable', pipe)
  , testBind('(this: Iterable | AsyncIterable, ...iterables: Array<Iterable | AsyncIterable>) -> AsyncIterable', bind)
  ])('%s', (_, zipAsync) => {
    describe('(...iterables: Array) -> AsyncIterable', () => {
      describe('size(iterables) < 2', () => {
        it('throw InvalidArugmentsLengthError', () => {
          const iter = [1, 2, 3]

          const err = getSyncError<InvalidArgumentsLengthError>(() => zipAsync(iter))

          expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
          expect(err!.message).toMatch('2')
        })
      })

      describe('size(iterables) >= 2', () => {
        describe('(...iterables: Array<Iterable<PromiseLike<T>>>) -> AsyncIterable<Array<PromiseLike<T>>>', () => {
          it('return AsyncIterable', async () => {
            const iter1 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]
            const iter2 = [Promise.resolve('a'), Promise.resolve('b'), Promise.resolve('c')]

            const result = zipAsync(iter1, iter2)
            const isIter = isAsyncIterable(result)
            const arrResult = await toArrayAsync(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([[iter1[0], iter2[0]], [iter1[1], iter2[1]], [iter1[2], iter2[2]]])
          })
        })

        describe.each([
          testIterable('(...iterables: Iterable[]) -> AsyncIterable')
        , testAsyncIterable('(...iterables: AsyncIterable[]) -> AsyncIterable')
        ])('%s', (_, getIter) => {
          describe('iterables have same size', () => {
            it('return zipped iterable', async () => {
              const iter1 = getIter([1, 2, 3])
              const iter2 = getIter(['a', 'b', 'c'])

              const result = zipAsync(iter1, iter2)
              const isIter = isAsyncIterable(result)
              const arrResult = await toArrayAsync(result)

              expect(isIter).toBe(true)
              expect(arrResult).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
            })
          })

          describe('iterables dont have same size', () => {
            it('return zipped iterable by the biggest iterable size', async () => {
              const iter1 = getIter([1, 2, 3])
              const iter2 = getIter(['a', 'b'])

              const result = zipAsync(iter1, iter2)
              const isIter = isAsyncIterable(result)
              const arrResult = await toArrayAsync(result)

              expect(isIter).toBe(true)
              expect(arrResult).toEqual([[1, 'a'], [2, 'b'], [3, undefined]])
            })
          })
        })
      })

      describe('(...iterables: Array<Iterable | AsyncIterable>) -> AsyncIterable', () => {
        it('return zipped iterable', async () => {
          const iter1 = toIterable([1, 2, 3])
          const iter2 = toAsyncIterable(['a', 'b', 'c'])

          const result = zipAsync(iter1, iter2)
          const isIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
        })
      })
    })
  })
})
