import { getErrorPromise } from 'return-style'
import { testIterable, testAsyncIterable, testFunction, testAsyncFunction } from '@test/test-fixtures'
import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils'
import { mapAsync } from '@intermediate/map-async'
import '@blackglory/jest-matchers'

describe('mapAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('called fn with element, index', async () => {
      const iter = createIter([1, 2, 3])
      const fn = jest.fn()

      const result = mapAsync(iter, fn)
      const calledTimesBeforeConsume = getCalledTimes(fn)
      await consumeAsync(result)
      const calledTimesAfterConsume = getCalledTimes(fn)

      expect(calledTimesBeforeConsume).toBe(0)
      expect(calledTimesAfterConsume).toBe(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    describe.each([
      testFunction('fn returns NonPromiseLike')
    , testAsyncFunction('fn returns PromiseLike')
    ])('%s', (_, createFn) => {
      describe('call', () => {
        it('lazy and partial evaluation', async () => {
          const mock = new MockIterable([1, 2, 3])
          const iter = createIter(mock)
          const fn = createFn(jest.fn())

          const result = mapAsync(iter, fn)
          const isLazy = mock.nextIndex === 0
          await consumeAsync(takeAsync(result, 1))
          const isPartial = mock.nextIndex === 1

          expect(isLazy).toBe(true)
          expect(isPartial).toBe(true)
        })

        it('returns the mapped iterable', async () => {
          const iter = createIter([1, 2, 3])
          const double = createFn((x: number) => x * 2)

          const result = mapAsync(iter, double)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([2, 4, 6])
        })
      })

      describe('fn throws an error', () => {
        it('throws an error when consuming iterable', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => { throw customError })

          const result = mapAsync(iter, fn)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(result).toBeAsyncIterable()
          expect(err).toBe(customError)
        })
      })
    })
  })
})
