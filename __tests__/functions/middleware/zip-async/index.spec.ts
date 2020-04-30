import { getError } from 'return-style'
import { InvalidArgumentsLengthError } from '@src/error'
import { testIterable, testAsyncIterable, testCall, testPipe, testBind } from '@test/test-fixtures'
import { isAsyncIterable, toArrayAsync, toIterable, toAsyncIterable, MarkIterable } from '@test/utils'
import { zipAsync as call } from '@middleware/zip-async'
import { zipAsync as pipe } from '@style/pipeline/middleware/zip-async'
import { zipAsync as bind } from '@style/binding/middleware/zip-async'

describe.each([
  testCall('zipAsync<T>(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): AsyncIterable<T>', call)
, testPipe('zipAsync<T>(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): (iterable: Iterable<unknown> | AsyncIterable<unknown>) => AsyncIterable<T>', pipe)
, testBind('zipAsync<T>(this: Iterable<unknown> | AsyncIterable<unknown>, ...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>) => AsyncIterable<T>', bind)
])('%s', (_, zipAsync) => {
  describe('zipAsync<T>(...iterables: Array<Iterable<unknown>> | Array<AsyncIterable<unknown>>): AsyncIterable<T>', () => {
    describe('size(iterables) < 2', () => {
      it('throw InvalidArugmentsLengthError', () => {
        const iter = [1, 2, 3]

        const err = getError<InvalidArgumentsLengthError>(() => zipAsync(iter))

        expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
        expect(err!.message).toMatch('2')
      })
    })

    describe('size(iterables) >= 2', () => {
      describe('zipAsync<PromiseLike<T>>(...iterables: Array<Iterable<PromiseLike<T>>>): AsyncIterable<Array<PromiseLike<T>>>', () => {
        it('return AsyncIterable<Array<PromiseLike<T>>>', async () => {
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
        testIterable('zipAsync<T>(...iterables: Array<Iterable<unknown>>): AsyncIterable<T>')
      , testAsyncIterable('zipAsync<T>(...iterables: Array<AsyncIterable<unknown>>): AsyncIterable<T>')
      ])('%s', (_, getIter) => {
        it('lazy evaluation', async () => {
          const mark = new MarkIterable()
          const iter1 = getIter(mark)
          const iter2 = getIter([])

          const result = zipAsync(iter1, iter2)
          const isEval1 = mark.isEvaluated()
          await toArrayAsync(result)
          const isEval2 = mark.isEvaluated()

          expect(isEval1).toBe(false)
          expect(isEval2).toBe(true)
        })

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
          it('return zipped iterable by the shortest iterable', async () => {
            const iter1 = getIter([1, 2, 3])
            const iter2 = getIter(['a', 'b'])

            const result = zipAsync(iter1, iter2)
            const isIter = isAsyncIterable(result)
            const arrResult = await toArrayAsync(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([[1, 'a'], [2, 'b']])
          })
        })
      })
    })

    describe('zipAsync<T>(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): AsyncIterable<T>', () => {
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
