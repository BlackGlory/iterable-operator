import { testIterable, testAsyncIterable, testIterablePromises } from '@test/test-fixtures'
import {
  consumeAsync
, toArrayAsync
, toIterable
, toAsyncIterable
, MockIterable
, MockAsyncIterable
} from '@test/utils'
import { zipAsync } from '@src/zip-async'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe('zipAsync', () => {
  describe('close the unexhausted iterator', () => {
    test('Iterable', async () => {
      const iter = new MockIterable(go(function* () {
       throw new Error()
      }))

      try {
        await consumeAsync(zipAsync(iter, []))
      } catch {
        pass()
      }

      expect(iter.returnCalled).toBeTruthy()
      expect(iter.done).toBeTruthy()
    })

    test('AsyncIterable', async () => {
      const iter = new MockAsyncIterable(go(function* () {
       throw new Error()
      }))

      try {
        await consumeAsync(zipAsync(iter, []))
      } catch {
        pass()
      }

      expect(iter.returnCalled).toBeTruthy()
      expect(iter.done).toBeTruthy()
    })
  })

  describe.each([
    testIterable('Iterable')
  , testIterablePromises('IterablePromises')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('lazy evaluation', async () => {
      const mock = new MockIterable([1, 2, 3])
      const iter1 = createIter(mock)
      const iter2 = createIter([])

      const result = zipAsync(iter1, iter2)
      const isLazy = mock.nextIndex === 0
      await consumeAsync(result)
      const isPartial = mock.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })

    describe('iterables have same size', () => {
      it('returns the zipped iterable', async () => {
        const iter1 = createIter([1, 2, 3])
        const iter2 = createIter(['a', 'b', 'c'])

        const result = zipAsync(iter1, iter2)
        const arrResult = await toArrayAsync(result)

        expect(arrResult).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
      })
    })

    describe('iterables dont have same size', () => {
      it('returns the zipped iterable by the shortest iterable', async () => {
        const iter1 = createIter([1, 2, 3])
        const iter2 = createIter(['a', 'b'])

        const result = zipAsync(iter1, iter2)
        const arrResult = await toArrayAsync(result)

        expect(arrResult).toEqual([[1, 'a'], [2, 'b']])
      })
    })
  })

  describe('Iterable and AsyncIterable', () => {
    it('returns the zipped iterable', async () => {
      const iter1 = toIterable([1, 2, 3])
      const iter2 = toAsyncIterable(['a', 'b', 'c'])

      const result = zipAsync(iter1, iter2)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
    })
  })
})
