import { getErrorAsync } from 'return-style'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { toIterable, toArrayAsync, consumeAsync, getCalledTimes, MarkIterable } from '@test/utils'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { iterableChainAsync } from '@test/style-helpers'
import '@test/matchers'

const filterAsync = iterableChainAsync(IterableOperator.prototype.filterAsync)
const getIter = toIterable

describe('IterableOperator<PromiseLike<T>>::filterAsync<U extends T = T>(fn: (element: PromiseLike<T>, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<U>', () => {
  it('called with [element(promise),index]', async () => {
    const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
    const fn = jest.fn()

    const result = filterAsync(iter, fn)
    await consumeAsync(result)

    expect(fn).toBeCalledTimes(3)
    expect(fn).nthCalledWith(1, iter[0], 0)
    expect(fn).nthCalledWith(2, iter[1], 1)
    expect(fn).nthCalledWith(3, iter[2], 2)
  })
})

describe('IterableOperator<T>::filterAsync<U extends T = T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<U>', () => {
  describe('fn is called', () => {
    it('called with [element,index]', async () => {
      const iter = getIter([1, 2, 3])
      const fn = jest.fn()

      const result = filterAsync(iter, fn)
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

        const result = filterAsync(iter, fn)
        const isEval1 = mark.isEvaluated()
        await toArrayAsync(result)
        const isEval2 = mark.isEvaluated()

        expect(isEval1).toBe(false)
        expect(isEval2).toBe(true)
      })

      it('return filtered iterable', async () => {
        const iter = getIter([1, 2, 3])
        const odd = getFn((x: number) => x % 2 === 1)

        const result = filterAsync(iter, odd)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([1, 3])
      })
    })

    describe('fn throw error', () => {
      it('throw error when consume', async () => {
        const customError = new Error('CustomError')
        const iter = getIter([1, 2, 3])
        const fn = getFn(() => { throw customError })

        const result = filterAsync(iter, fn)
        const err = await getErrorAsync(toArrayAsync(result))

        expect(result).toBeAsyncIterable()
        expect(err).toBe(customError)
      })
    })
  })
})