
import { getAsyncError } from '@test/return-style'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { toIterable, getCalledTimes, consumeAsync, isAsyncIterable, toArrayAsync } from '@test/utils'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { iterableChainAsync } from '@test/style-helpers'

const mapAsync = iterableChainAsync(IterableOperator.prototype.mapAsync)
const getIter = toIterable

describe('IterableOperator::mapAsync', () => {
  describe('(iterable: Iterable<PromiseLike<T>>, fn: (element: PromiseLike<T>, index: number) -> U | PromiseLike<U>) -> AsyncIterable<U>', () => {
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

  describe('IterableOperator::mapAsync(fn: (element: T, index: number) -> U | PromiseLike<U>) -> AsyncIteralbeOperator<U>', () => {
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
        it('return mapped iterable', async () => {
          const iter = getIter([1, 2, 3])
          const double = getFn((x: number) => x * 2)

          const result = mapAsync(iter, double)
          const isIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([2, 4, 6])
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3])
          const fn = getFn(() => { throw customError })

          const result = mapAsync(iter, fn)
          const isIter = isAsyncIterable(result)
          const err = await getAsyncError(() => toArrayAsync(result))

          expect(isIter).toBe(true)
          expect(err).toBe(customError)
        })
      })
    })
  })
})
