import { getErrorAsync } from 'return-style'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { toAsyncIterable } from '@test/utils'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { asyncMethod } from '@test/style-helpers'
import '@test/matchers'

const everyAsync = asyncMethod(AsyncIterableOperator.prototype.everyAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator<T>::everyAsync(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): Promise<boolean>', () => {
  describe('fn is called', () => {
    it('called with [element,index]', async () => {
      const iter = getIter([1, 2, 3])
      const fn = jest.fn().mockReturnValue(true)

      await everyAsync(iter, fn)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    describe('fn return false on first element', () => {
      it('fn is called once', async () => {
        const iter = getIter([1, 2, 3])
        const fn = jest.fn().mockReturnValueOnce(false)

        await everyAsync(iter, fn)

        expect(fn).toBeCalledTimes(1)
      })
    })
  })

  describe.each([
    testFunction('fn return non-promise')
  , testAsyncFunction('fn return promiselike')
  ])('%s', (_, getFn) => {
    describe('fn return true every time', () => {
      it('return true', async () => {
        const iter = getIter([1, 2, 3])
        const isNumber = getFn(() => true)

        const result = everyAsync(iter, isNumber)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBe(true)
      })
    })

    describe('fn return true not every time', () => {
      it('return false', async () => {
        const iter = getIter([1, 2, 3])
        const fn = getFn(() => false)

        const result = everyAsync(iter, fn)
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

        const err = await getErrorAsync(everyAsync(iter, fn))

        expect(err).toBe(customError)
      })
    })
  })
})
