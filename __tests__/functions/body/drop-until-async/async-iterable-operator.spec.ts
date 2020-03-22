import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { isAsyncIterable, toArrayAsync, getCalledTimes, consumeAsync, toAsyncIterable } from '@test/utils'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { getAsyncError } from '@test/return-style'
import { asyncIterableChain } from '@test/style-helpers'

const dropUntilAsync = asyncIterableChain(IterableOperator.prototype.dropUntilAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator::dropUntilAsync', () => {
  describe('(fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> AsyncIterableOperator<T>', () => {
    describe('fn is called', () => {
      it('called with [element,index]', async () => {
        const iter = getIter([1, 2, 3])
        const fn = jest.fn().mockReturnValue(false)

        const result = dropUntilAsync(iter, fn)
        const calledTimesBeforeConsume = getCalledTimes(fn)
        await consumeAsync(result)
        const calledTimesAfterConsume = getCalledTimes(fn)

        expect(calledTimesBeforeConsume).toBe(0)
        expect(calledTimesAfterConsume).toBe(3)
        expect(fn).nthCalledWith(1, 1, 0)
        expect(fn).nthCalledWith(2, 2, 1)
        expect(fn).nthCalledWith(3, 3, 2)
      })

      describe('return true on first element', () => {
        it('called once', async () => {
          const iter = getIter([1, 2, 3])
          const fn = jest.fn().mockReturnValueOnce(true)

          const result = dropUntilAsync(iter, fn)
          const calledTimesBeforeConsume = getCalledTimes(fn)
          await consumeAsync(result)
          const calledTimesAfterConsume = getCalledTimes(fn)

          expect(calledTimesBeforeConsume).toBe(0)
          expect(calledTimesAfterConsume).toBe(1)
        })
      })
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promise')
    ])('%s', (_, getFn) => {
      describe('call', () => {
        it('return itreable that drop elements until fn return true', async () => {
          const iter = getIter([1, 2, 3])
          const atTwo = getFn((x: number) => x === 2)

          const result = dropUntilAsync(iter, atTwo)
          const isIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([2, 3])
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3])
          const fn = () => { throw customError }

          const result = dropUntilAsync(iter, fn)
          const isIter = isAsyncIterable(result)
          const err = await getAsyncError(() => toArrayAsync(result))

          expect(isIter).toBe(true)
          expect(err).toBe(customError)
        })
      })
    })
  })
})
