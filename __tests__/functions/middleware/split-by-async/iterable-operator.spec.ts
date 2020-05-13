import { toIterable, getCalledTimes, consumeAsync, toArrayAsync, MarkIterable } from '@test/utils'
import { testAsyncFunction, testFunction } from '@test/test-fixtures'
import { getErrorAsync } from 'return-style'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { iterableChainAsync } from '@test/style-helpers'
import '@test/matchers'

const splitByAsync = iterableChainAsync(IterableOperator.prototype.splitByAsync)
const getIter = toIterable

describe('ItearbleOperator<PromiseLike<T>>::splitByAsync(fn: (element: PromiseLike<T>, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<Array<PromiseLike<T>>>', () => {
  it('called with [element(promise),index]', async () => {
    const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
    const fn = jest.fn()

    const result = splitByAsync(iter, fn)
    await consumeAsync(result)

    expect(fn).toBeCalledTimes(3)
    expect(fn).nthCalledWith(1, iter[0], 0)
    expect(fn).nthCalledWith(2, iter[1], 1)
    expect(fn).nthCalledWith(3, iter[2], 2)
  })

  it('return AsyncIterable<Array<PromiseLike<T>>>', async () => {
    const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
    const fn = jest.fn().mockReturnValue(false)

    const result = splitByAsync(iter, fn)
    const arrResult = await toArrayAsync(result)

    expect(arrResult).toEqual([iter])
  })
})

describe('IterableOperator<T>::splitByAsync(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<T[]>', () => {
  describe.each([
    testFunction('fn return non-promise')
  , testAsyncFunction('fn return promise')
  ])('%s', (_, getFn) => {
    describe('fn is called', () => {
      it('called with [element,index]', async () => {
        const iter = getIter([1, 2, 3])
        const fn = jest.fn()

        const result = splitByAsync(iter, fn)
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

    describe('fn return true', () => {
      describe('separator is first', () => {
        it('return splited iterable', async () => {
          const iter = getIter([1, 2, 3, 4, 5])
          const atThree = getFn((x: number) =>  x === 1)

          const result = splitByAsync(iter, atThree)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([[], [2, 3, 4, 5]])
        })
      })

      describe('separator is middle', () => {
        it('return splited iterable', async () => {
          const iter = getIter([1, 2, 3, 4, 5])
          const atThree = getFn((x: number) => x === 3)

          const result = splitByAsync(iter, atThree)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([[1, 2], [4, 5]])
        })
      })

      describe('separator is last', () => {
        it('return splited iterable', async () => {
          const iter = getIter([1, 2, 3, 4, 5])
          const atThree = getFn((x: number) => x === 5)

          const result = splitByAsync(iter, atThree)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([[1, 2, 3, 4], []])
        })
      })
    })

    describe('fn always return false', () => {
      it('return splited iterable', async () => {
        const iter = getIter([1, 2, 3, 4, 5])
        const alwaysFalse = getFn(() => false)

        const result = splitByAsync(iter, alwaysFalse)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
      })
    })

    it('lazy evaluation', async () => {
      const mark = new MarkIterable()
      const iter = getIter(mark)
      const fn = getFn(jest.fn())

      const result = splitByAsync(iter, fn)
      const isEval1 = mark.isEvaluated()
      await toArrayAsync(result)
      const isEval2 = mark.isEvaluated()

      expect(isEval1).toBe(false)
      expect(isEval2).toBe(true)
    })

    describe('fn throw error', () => {
      it('throw error when consume', async () => {
        const customError = new Error('CustomError')
        const iter = getIter([1, 2, 3, 4, 5])
        const fn = () => { throw customError }

        const result = splitByAsync(iter, fn)
        const err = await getErrorAsync(toArrayAsync(result))

        expect(result).toBeAsyncIterable()
        expect(err).toBe(customError)
      })
    })
  })
})