import { toAsyncIterable, toArrayAsync, consumeAsync, getCalledTimes, MarkIterable } from '@test/utils'
import { getErrorAsync } from 'return-style'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { asyncIterableChain } from '@test/style-helpers'
import '@test/matchers'

const tapAsync = asyncIterableChain(AsyncIterableOperator.prototype.tapAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator<T>::tapAsync(fn: (element: T, index: number) => unknown | PromiseLike<unknown>): AsyncIterableOperator<T>', () => {
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
      it('lazy evaluation', async () => {
        const mark = new MarkIterable()
        const iter = getIter(mark)
        const fn = getFn(jest.fn())

        const result = tapAsync(iter, fn)
        const isEval1 = mark.isEvaluated()
        await toArrayAsync(result)
        const isEval2 = mark.isEvaluated()

        expect(isEval1).toBe(false)
        expect(isEval2).toBe(true)
      })

      it('call fn and return iterable', async () => {
        const iter = getIter([1, 2, 3])
        const sideResult: Array<[number, number]> = []
        const pushToSideResult = getFn((x: number, i: number) => sideResult.push([x, i]))

        const result = tapAsync(iter, pushToSideResult)
        const isSideResultEmptyInStage1 = !sideResult.length
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
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
        const err = await getErrorAsync(toArrayAsync(result))

        expect(result).toBeAsyncIterable()
        expect(err).toBe(customError)
      })
    })
  })
})
