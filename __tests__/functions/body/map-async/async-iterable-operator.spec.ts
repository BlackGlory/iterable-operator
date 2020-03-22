
import { getAsyncError } from '@test/return-style'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { toAsyncIterable, getCalledTimes, consumeAsync, isAsyncIterable, toArrayAsync } from '@test/utils'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { asyncIterableChain } from '@test/style-helpers'

const mapAsync = asyncIterableChain(AsyncIterableOperator.prototype.mapAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator::mapAsync', () => {
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
