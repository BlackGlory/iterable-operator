import { testIterable, testAsyncIterable } from '@test/test-fixtures'
import {
  consumeAsync
, toArrayAsync
, toIterable
, toAsyncIterable
, MockIterable
, MockAsyncIterable
} from '@test/utils'
import { zipAsync } from '@middleware/zip-async'
import '@blackglory/jest-matchers'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe(`
  zipAsync<T, U extends Array<Iterable<unknown> | AsyncIterable<unknown>>>(
    iterable: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
  , ...otherIterables: U
  ): AsyncIterable<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]>
`, () => {
  describe('close unexhausted iterator', () => {
    test('iterable', async () => {
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

    test('async iterable', async () => {
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
  ])('%s', (_, createIter) => {
    it('lazy evaluation', async () => {
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
      it('return zipped iterable', async () => {
        const iter1 = createIter([1, 2, 3])
        const iter2 = createIter(['a', 'b', 'c'])

        const result = zipAsync(iter1, iter2)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
      })
    })

    describe('iterables dont have same size', () => {
      it('return zipped iterable by the shortest iterable', async () => {
        const iter1 = createIter([1, 2, 3])
        const iter2 = createIter(['a', 'b'])

        const result = zipAsync(iter1, iter2)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[1, 'a'], [2, 'b']])
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
