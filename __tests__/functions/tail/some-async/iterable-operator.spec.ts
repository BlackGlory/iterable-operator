import { getAsyncError } from '@test/return-style'
import { isPromise } from 'extra-promise'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { method } from '@test/style-helpers'
import { toIterable } from '@test/utils'

const someAsync = method(IterableOperator.prototype.someAsync)
const getIter = toIterable

describe('IterableOperator::someAsync', () => {
  describe('(fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> Promise<boolean>', () => {
    describe('(iterable: Iterable<PromiseLike>, fn: (element: PromiseLike, index: number -> unknown | PromiseLike<unknown>) -> Promise<void>', () => {
      it('called with [element(promise), index]', async () => {
        const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
        const fn = jest.fn().mockReturnValue(false)

        await someAsync(iter, fn)

        expect(fn).toBeCalledTimes(3)
        expect(fn).nthCalledWith(1, iter[0], 0)
        expect(fn).nthCalledWith(2, iter[1], 1)
        expect(fn).nthCalledWith(3, iter[2], 2)
      })
    })

    describe('fn is called', () => {
      it('called with [element,index]', async () => {
        const iter = getIter([1, 2, 3])
        const fn = jest.fn().mockReturnValue(false)

        await someAsync(iter, fn)

        expect(fn).toBeCalledTimes(3)
        expect(fn).nthCalledWith(1, 1, 0)
        expect(fn).nthCalledWith(2, 2, 1)
        expect(fn).nthCalledWith(3, 3, 2)
      })

      describe('fn return true on first element', () => {
        it('called once', async () => {
          const iter = getIter([1, 2, 3])
          const fn = jest.fn().mockReturnValueOnce(true)

          await someAsync(iter, fn)

          expect(fn).toBeCalledTimes(1)
        })
      })
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return PromiseLike')
    ])('%s', (_, getFn) => {
      describe('fn return true', () => {
        it('return true', async () => {
          const iter = getIter([1, 2, 3])
          const fn = getFn(() => true)

          const result = someAsync(iter, fn)
          const isPro = isPromise(result)
          const proResult = await result

          expect(isPro).toBe(true)
          expect(proResult).toBe(true)
        })
      })

      describe('fn return false every time', () => {
        it('return false', async () => {
          const iter = getIter([1, 2, 3])
          const fn = getFn(() => false)

          const result = someAsync(iter, fn)
          const isPro = isPromise(result)
          const proResult = await result

          expect(isPro).toBe(true)
          expect(proResult).toBe(false)
        })
      })

      describe('fn throw error', () => {
        it('throw error', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3])
          const fn = getFn(() => { throw customError })

          const err = await getAsyncError(() => someAsync(iter, fn))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
