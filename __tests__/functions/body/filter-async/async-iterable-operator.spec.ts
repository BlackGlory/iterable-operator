import { getAsyncError } from '@test/return-style'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { toAsyncIterable, toArrayAsync, isAsyncIterable, consumeAsync, getCalledTimes } from '@test/utils'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { asyncIterableChain } from '@test/style-helpers'

const filterAsync = asyncIterableChain(AsyncIterableOperator.prototype.filterAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator::filterAsync', () => {
  describe('(fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> AsyncIterableOperator<T>', () => {
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
        it('return filtered iterable', async () => {
          const iter = getIter([1, 2, 3])
          const odd = getFn((x: number) => x % 2 === 1)

          const result = filterAsync(iter, odd)
          const isIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([1, 3])
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3])
          const fn = getFn(() => { throw customError })

          const result = filterAsync(iter, fn)
          const isIter = isAsyncIterable(result)
          const err = await getAsyncError(() => toArrayAsync(result))

          expect(isIter).toBe(true)
          expect(err).toBe(customError)
        })
      })
    })
  })
})
