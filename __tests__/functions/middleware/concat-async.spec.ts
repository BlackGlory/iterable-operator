import { consumeAsync, toArrayAsync, toIterable, toAsyncIterable, MockIterable, takeAsync } from '@test/utils'
import { testIterable, testAsyncIterable } from '@test/test-fixtures'
import { concatAsync } from '@middleware/concat-async'
import '@blackglory/jest-matchers'

describe(`
  concatAsync<T, U>(
    iterable: Iterable<Awaitalbe<T>> | AsyncIterable<T>
  , ...otherIterables: Array<Iterable<Awaitable<U>> | AsyncIterable<U>>
  ): AsyncIterableIterator<T | U>
`, () => {
  describe(`
    concatAsync<PromiseLike<T>>(
      ...iterables: Array<Iterable<PromiseLike<T>>>
    ): AsyncIterableIterator<T>
  `, () => {
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
    testIterable(`
      concatAsync<T>(
        ...iterables: Array<Iterable<unknown>>
      ): AsyncIterableIterator<T>
    `)
  , testAsyncIterable(`
      concatAsync<T>(
        ...iterables: Array<AsyncIterable<unknown>>
      ): AsyncIterableIterator<T>
    `)
  ])('%s', (_, createIter) => {
    describe('call', () => {
      it('lazy evaluation', async () => {
        const mock = new MockIterable([1, 2, 3])
        const iter1 = createIter(mock)
        const iter2 = createIter([])

        const result = concatAsync(iter1, iter2)
        const isLazy = mock.nextIndex === 0
        await consumeAsync(takeAsync(result, 1))
        const isPartial = mock.nextIndex === 1

        expect(isLazy).toBe(true)
        expect(isPartial).toBe(true)
      })

      it('return concated iterable', async () => {
        const iter1 = createIter([1, 2, 3])
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
