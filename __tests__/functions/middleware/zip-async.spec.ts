import { getError } from 'return-style'
import { InvalidArgumentsLengthError } from '@src/error'
import { testIterable, testAsyncIterable } from '@test/test-fixtures'
import { toArrayAsync, toIterable, toAsyncIterable, MockIterable } from '@test/utils'
import { zipAsync } from '@middleware/zip-async'
import '@test/matchers'

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
    describe('T is PromiseLike<T>', () => {
      it('return AsyncIterable<Array<PromiseLike<T>>>', async () => {
        const iter1 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]
        const iter2 = [Promise.resolve('a'), Promise.resolve('b'), Promise.resolve('c')]

        const result = zipAsync(iter1, iter2)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[iter1[0], iter2[0]], [iter1[1], iter2[1]], [iter1[2], iter2[2]]])
      })
    })

    describe.each([
      testIterable('Array<Iterable<unknown>>')
    , testAsyncIterable('Array<AsyncIterable<unknown>>')
    ])('%s', (_, getIter) => {
      it('lazy evaluation', async () => {
        const mock = new MockIterable([1, 2, 3])
        const iter1 = getIter(mock)
        const iter2 = getIter([])

        const result = zipAsync(iter1, iter2)
        const isLazy = mock.nextIndex === 0
        await toArrayAsync(result)
        const isPartial = mock.nextIndex === 1

        expect(isLazy).toBe(true)
        expect(isPartial).toBe(true)
      })

      describe('iterables have same size', () => {
        it('return zipped iterable', async () => {
          const iter1 = getIter([1, 2, 3])
          const iter2 = getIter(['a', 'b', 'c'])

          const result = zipAsync(iter1, iter2)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
        })
      })

      describe('iterables dont have same size', () => {
        it('return zipped iterable by the shortest iterable', async () => {
          const iter1 = getIter([1, 2, 3])
          const iter2 = getIter(['a', 'b'])

          const result = zipAsync(iter1, iter2)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([[1, 'a'], [2, 'b']])
        })
      })
    })
  })

  describe('Array<Iterable<unknown> | AsyncIterable<unknown>>', () => {
    it('return zipped iterable', async () => {
      const iter1 = toIterable([1, 2, 3])
      const iter2 = toAsyncIterable(['a', 'b', 'c'])

      const result = zipAsync(iter1, iter2)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
    })
  })
})
