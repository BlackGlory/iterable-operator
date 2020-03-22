import { testCall, testBind, testPipe, testIterable, testAsyncIterable, testFunction, testAsyncFunction } from '@test/test-fixtures'
import { getCalledTimes, consumeAsync, isAsyncIterable, toArrayAsync } from '@test/utils'
import { chunkByAsync as call } from '@body/chunk-by-async'
import { chunkByAsync as pipe } from '@style/pipeline/body/chunk-by-async'
import { chunkByAsync as bind } from '@style/binding/body/chunk-by-async'
import { getAsyncError } from '@test/return-style'

describe('chunkByAsync', () => {
  describe.each([
    testCall('(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) -> boolean | Promise<boolean) -> AsyncIterable<T>', call)
  , testBind('(fn: (element: T, index: number) -> boolean | Promise<boolean>) -> (iterable: Iterable<T> | AsyncIterable<T>) -> AsyncIterable<T>', bind)
  , testPipe('(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) -> boolean | Promise<boolean) -> AsyncIterable<T>', pipe)
  ])('%s', (_, chunkByAsync) => {
    describe('(iterable: Iterable<PromiseLike<T>>, fn: (element: PromiseLike<T>, index: number) -> boolean | PromiseLike<boolean>) -> AsyncIterable<T>', () => {
      it('called with [element(promise),index]', async () => {
        const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
        const fn = jest.fn()

        const result = chunkByAsync(iter, fn)
        await consumeAsync(result)

        expect(fn).toBeCalledTimes(3)
        expect(fn).nthCalledWith(1, iter[0], 0)
        expect(fn).nthCalledWith(2, iter[1], 1)
        expect(fn).nthCalledWith(3, iter[2], 2)
      })
    })

    describe.each([
      testIterable('(iterable: Iterable<T>, fn: (element: T, index: number) -> boolean | Promise<boolean>) -> AsyncIterable<T>')
    , testAsyncIterable('(iterable: AsyncIterable<T>, fn: (element: T, index: number) -> boolean | Promise<boolean>) -> AsyncIterable<T>')
    ])('%s', (_, getIter) => {
      describe('fn is called', () => {
        it('called with [element,index]', async () => {
          const iter = getIter([1, 2, 3])
          const fn = jest.fn()

          const result = chunkByAsync(iter, fn)
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
      , testAsyncFunction('fn return promiselike')
      ])('%s', (_, getFn) => {
        describe('call', () => {
          it('return chunked iterable', async () => {
            const iter = getIter([1, 2, 3])
            const atTwo = getFn((x: number) =>  x === 2)

            const result = chunkByAsync(iter, atTwo)
            const isIter = isAsyncIterable(result)
            const arrResult = await toArrayAsync(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([[1, 2], [3]])
          })
        })

        describe('fn throw error', () => {
          it('throw error when consume', async () => {
            const customError = new Error('CustomError')
            const iter = getIter([1, 2, 3])
            const fn = getFn(() => { throw customError })

            const result = chunkByAsync(iter, fn)
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
