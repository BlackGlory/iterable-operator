import { toAsyncIterable, getCalledTimes, consumeAsync, isAsyncIterable, toArrayAsync, MarkIterable } from '@test/utils'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { getErrorAsync } from 'return-style'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { asyncIterableChain } from '@test/style-helpers'

const flattenByAsync = asyncIterableChain(AsyncIterableOperator.prototype.flattenByAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator<unknown>::flattenByAsync<U>(fn: (element: unknown, level: number) => boolean | PromiseLike<boolean>) => AsyncIterableOperator<T>', () => {
  describe('fn is called', () => {
    it('called with [element,level]', async () => {
      const iter = getIter([0, [1]])
      const fn = jest.fn().mockReturnValue(true)

      const result = flattenByAsync(iter, fn)
      const calledTimesBeforeConsume = getCalledTimes(fn)
      await consumeAsync(result)
      const calledTimesAfterConsume = getCalledTimes(fn)

      expect(calledTimesBeforeConsume).toBe(0)
      expect(calledTimesAfterConsume).toBe(1)
      expect(fn).nthCalledWith(1, [1], 1)
    })
  })

  describe.each([
    testFunction('fn return non-promise')
  , testAsyncFunction('fn return promiselike')
  ])('%s', (_, getFn) => {
    describe('call', () => {
      it('lazy evaluation', async () => {
        const mark = new MarkIterable()
        const iter = getIter(mark)
        const fn = getFn(jest.fn())

        const result = flattenByAsync(iter, fn)
        const isEval1 = mark.isEvaluated()
        await toArrayAsync(result)
        const isEval2 = mark.isEvaluated()

        expect(isEval1).toBe(false)
        expect(isEval2).toBe(true)
      })

      it('return flat iterable', async () => {
        const iter = getIter([
          'one', ['two']
        , 0, [1]
        ])
        const exceptString = getFn((x: unknown) => !isString(x))

        const result = flattenByAsync(iter, exceptString)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([
          'one', 'two'
        , 0, 1
        ])
      })
    })

    describe('fn return false on level zero', () => {
      it('return iterable copy', async () => {
        const iter = getIter([0, [1]])
        const alwaysFalse = getFn(() => false)

        const result = flattenByAsync(iter, alwaysFalse)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(result).not.toBe(iter)
        expect(arrResult).toEqual([0, [1]])
      })
    })

    describe('iterable is empty', () => {
      it('return empty iterable', async () => {
        const iter = getIter([])
        const fn = getFn(() => true)

        const result = flattenByAsync(iter, fn)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([])
      })
    })

    describe('fn throw error', () => {
      it('throw error when consume', async () => {
        const customError = new Error('CustomError')
        const iter = getIter([[1]])
        const fn = getFn(() => { throw customError })

        const result = flattenByAsync(iter, fn)
        const isIter = isAsyncIterable(result)
        const err = await getErrorAsync(toArrayAsync(result))

        expect(isIter).toBe(true)
        expect(err).toBe(customError)
      })
    })
  })
})

function isString(val: unknown): val is string {
  return typeof val === 'string'
}
