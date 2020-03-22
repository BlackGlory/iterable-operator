import { getAsyncError } from '@test/return-style'
import { testIterable, testAsyncIterable, testFunction, testAsyncFunction, testCall, testPipe, testBind } from '@test/test-fixtures'
import { getCalledTimes, consumeAsync, isAsyncIterable, toArrayAsync } from '@test/utils'
import { mapAsync as call } from '@body/map-async'
import { mapAsync as pipe } from '@style/pipeline/body/map-async'
import { mapAsync as bind } from '@style/binding/body/map-async'

describe('mapAsync', () => {
  describe.each([
    testCall('(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) -> U | PromiseLike<U>) -> AsyncIterable<U>', call)
  , testPipe('(fn: (element: T, index: number) -> U | PromiseLike<U>) -> (itreable: Iterable<T> | AsyncIterable<T>) -> AsyncIterable<U>', pipe)
  , testBind('(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) -> U | PromiseLike<U>) -> AsyncIterable<U>', bind)
  ])('%s', (_, mapAsync) => {
    describe('(iterable: Iterable<PromiseLike<T>>, fn: (element: PromiseLike<T>, index: number) -> U | PromiseLike<U>) -> AsyncIterable<U>', () => {
      it('called with [element(promise),index]', async () => {
        const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
        const fn = jest.fn()

        const result = mapAsync(iter, fn)
        await consumeAsync(result)

        expect(fn).toBeCalledTimes(3)
        expect(fn).nthCalledWith(1, iter[0], 0)
        expect(fn).nthCalledWith(2, iter[1], 1)
        expect(fn).nthCalledWith(3, iter[2], 2)
      })
    })

    describe.each([
      testIterable('(iterable: Iterable<T>, fn: (element: T, index: number) -> U | PromiseLike<U>) -> AsyncIterable<U>')
    , testAsyncIterable('(iterable: AsyncIterable<T>, fn: (element: T, index: number) -> U | PromiseLike<U>) -> AsyncIterable<U>')
    ])('%s', (_, getIter) => {
      describe('fn called', () => {
        it('called with element, index', async () => {
          const iter = getIter([1, 2, 3])
          const fn = jest.fn()

          const result = mapAsync(iter, fn)
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
          it('return mapped iterable', async () => {
            const iter = getIter([1, 2, 3])
            const double = getFn((x: number) => x * 2)

            const result = mapAsync(iter, double)
            const isIter = isAsyncIterable(result)
            const arrResult = await toArrayAsync(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([2, 4, 6])
          })
        })

        describe('fn throw error', () => {
          it('throw error when consume', async () => {
            const customError = new Error('CustomError')
            const iter = getIter([1, 2, 3])
            const fn = getFn(() => { throw customError })

            const result = mapAsync(iter, fn)
            const isIter = isAsyncIterable(result)
            const err = await getAsyncError(() => toArrayAsync(result))

            expect(isIter).toBe(true)
            expect(err).toBe(customError)
          })
        })
      })
    })
  })
})
