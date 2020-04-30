import { getError } from 'return-style'
import { InvalidArgumentsLengthError } from '@src/error'
import { isAsyncIterable, toArrayAsync, toIterable, toAsyncIterable, MarkIterable } from '@test/utils'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { asyncIterableChain } from '@test/style-helpers'

const zipAsync = asyncIterableChain(AsyncIterableOperator.prototype.zipAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator<unknown>::zipAsync<T>(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): AsyncIterableOperator<T>', () => {
  describe('AsyncIterableOperator<unknown>::zipAsync<T>(...iterables: Array<Iterable<unknown>> | Array<AsyncIterable<unknown>>): AsyncIterableOperator<T>', () => {
    describe('size(iterables) < 2', () => {
      it('throw InvalidArugmentsLengthError', () => {
        const iter = getIter([1, 2, 3])

        const err = getError<InvalidArgumentsLengthError>(() => zipAsync(iter))

        expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
        expect(err!.message).toMatch('2')
      })
    })

    describe('size(iterables) >= 2', () => {
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

    describe('AsyncIterableOperator<unknown>::zipAsync<T>(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): AsyncIterableOperator<T>', () => {
      it('return zipped iterable', async () => {
        const iter1 = getIter([1, 2, 3])
        const iter2 = toIterable(['a', 'b', 'c'])
        const iter3 = toAsyncIterable(['d', 'e', 'f'])

        const result = zipAsync(iter1, iter2, iter3)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([[1, 'a', 'd'], [2, 'b', 'e'], [3, 'c', 'f']])
      })
    })
  })
})
