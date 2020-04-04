import { getAsyncError } from '@test/return-style'
import { isPromise } from 'extra-promise'
import { RuntimeError } from '@error'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { toAsyncIterable } from '@test/utils'
import { asyncMethod } from '@test/style-helpers'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

const reduceAsync = asyncMethod(AsyncIterableOperator.prototype.reduceAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator::reduceAsync', () => {
  describe('(fn: (accumulator: T, currentValue: T, index: number) -> T | PromiseLike<T>) -> Promise<T>', () => {
    describe('fn is called', () => {
      it('called with [accumulator,currentValue,index]', async () => {
        const iter = getIter([1, 2, 3])
        const fn = jest.fn()
          .mockReturnValueOnce(1 + 2)
          .mockReturnValueOnce(1 + 2 + 3)

        await reduceAsync(iter, fn)

        expect(fn).toBeCalledTimes(2)
        expect(fn).nthCalledWith(1, 1, 2, 1)
        expect(fn).nthCalledWith(2, 1 + 2, 3, 2)
      })
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promise')
    ])('%s', (_, getFn) => {
      describe('size(iterable) = 0', () => {
        describe('call', () => {
          it('throw RuntimeError', async () => {
            const iter = getIter([])
            const fn = getFn((acc: number, cur: number) => acc + cur)

            const err = await getAsyncError<RuntimeError>(() => reduceAsync(iter, fn))

            expect(err).toBeInstanceOf(RuntimeError)
          })
        })
      })

      describe('size(iterable) = 1', () => {
        describe('call', () => {
          it('return the element without calling fn', async () => {
            const iter = getIter([1])
            const fn = jest.fn()

            const result = reduceAsync(iter, fn)
            const isPro = isPromise(result)
            const proResult = await result

            expect(fn.mock.calls.length).toBe(0) // skip
            expect(proResult).toBe(1)
          })
        })
      })

      describe('size(iterable) > 1', () => {
        describe('call', () => {
          it('return result from reduction', async () => {
            const iter = getIter([1, 2, 3])
            const fn = getFn((acc: number, cur: number ) => acc + cur)

            const result = reduceAsync(iter, fn)
            const isPro = isPromise(result)
            const proResult = await result

            expect(isPro).toBe(true)
            expect(proResult).toBe(6)
          })
        })

        describe('fn throw error', () => {
          it('throw error', async () => {
            const customError = new Error('CustomError')
            const iter = getIter([1, 2, 3])
            const fn = () => { throw customError }

            const err = await getAsyncError(() => reduceAsync(iter, fn))

            expect(err).toBe(customError)
          })
        })
      })
    })
  })

  describe('(fn: (accumulator: U, currentValue: T, index: number) -> U | PromiseLike<U>, initalValue: U) -> Promise<U>', () => {
    describe('fn is called', () => {
      it('called with [accumulator,currentValue,index]', async () => {
        const iter = getIter([1, 2, 3])
        const fn = jest.fn()
          .mockReturnValueOnce(0 + 1)
          .mockReturnValueOnce(0 + 1 + 2)
          .mockReturnValueOnce(0 + 1 + 2 + 3)
        const initalValue = 0

        await reduceAsync(iter, fn, initalValue)

        expect(fn).toBeCalledTimes(3)
        expect(fn).nthCalledWith(1, 0, 1, 0)
        expect(fn).nthCalledWith(2, 0 + 1, 2, 1)
        expect(fn).nthCalledWith(3, 0 + 1 + 2, 3, 2)
      })
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promise')
    ])('%s', (_, getFn) => {
      describe('call', () => {
        it('return result from reduction', async () => {
          const iter = getIter([1, 2, 3])
          const pushToAcc = getFn((acc: Array<[number, number]>, cur: number, index: number) => {
            acc.push([cur, index])
            return acc
          })
          const initalValue: Array<[number, number]> = []

          const result = reduceAsync(iter, pushToAcc, initalValue)
          const isPro = isPromise(result)
          const proResult = await result

          expect(isPro).toBe(true)
          expect(proResult).toEqual([[1, 0], [2, 1], [3, 2]])
        })
      })
    })
  })
})