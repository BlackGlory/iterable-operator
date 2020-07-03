import { getError } from 'return-style'
import { toArrayAsync, toIterable, toAsyncIterable, MockIterable, takeAsync } from '@test/utils'
import { testIterable, testAsyncIterable } from '@test/test-fixtures'
import { InvalidArgumentsLengthError } from '@src/error'
import { concatAsync } from '@middleware/concat-async'
import '@test/matchers'

describe('concatAsync<T>(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): AsyncIterable<T>', () => {
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
          const mock = new MockIterable([1, 2, 3])
          const iter1 = getIter(mock)
          const iter2 = getIter([])

          const result = concatAsync(iter1, iter2)
          const isLazy = mock.nextIndex === 0
          await toArrayAsync(takeAsync(result, 1))
          const isPartial = mock.nextIndex === 1

          expect(isLazy).toBe(true)
          expect(isPartial).toBe(true)
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
