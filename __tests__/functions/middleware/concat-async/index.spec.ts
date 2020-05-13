import { getError } from 'return-style'
import { toArrayAsync, toIterable, toAsyncIterable, MarkIterable } from '@test/utils'
import { testCall, testPipe, testBind, testIterable, testAsyncIterable } from '@test/test-fixtures'
import { InvalidArgumentsLengthError } from '@src/error'
import { concatAsync as call } from '@middleware/concat-async'
import { concatAsync as pipe } from '@style/pipeline/middleware/concat-async'
import { concatAsync as bind } from '@style/binding/middleware/concat-async'
import '@test/matchers'

describe.each([
  testCall('concatAsync<T>(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): AsyncIterable<T>', call)
, testPipe('concatAsync<T>(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): (iterable: Iterable<unknown> | AsyncIterable<unknown>) => AsyncIterable<T>', pipe)
, testBind('concatAsync<T>(this: Iterable<unknown> | AsyncIterable<unknown>, ...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): AsyncIterable<T>', bind)
])('%s', (_, concatAsync) => {
  describe('size(iterables) < 2', () => {
    it('throw InvalidArgumentsLengthError', () => {
      const iter = [1, 2, 3]

      const err = getError<InvalidArgumentsLengthError>(() => concatAsync(iter))

      expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
      expect(err!.message).toMatch('2')
    })
  })

  describe('size(iterables) >= 2', () => {
    describe('concatAsync<PromiseLike<T>>(...iterables: Array<Iterable<PromiseLike<T>>>): AsyncIterable<T>', () => {
      describe('call', () => {
        it('return concated AsyncIterable', async () => {
          const iter1 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]
          const iter2 = [Promise.resolve('a'), Promise.resolve('b'), Promise.resolve('c')]

          const result = concatAsync(iter1, iter2)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([1, 2, 3, 'a', 'b', 'c'])
        })
      })
    })

    describe.each([
      testIterable('concatAsync<T>(...iterables: Array<Iterable<unknown>>): AsyncIterable<T>')
    , testAsyncIterable('(...iterables: Array<AsyncIterable<unknown>>): AsyncIterable<T>')
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
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([1, 2, 3, 'a', 'b', 'c', 'd', 'e', 'f'])
        })
      })
    })
  })
})
