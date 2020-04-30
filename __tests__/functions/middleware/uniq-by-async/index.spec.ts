import { testIterable, testAsyncIterable, testFunction, testAsyncFunction, testCall, testPipe, testBind } from '@test/test-fixtures'
import { getCalledTimes, consumeAsync, isAsyncIterable, toArrayAsync, MarkIterable } from '@test/utils'
import { getErrorAsync } from 'return-style'
import { uniqByAsync as call } from '@middleware/uniq-by-async'
import { uniqByAsync as pipe } from '@style/pipeline/middleware/uniq-by-async'
import { uniqByAsync as bind } from '@style/binding/middleware/uniq-by-async'

describe.each([
  testCall('uniqByAsync<T, U>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => U | PromiseLike<U>): AsyncIterable<T>', call)
, testPipe('uniqByAsync<T, U>(fn: (element: T, index: number): (iterable: Iterable<T> | AsyncIterable<T.) => AsyncIterable<T>', pipe)
, testBind('uniqByAsync<T, U>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => U | PromiseLike<U>): AsyncIterable<T>', bind)
])('%s', (_, uniqByAsync) => {
  describe('uniqByAsync(iterable: Iterable<PromiseLike<T>>, fn: (element: PromiseLike<T>, index: number) => U | PromiseLike<U>): AsyncIterable<T>', () => {
    it('called with [element(promise),index]', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn()

      const result = uniqByAsync(iter, fn)
      await consumeAsync(result)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, iter[0], 0)
      expect(fn).nthCalledWith(2, iter[1], 1)
      expect(fn).nthCalledWith(3, iter[2], 2)
    })
  })

  describe.each([
    testIterable('uniqByAsync<T, U>(iterable: Iterable<T>, fn: (element: T, index: number) => U | PromiseLike<U>): AsyncIterable<T>')
  , testAsyncIterable('uniqByAsync<T, U>(iterable: AsyncIterable<T>, fn: (element: T, index: number) => U | PromiseLike<U>): AsyncIterable<T>')
  ])('%s', (_, getIter) => {
    describe('fn is called', () => {
      it('called with [element,index]', async () => {
        const iter = getIter([1, 2, 3])
        const fn = jest.fn()

        const result = uniqByAsync(iter, fn)
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
        it('return iterable unique by fn', async () => {
          const iter = getIter([1, 2, 3])
          const modTwo = getFn((x: number) => x % 2)

          const result = uniqByAsync(iter, modTwo)
          const isIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([1, 2])
        })

        it('lazy evaluation', async () => {
          const mark = new MarkIterable()
          const iter = getIter(mark)
          const fn = getFn(jest.fn())

          const result = uniqByAsync(iter, fn)
          const isEval1 = mark.isEvaluated()
          await toArrayAsync(result)
          const isEval2 = mark.isEvaluated()

          expect(isEval1).toBe(false)
          expect(isEval2).toBe(true)
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3])
          const fn = getFn(() => { throw customError })

          const result = uniqByAsync(iter, fn)
          const isIter = isAsyncIterable(result)
          const err = await getErrorAsync(toArrayAsync(result))

          expect(isIter).toBe(true)
          expect(err).toBe(customError)
        })
      })
    })
  })
})
