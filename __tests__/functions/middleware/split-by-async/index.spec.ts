import { getCalledTimes, consumeAsync, isAsyncIterable, toArrayAsync, MarkIterable } from '@test/utils'
import { testIterable, testAsyncIterable, testAsyncFunction, testFunction, testCall, testPipe, testBind } from '@test/test-fixtures'
import { getErrorAsync } from 'return-style'
import { splitByAsync as call } from '@middleware/split-by-async'
import { splitByAsync as pipe } from '@style/pipeline/middleware/split-by-async'
import { splitByAsync as bind } from '@style/binding/middleware/split-by-async'

describe.each([
  testCall('splitByAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterable<T[]>', call)
, testPipe('splitByAsync<T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T[]>', pipe)
, testBind('splitByAsync<T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterable<T[]>', bind)
])('%s', (_, splitByAsync) => {
  describe('splitByAsync<PromiseLike<T>>(iterable: Iterable<PromiseLike<T>>, fn: (element: PromiseLike<T>, index: number) => boolean | PromiseLike<boolean>): AsyncIterable<Array<PromiseLike<T>>>', () => {
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

    it('return AsyncIterable<Array<PromiseLike<T>>>', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn().mockReturnValue(false)

      const result = splitByAsync(iter, fn)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toEqual([iter])
    })
  })

  describe.each([
    testIterable('splitByAsync<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterable<T[]>')
  , testAsyncIterable('splitByAsync<T>(iterable: AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterable<T[]>')
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

      describe('fn return true', () => {
        describe('separator is first', () => {
          it('return splited iterable', async () => {
            const iter = getIter([1, 2, 3, 4, 5])
            const atThree = getFn((x: number) =>  x === 1)

            const result = splitByAsync(iter, atThree)
            const isIter = isAsyncIterable(result)
            const arrResult = await toArrayAsync(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([[], [2, 3, 4, 5]])
          })
        })

        describe('separator is middle', () => {
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

        describe('separator is last', () => {
          it('return splited iterable', async () => {
            const iter = getIter([1, 2, 3, 4, 5])
            const atThree = getFn((x: number) =>  x === 5)

            const result = splitByAsync(iter, atThree)
            const isIter = isAsyncIterable(result)
            const arrResult = await toArrayAsync(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([[1, 2, 3, 4], []])
          })
        })
      })

      describe('fn always return false', () => {
        it('return splited iterable', async () => {
          const iter = getIter([1, 2, 3, 4, 5])
          const alwaysFalse = getFn(() => false)

          const result = splitByAsync(iter, alwaysFalse)
          const isIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
        })
      })

      it('lazy evaluation', async () => {
        const mark = new MarkIterable()
        const iter = getIter(mark)
        const fn = getFn(jest.fn())

        const result = splitByAsync(iter, fn)
        const isEval1 = mark.isEvaluated()
        await toArrayAsync(result)
        const isEval2 = mark.isEvaluated()

        expect(isEval1).toBe(false)
        expect(isEval2).toBe(true)
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3, 4, 5])
          const fn = () => { throw customError }

          const result = splitByAsync(iter, fn)
          const isIter = isAsyncIterable(result)
          const err = await getErrorAsync(toArrayAsync(result))

          expect(isIter).toBe(true)
          expect(err).toBe(customError)
        })
      })
    })
  })
})
