import { toAsyncIterable, getCalledTimes, consumeAsync, isAsyncIterable, toArrayAsync } from '@test/utils'
import { testAsyncFunction, testFunction } from '@test/test-fixtures'
import { getAsyncError } from '@test/return-style'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { asyncIterableChain } from '@test/style-helpers'

const splitByAsync = asyncIterableChain(AsyncIterableOperator.prototype.splitByAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator::splitByAsync', () => {
  describe('(fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> AsyncIterableOperator<T[]>', () => {
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
          const err = await getAsyncError(() => toArrayAsync(result))

          expect(isIter).toBe(true)
          expect(err).toBe(customError)
        })
      })
    })
  })
})
