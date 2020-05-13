import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { toAsyncIterable, getCalledTimes, consumeAsync, toArrayAsync, MarkIterable } from '@test/utils'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { getErrorAsync } from 'return-style'
import { asyncIterableChain } from '@test/style-helpers'
import '@test/matchers'

const chunkByAsync = asyncIterableChain(AsyncIterableOperator.prototype.chunkByAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator<T>::chunkByAsync(fn: (element: T, index: number) => boolean | Promise<boolean>): AsyncIterableOperator<T[]>', () => {
  describe('fn is called', () => {
    it('called with [element,index]', async () => {
      const iter = getIter([1, 2, 3])
      const fn = jest.fn()

      const result = chunkByAsync(iter, fn)
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
  , testAsyncFunction('fn return promiselike')
  ])('%s', (_, getFn) => {
    describe('fn return true', () => {
      describe('chunk at middle', () => {
        it('return chunked iterable', async () => {
          const iter = getIter([1, 2, 3])
          const atTwo = getFn((x: number) => x === 2)

          const result = chunkByAsync(iter, atTwo)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([[1, 2], [3]])
        })
      })

      describe('chunk at last', () => {
        it('return chunked iterable', async () => {
          const iter = getIter([1, 2, 3])
          const atThree = getFn((x: number) => x === 3)

          const result = chunkByAsync(iter, atThree)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([[1, 2, 3]])
        })
      })
    })

    describe('fn always return false', () => {
      it('return chunked iterable', async () => {
        const iter = getIter([1, 2, 3])
        const alwaysFalse = getFn(() => false)

        const result = chunkByAsync(iter, alwaysFalse)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[1, 2, 3]])
      })
    })

    it('lazy evaluation', async () => {
      const mark = new MarkIterable()
      const iter = getIter(mark)
      const fn = getFn(jest.fn())

      const result = chunkByAsync(iter, fn)
      const isEval1 = mark.isEvaluated()
      await toArrayAsync(result)
      const isEval2 = mark.isEvaluated()

      expect(isEval1).toBe(false)
      expect(isEval2).toBe(true)
    })

    describe('fn throw error', () => {
      it('throw error when consume', async () => {
        const customError = new Error('CustomError')
        const iter = getIter([1, 2, 3])
        const fn = getFn(() => { throw customError })

        const result = chunkByAsync(iter, fn)
        const err = await getErrorAsync(toArrayAsync(result))

        expect(result).toBeAsyncIterable()
        expect(err).toBe(customError)
      })
    })
  })
})
