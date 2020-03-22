import { getAsyncError } from '@test/return-style'
import { isPromise } from 'extra-promise'
import { toIterable } from '@test/utils'
import { testFunction, testAsyncFunction } from '@test/test-fixtures'
import { method } from '@test/style-helpers'
import { IterableOperator } from '@style/chaining/iterable-operator'

const eachAsync = method(IterableOperator.prototype.eachAsync)
const getIter = toIterable

describe('IterableOperator::eachAsync', () => {
  describe('(fn: (element: T, index: number) -> unknown | PromiseLike<unknown>) -> Promise<void>', () => {
    describe(('(iterable: Iterable<PromiseLike<T>>, fn: (element: PromiseLike<T>, index: number -> unknown | PromiseLike<unknown>) -> Promise<void>'), () => {
      describe('fn is called', () => {
        it('called with [element(promise),index]', async () => {
          const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
          const fn = jest.fn()

          await eachAsync(iter, fn)

          expect(fn).toBeCalledTimes(3)
          expect(fn).nthCalledWith(1, iter[0], 0)
          expect(fn).nthCalledWith(2, iter[1], 1)
          expect(fn).nthCalledWith(3, iter[2], 2)
        })
      })
    })

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
          const isPro = isPromise(result)
          const proResult = await result

          expect(isPro).toBe(true)
          expect(proResult).toBeUndefined()
          expect(sideResult).toEqual([[1, 0], [2, 1], [3, 2]])
        })
      })

      describe('fn throw error', () => {
        it('throw error', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3])
          const fn = getFn(() => { throw customError })

          const err = await getAsyncError(() => eachAsync(iter, fn))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
