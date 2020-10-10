import { getErrorPromise } from 'return-style'
import { testIterable, testAsyncIterable, testFunction, testAsyncFunction } from '@test/test-fixtures'
import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils'
import { mapAsync } from '@middleware/map-async'
import '@blackglory/jest-matchers'

describe('mapAsync<T, U>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => U | PromiseLike<U>): AsyncIterable<U>', () => {
  describe('T is PromiseLike<T>', () => {
    it('called with [element(promise),index]', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn()

      const result = mapAsync(iter, fn)
      await consumeAsync(result)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, iter[0], 0)
      expect(fn).nthCalledWith(2, iter[1], 1)
      expect(fn).nthCalledWith(3, iter[2], 2)
    })
  })

  describe.each([
    testIterable('Iterable<T>')
  , testAsyncIterable('AsyncIterable<T>')
  ])('%s', (_, getIter) => {
    describe('fn called', () => {
      it('called with element, index', async () => {
        const iter = getIter([1, 2, 3])
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
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promise')
    ])('%s', (_, getFn) => {
      describe('call', () => {
        it('lazy and partial evaluation', async () => {
          const mock = new MockIterable([1, 2, 3])
          const iter = getIter(mock)
          const fn = getFn(jest.fn())

          const result = mapAsync(iter, fn)
          const isLazy = mock.nextIndex === 0
          await consumeAsync(takeAsync(result, 1))
          const isPartial = mock.nextIndex === 1

          expect(isLazy).toBe(true)
          expect(isPartial).toBe(true)
        })

        it('return mapped iterable', async () => {
          const iter = getIter([1, 2, 3])
          const double = getFn((x: number) => x * 2)

          const result = mapAsync(iter, double)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([2, 4, 6])
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3])
          const fn = getFn(() => { throw customError })

          const result = mapAsync(iter, fn)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(result).toBeAsyncIterable()
          expect(err).toBe(customError)
        })
      })
    })
  })
})
