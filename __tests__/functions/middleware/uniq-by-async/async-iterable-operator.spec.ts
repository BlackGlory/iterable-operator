import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { toAsyncIterable, getCalledTimes, consumeAsync, isAsyncIterable, toArrayAsync, MarkIterable } from '@test/utils'
import { getErrorAsync } from 'return-style'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { asyncIterableChain } from '@test/style-helpers'

const uniqByAsync = asyncIterableChain(AsyncIterableOperator.prototype.uniqByAsync)
const getIter = toAsyncIterable

describe('IterableOperator<T>::uniqByAsync<U>(fn: (element: T, index: number) => U | PromiseLike<U>): AsyncIterableOperator<T>', () => {
  describe('fn is called', () => {
    it('called with [element,index]', async () => {
      const iter = getIter([1, 2, 3])
      const fn = jest.fn()

      const result = uniqByAsync(iter, fn)
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
      it('return iterable unique by fn', async () => {
        const iter = getIter([1, 2, 3])
        const modTwo = getFn((x: number) => x % 2)

        const result = uniqByAsync(iter, modTwo)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([1, 2])
      })

      it('lazy evaluation', async () => {
        const mark = new MarkIterable()
        const iter = getIter(mark)
        const fn = getFn(jest.fn())

        const result = uniqByAsync(iter, fn)
        const isEval1 = mark.isEvaluated()
        await toArrayAsync(result)
        const isEval2 = mark.isEvaluated()

        expect(isEval1).toBe(false)
        expect(isEval2).toBe(true)
      })
    })

    describe('fn throw error', () => {
      it('throw error when consume', async () => {
        const customError = new Error('CustomError')
        const iter = getIter([1, 2, 3])
        const fn = getFn(() => { throw customError })

        const result = uniqByAsync(iter, fn)
        const isIter = isAsyncIterable(result)
        const err = await getErrorAsync(toArrayAsync(result))

        expect(isIter).toBe(true)
        expect(err).toBe(customError)
      })
    })
  })
})
