import { getErrorAsync } from 'return-style'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { asyncMethod } from '@test/style-helpers'
import { toAsyncIterable } from '@test/utils'
import '@test/matchers'

const someAsync = asyncMethod(IterableOperator.prototype.someAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator<T>::someAsync(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): Promise<boolean>', () => {
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
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBe(true)
      })
    })

    describe('fn return false every time', () => {
      it('return false', async () => {
        const iter = getIter([1, 2, 3])
        const fn = getFn(() => false)

        const result = someAsync(iter, fn)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBe(false)
      })
    })

    describe('fn throw error', () => {
      it('throw error', async () => {
        const customError = new Error('CustomError')
        const iter = getIter([1, 2, 3])
        const fn = getFn(() => { throw customError })

        const err = await getErrorAsync(someAsync(iter, fn))

        expect(err).toBe(customError)
      })
    })
  })
})
