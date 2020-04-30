import { getErrorAsync } from 'return-style'
import { toAsyncIterable } from '@test/utils'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { asyncMethod } from '@test/style-helpers'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

const eachAsync = asyncMethod(AsyncIterableOperator.prototype.eachAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator<T>::eachAsync(fn: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<void>', () => {
  describe('fn is called', () => {
    it('called with [element,index]', async () => {
      const iter = getIter([1, 2, 3])
      const fn = jest.fn()

      await eachAsync(iter, fn)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })
  })

  describe.each([
    testFunction('fn return non-promise')
  , testAsyncFunction('fn return promiselike')
  ])('%s', (_, getFn) => {
    describe('call', () => {
      it('execute fn once for each iterable element', async () => {
        const iter = getIter([1, 2, 3])
        const sideResult: Array<[number, number]> = []
        const pushToSideResult = getFn((x: number, i: number) => sideResult.push([x, i]))

        const result = eachAsync(iter, pushToSideResult)
        const proResult = await result

        expect(result).toBeInstanceOf(Promise)
        expect(proResult).toBeUndefined()
        expect(sideResult).toEqual([[1, 0], [2, 1], [3, 2]])
      })
    })

    describe('fn throw error', () => {
      it('throw error', async () => {
        const customError = new Error('CustomError')
        const iter = getIter([1, 2, 3])
        const fn = getFn(() => { throw customError })

        const err = await getErrorAsync(eachAsync(iter, fn))

        expect(err).toBe(customError)
      })
    })
  })
})
