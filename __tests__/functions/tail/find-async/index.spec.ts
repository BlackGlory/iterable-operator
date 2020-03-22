import { getAsyncError } from '@test/return-style'
import { isPromise } from 'extra-promise'
import { RuntimeError } from '@error'
import { testFunction, testAsyncFunction, testIterable, testAsyncIterable, testCall, testPipe, testBind } from '@test/test-fixtures'
import { findAsync as call } from '@tail/find-async'
import { findAsync as pipe } from '@style/pipeline/tail/find-async'
import { findAsync as bind } from '@style/binding/tail/find-async'

describe('findAsync', () => {
  describe.each([
    testCall('(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> Promise<T>', call)
  , testPipe('(fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> (iterable: Iterable<T> | AsyncIterable<T>) -> Promise<T>', pipe)
  , testBind('(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> Promise<T>', bind)
  ])('%s', (_, findAsync) => {
    describe('(iterable: Iterable<PromiseLike<T>>, fn: (element: PromiseLike<T>, index: number) -> boolean | PromiseLike<boolean>) -> Promise<T>', () => {
      it('called with [element(promise),index]', async () => {
        const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
        const fn = jest.fn()
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true)

        await findAsync(iter, fn)

        expect(fn).toBeCalledTimes(3)
        expect(fn).nthCalledWith(1, iter[0], 0)
        expect(fn).nthCalledWith(2, iter[1], 1)
        expect(fn).nthCalledWith(3, iter[2], 2)
      })
    })

    describe.each([
      testIterable('(iterable: Iterable<T>, fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> Promise<T>')
    , testAsyncIterable('(iterable: AsyncIterable<T>, fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> Promise<T>')
    ])('%s', (_, getIter) => {
      describe('fn is called', () => {
        it('called with [element,index]', async () => {
          const iter = getIter([1, 2, 3])
          const fn = jest.fn()
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true)

          await findAsync(iter, fn)

          expect(fn).toBeCalledTimes(3)
          expect(fn).nthCalledWith(1, 1, 0)
          expect(fn).nthCalledWith(2, 2, 1)
          expect(fn).nthCalledWith(3, 3, 2)
        })

        describe('fn return true on first element', () => {
          it('fn is called once', async () => {
            const iter = getIter([1, 2, 3])
            const fn = jest.fn().mockReturnValueOnce(true)

            await findAsync(iter, fn)

            expect(fn).toBeCalledTimes(1)
          })
        })
      })

      describe.each([
        testFunction('fn return non-promise')
      , testAsyncFunction('fn return PromiseLike')
      ])('%s', (_, getFn) => {
        describe('fn return true', () => {
          it('return first element in the iterable that fn return true', async () => {
            const iter = getIter([1, 2, 3])
            const isTwo = getFn((x: number) => x === 2)

            const result = findAsync(iter, isTwo)
            const isPro = isPromise(result)
            const proResult = await result

            expect(isPro).toBe(true)
            expect(proResult).toBe(2)
          })
        })

        describe('fn return false every time', () => {
          it('throw RuntimeError', async () => {
            const iter = getIter([1, 2, 3])
            const isFour = getFn((x: number) => x === 4)

            const err = await getAsyncError<RuntimeError>(() => findAsync(iter, isFour))

            expect(err).toBeInstanceOf(RuntimeError)
          })
        })

        describe('throw error', () => {
          it('throw error', async () => {
            const customError = new Error('CustomError')
            const iter = getIter([1, 2, 3])
            const fn = getFn(() => { throw customError })

            const err = await getAsyncError(() => findAsync(iter, fn))

            expect(err).toBe(customError)
          })
        })
      })
    })
  })
})
