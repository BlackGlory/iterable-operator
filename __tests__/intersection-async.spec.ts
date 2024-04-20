import { describe, test, it, expect } from 'vitest'
import { consumeAsync, toArrayAsync, MockIterable, toIterable, toAsyncIterable, takeAsync } from '@test/utils.js'
import { testIterable, testAsyncIterable, testIterablePromises } from '@test/test-fixtures.js'
import { intersectionAsync } from '@src/intersection-async.js'

describe('intersectionAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testIterablePromises('IterablePromises')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('lazy and partial evaluation', async () => {
      const mock = new MockIterable([1, 2])
      const leftIter = createIter(mock)
      const rightIter = createIter([1, 2])

      const result = intersectionAsync(leftIter, rightIter)
      const isLazy = mock.nextIndex === 0
      await consumeAsync(takeAsync(result, 1))
      const isPartial = mock.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })

    it('returns the intersection iterable', async () => {
      const leftIter = createIter([1, 2])
      const rightIter = createIter([2, 3])

      const result = intersectionAsync(leftIter, rightIter)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toStrictEqual([2])
    })
  })

  describe('Iterable and AsyncIterable', () => {
    it('returns the intersection itearble', async () => {
      const leftIter = toIterable([1, 2])
      const rightIter = toAsyncIterable([2, 3])

      const result = intersectionAsync(leftIter, rightIter)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toStrictEqual([2])
    })
  })
})
