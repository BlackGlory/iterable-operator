import { getErrorPromise } from 'return-style'
import { testIterable, testAsyncIterable, testFunction, testAsyncFunction } from '@test/test-fixtures.js'
import { toArrayAsync, consumeAsync, getCalledTimes, MockIterable, takeAsync } from '@test/utils.js'
import { filterAsync } from '@src/filter-async.js'
import { jest } from '@jest/globals'

describe('filterAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('called fn with [element, index]', async () => {
      const iter = createIter([1, 2, 3])
      const fn = jest.fn()

      const result = filterAsync(iter, fn)
      const calledTimesBeforeConsume = getCalledTimes(fn)
      await consumeAsync(result)
      const calledTimesAfterConsume = getCalledTimes(fn)

      expect(calledTimesBeforeConsume).toBe(0)
      expect(calledTimesAfterConsume).toBe(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    test('lazy and partial evaluation', async () => {
      const mock = new MockIterable([1, 2, 3])
      const iter = createIter(mock)
      const fn = () => true

      const result = filterAsync(iter, fn)
      const isLazy = mock.nextIndex === 0
      await consumeAsync(takeAsync(result, 1))
      const isPartial = mock.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })

    describe.each([
      testFunction('fn returns NonPromiseLike')
    , testAsyncFunction('fn returns PromiseLike')
    ])('%s', (_, createFn) => {
      describe('call', () => {
        it('returns the filtered iterable', async () => {
          const iter = createIter([1, 2, 3])
          const odd = createFn((x: number) => x % 2 === 1)

          const result = filterAsync(iter, odd)
          const arrResult = await toArrayAsync(result)

          expect(arrResult).toEqual([1, 3])
        })
      })

      describe('fn throws an error', () => {
        it('throws an error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => { throw customError })

          const result = filterAsync(iter, fn)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
