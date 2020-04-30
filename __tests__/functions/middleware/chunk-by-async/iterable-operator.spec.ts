import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { toIterable, getCalledTimes, consumeAsync, isAsyncIterable, toArrayAsync, MarkIterable } from '@test/utils'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { getErrorAsync } from 'return-style'
import { iterableChainAsync } from '@test/style-helpers'

const chunkByAsync = iterableChainAsync(IterableOperator.prototype.chunkByAsync)
const getIter = toIterable

describe('IterableOperator<T>::chunkByAsync(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<T[]>', () => {
  describe('IterableOperator<PromiseLike<T>>(iterable: Iterable<PromiseLike<T>>, fn: (element: PromiseLike<T>, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<T[]>', () => {
    it('called with [element(promise),index]', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn()

      const result = chunkByAsync(iter, fn)
      await consumeAsync(result)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, iter[0], 0)
      expect(fn).nthCalledWith(2, iter[1], 1)
      expect(fn).nthCalledWith(3, iter[2], 2)
    })

    it('return AsyncIterable<Array<PromiseLike<T>>>', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn().mockReturnValue(false)

      const result = chunkByAsync(iter, fn)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toEqual([iter])
    })
  })

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
          const atTwo = getFn((x: number) =>  x === 2)

          const result = chunkByAsync(iter, atTwo)
          const isIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([[1, 2], [3]])
        })
      })

      describe('chunk at last', () => {
        it('return chunked iterable', async () => {
          const iter = getIter([1, 2, 3])
          const atThree = getFn((x: number) =>  x === 3)

          const result = chunkByAsync(iter, atThree)
          const isIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([[1, 2, 3]])
        })
      })
    })

    describe('fn always return false', () => {
      it('return chunked iterable', async () => {
        const iter = getIter([1, 2, 3])
        const alwaysFalse = getFn(() => false)

        const result = chunkByAsync(iter, alwaysFalse)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
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
        const isIter = isAsyncIterable(result)
        const err = await getErrorAsync(toArrayAsync(result))

        expect(isIter).toBe(true)
        expect(err).toBe(customError)
      })
    })
  })
})
