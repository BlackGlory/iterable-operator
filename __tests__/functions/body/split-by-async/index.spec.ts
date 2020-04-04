import { getCalledTimes, consumeAsync, isAsyncIterable, toArrayAsync } from '@test/utils'
import { testIterable, testAsyncIterable, testAsyncFunction, testFunction, testCall, testPipe, testBind } from '@test/test-fixtures'
import { getAsyncError } from '@test/return-style'
import { splitByAsync as call } from '@body/split-by-async'
import { splitByAsync as pipe } from '@style/pipeline/body/split-by-async'
import { splitByAsync as bind } from '@style/binding/body/split-by-async'

describe('splitByAsync', () => {
  describe.each([
    testCall('(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> AsyncIterable<T[]>', call)
  , testPipe('(fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> AsyncIterable<T[]>', pipe)
  , testBind('(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> AsyncIterable<T[]>', bind)
  ])('%s', (_, splitByAsync) => {
    describe('(iterable: Iterable<PromiseLike<T>>, fn: (element: PromiseLike<T>, index: number) -> boolean | PromiseLike<boolean>) -> AsyncIterable<T[]>', () => {
      it('called with [element(promise),index]', async () => {
        const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
        const fn = jest.fn()

        const result = splitByAsync(iter, fn)
        await consumeAsync(result)

        expect(fn).toBeCalledTimes(3)
        expect(fn).nthCalledWith(1, iter[0], 0)
        expect(fn).nthCalledWith(2, iter[1], 1)
        expect(fn).nthCalledWith(3, iter[2], 2)
      })
    })

    describe.each([
      testIterable('(iterable: Iterable<T>, fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> AsyncIterable<T[]>')
    , testAsyncIterable('(iterable: AsyncIterable<T>, fn: (element: T, index: number) -> boolean | PromiseLike<boolean>) -> AsyncIterable<T[]>')
    ])('%s', (_, getIter) => {
      describe.each([
        testFunction('fn return non-promise')
      , testAsyncFunction('fn return promise')
      ])('%s', (_, getFn) => {
        describe('fn is called', () => {
          it('called with [element,index]', async () => {
            const iter = getIter([1, 2, 3])
            const fn = jest.fn()

            const result = splitByAsync(iter, fn)
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

        describe('call', () => {
          it('return splited iterable', async () => {
            const iter = getIter([1, 2, 3, 4, 5])
            const atThree = getFn((x: number) =>  x === 3)

            const result = splitByAsync(iter, atThree)
            const isIter = isAsyncIterable(result)
            const arrResult = await toArrayAsync(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([[1, 2], [4, 5]])
          })
        })

        describe('fn throw error', () => {
          it('throw error when consume', async () => {
            const customError = new Error('CustomError')
            const iter = getIter([1, 2, 3, 4, 5])
            const fn = () => { throw customError }

            const result = splitByAsync(iter, fn)
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