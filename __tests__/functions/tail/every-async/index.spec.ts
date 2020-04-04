import { getAsyncError } from '@test/return-style'
import { isPromise } from 'extra-promise'
import { testFunction, testAsyncFunction, testIterable, testAsyncIterable, testCall, testPipe, testBind } from '@test/test-fixtures'
import { everyAsync as call } from '@tail/every-async'
import { everyAsync as pipe } from '@style/pipeline/tail/every-async'
import { everyAsync as bind } from '@style/binding/tail/every-async'

describe('everyAsync', () => {
  describe.each([
    testCall('(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> Promise<boolean>', call)
  , testPipe('(fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> (iterable: Iterable<T> | AsyncIterable<T>) -> Promise<boolean>', pipe)
  , testBind('(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> Promise<boolean>', bind)
  ])('%s', (_, everyAsync) => {
    describe('(iterable: Iterable<PromiseLike<T>>, fn: (element: PromiseLike<T>, index: number) -> boolean | PromiseLike<boolean>) -> Promise<boolean>', () => {
      describe('fn is called', () => {
        it('called with [element(promise),index]', async () => {
          const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
          const fn = jest.fn().mockReturnValue(true)

          await everyAsync(iter, fn)

          expect(fn).toBeCalledTimes(3)
          expect(fn).nthCalledWith(1, iter[0], 0)
          expect(fn).nthCalledWith(2, iter[1], 1)
          expect(fn).nthCalledWith(3, iter[2], 2)
        })
      })
    })

    describe.each([
      testIterable('(iterable: Iterable<T>, fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> Promise<boolean>')
    , testAsyncIterable('(iterable: AsyncIterable<T>, fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> Promise<boolean>')
    ])('%s', (_, getIter) => {
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
            const isPro = isPromise(result)
            const proResult = await result

            expect(isPro).toBe(true)
            expect(proResult).toBe(true)
          })
        })

        describe('fn return true not every time', () => {
          it('return false', async () => {
            const iter = getIter([1, 2, 3])
            const fn = getFn(() => false)

            const result = everyAsync(iter, fn)
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

            const err = await getAsyncError(() => everyAsync(iter, fn))

            expect(err).toBe(customError)
          })
        })
      })
    })
  })
})