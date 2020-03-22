import { toAsyncIterable, toArrayAsync, isAsyncIterable, consumeAsync, getCalledTimes } from '@test/utils'
import { getAsyncError } from '@test/return-style'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { asyncIterableChain } from '@test/style-helpers'

const tapAsync = asyncIterableChain(AsyncIterableOperator.prototype.tapAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator::tapAsync', () => {
  describe('(fn: (element: T, index: number) -> unknown | PromiseLike<unknown>) -> AsyncIterableOperator<T>', () => {
    describe('fn is called', () => {
      it('called with [element,index]', async () => {
        const iter = getIter([1, 2, 3])
        const fn = jest.fn()

        const result = tapAsync(iter, fn)
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
        it('call fn and return iterable', async () => {
          const iter = getIter([1, 2, 3])
          const sideResult: Array<[number, number]> = []
          const pushToSideResult = getFn((x: number, i: number) => sideResult.push([x, i]))

          const result = tapAsync(iter, pushToSideResult)
          const isIter = isAsyncIterable(result)
          const isSideResultEmptyInStage1 = !sideResult.length
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(isSideResultEmptyInStage1).toBe(true)
          expect(arrResult).toEqual([1, 2, 3])
          expect(sideResult).toEqual([[1, 0], [2, 1], [3, 2]])
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3])
          const justThrow = () => { throw customError }

          const result = tapAsync(iter, justThrow)
          const isIter = isAsyncIterable(result)
          const err = await getAsyncError(() => toArrayAsync(result))

          expect(isIter).toBe(true)
          expect(err).toBe(customError)
        })
      })
    })
  })
})
