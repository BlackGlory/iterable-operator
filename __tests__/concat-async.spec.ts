import { consumeAsync, toArrayAsync, toIterable, toAsyncIterable, MockIterable, takeAsync } from '@test/utils'
import { testIterable, testIterablePromises, testAsyncIterable } from '@test/test-fixtures'
import { concatAsync } from '@src/concat-async'

describe('concatAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testIterablePromises('IterablePromises')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('lazy evaluation', async () => {
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

    it('returns the concated iterable', async () => {
      const iter1 = createIter([1, 2, 3])
      const iter2 = toIterable(['a', 'b', 'c'])
      const iter3 = toAsyncIterable(['d', 'e', 'f'])

      const result = concatAsync(iter1, iter2, iter3)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toEqual([1, 2, 3, 'a', 'b', 'c', 'd', 'e', 'f'])
    })
  })
})
