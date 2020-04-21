import { getSyncError } from '@test/return-style'
import { isAsyncIterable, toArrayAsync, toIterable, toAsyncIterable, MarkIterable } from '@test/utils'
import { testCall, testPipe, testBind, testIterable, testAsyncIterable } from '@test/test-fixtures'
import { InvalidArgumentsLengthError } from '@src/error'
import { concatAsync as call } from '@body/concat-async'
import { concatAsync as pipe } from '@style/pipeline/body/concat-async'
import { concatAsync as bind } from '@style/binding/body/concat-async'

describe('concatAsync', () => {
  describe.each([
    testCall('(...iterables: Array<Iterable | AsyncIterable>) -> AsyncIterable<T>', call)
  , testPipe('(...iterables: Array<Iterable | AsyncIterable>) -> (iterable: Iterable | AsyncIterable) -> AsyncIterable<T>', pipe)
  , testBind('(...iterables: Array<Iterable | AsyncIterable>) -> (iterable: Iterable | AsyncIterable) -> AsyncIterable<T>', bind)
  ])('%s', (_, concatAsync) => {
    describe('(...iterables: Array) -> AsyncIterable', () => {
      describe('size(iterables) < 2', () => {
        it('throw InvalidArgumentsLengthError', () => {
          const iter = [1, 2, 3]

          const err = getSyncError<InvalidArgumentsLengthError>(() => concatAsync(iter))

          expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
          expect(err!.message).toMatch('2')
        })
      })

      describe('size(iterables) >= 2', () => {
        describe('(...iterables: Array<Iterable<PromiseLike<T>>>) -> AsyncIterable<T>', () => {
          describe('call', () => {
            it('return concated AsyncIterable', async () => {
              const iter1 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]
              const iter2 = [Promise.resolve('a'), Promise.resolve('b'), Promise.resolve('c')]

              const result = concatAsync(iter1, iter2)
              const isIter = isAsyncIterable(result)
              const arrResult = await toArrayAsync(result)

              expect(isIter).toBe(true)
              expect(arrResult).toEqual([1, 2, 3, 'a', 'b', 'c'])
            })
          })
        })

        describe.each([
          testIterable('(...iterables: Iterable[]) -> AsyncIterable')
        , testAsyncIterable('(...iterables: AsyncIterable[]) -> AsyncIterable')
        ])('%s', (_, getIter) => {
          describe('call', () => {
            it('lazy evaluation', async () => {
              const mark = new MarkIterable()
              const iter1 = getIter(mark)
              const iter2 = getIter([])

              const result = concatAsync(iter1, iter2)
              const isEval1 = mark.isEvaluated()
              await toArrayAsync(result)
              const isEval2 = mark.isEvaluated()

              expect(isEval1).toBe(false)
              expect(isEval2).toBe(true)
            })

            it('return concated iterable', async () => {
              const iter1 = getIter([1, 2, 3])
              const iter2 = toIterable(['a', 'b', 'c'])
              const iter3 = toAsyncIterable(['d', 'e', 'f'])

              const result = concatAsync(iter1, iter2, iter3)
              const isIter = isAsyncIterable(result)
              const arrResult = await toArrayAsync(result)

              expect(isIter).toBe(true)
              expect(arrResult).toEqual([1, 2, 3, 'a', 'b', 'c', 'd', 'e', 'f'])
            })
          })
        })
      })
    })
  })
})
