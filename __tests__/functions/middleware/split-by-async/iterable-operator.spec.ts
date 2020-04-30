import { toIterable, getCalledTimes, consumeAsync, isAsyncIterable, toArrayAsync, MarkIterable } from '@test/utils'
import { testAsyncFunction, testFunction } from '@test/test-fixtures'
import { getErrorAsync } from 'return-style'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { iterableChainAsync } from '@test/style-helpers'

const splitByAsync = iterableChainAsync(IterableOperator.prototype.splitByAsync)
const getIter = toIterable

describe('ItearbleOperator<PromiseLike<T>>::splitByAsync(fn: (element: PromiseLike<T>, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<T[]>', () => {
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

    describe('call', () => {
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

      it('return splited iterable', async () => {
        const iter = getIter([1, 2, 3, 4, 5])
        const atThree = getFn((x: number) =>  x === 3)

        const result = splitByAsync(iter, atThree)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })
    })

    describe('fn throw error', () => {
      it('throw error when consume', async () => {
        const customError = new Error('CustomError')
        const iter = getIter([1, 2, 3, 4, 5])
        const fn = () => { throw customError }

        const result = splitByAsync(iter, fn)
        const isIter = isAsyncIterable(result)
        const err = await getErrorAsync(toArrayAsync(result))

        expect(isIter).toBe(true)
        expect(err).toBe(customError)
      })
    })
  })
})
