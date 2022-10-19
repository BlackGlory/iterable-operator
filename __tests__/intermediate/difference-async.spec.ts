import { consumeAsync, toArrayAsync, MockIterable, toIterable, toAsyncIterable, takeAsync } from '@test/utils'
import { testIterable, testAsyncIterable, testIterablePromises } from '@test/test-fixtures'
import { differenceAsync } from '@intermediate/difference-async'
import '@blackglory/jest-matchers'

describe('differenceAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testIterablePromises('IterablePromises')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('lazy and partial evaluation', async () => {
      const mock = new MockIterable([1, 2, 3])
      const leftIter = createIter(mock)
      const rightIter = createIter([])

      const result = differenceAsync(leftIter, rightIter)
      const isLazy = mock.nextIndex === 0
      await consumeAsync(takeAsync(result, 1))
      const isPartial = mock.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })

    it('returns the difference iterable', async () => {
      const leftIter = createIter([1, 2])
      const rightIter = createIter([2, 3])

      const result = differenceAsync(leftIter, rightIter)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toStrictEqual([1])
    })
  })

  describe('Iterable and AsyncIterable', () => {
    it('returns the difference itearble', async () => {
      const leftIter = toIterable([1, 2])
      const rightIter = toAsyncIterable([2, 3])

      const result = differenceAsync(leftIter, rightIter)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toStrictEqual([1])
    })
  })
})
