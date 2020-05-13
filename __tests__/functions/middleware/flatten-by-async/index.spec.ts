import { getCalledTimes, consumeAsync, toArrayAsync, MarkIterable } from '@test/utils'
import { testIterable, testAsyncIterable, testFunction, testAsyncFunction, testCall, testPipe, testBind } from '@test/test-fixtures'
import { getErrorAsync } from 'return-style'
import { flattenByAsync as call } from '@middleware/flatten-by-async'
import { flattenByAsync as pipe } from '@style/pipeline/middleware/flatten-by-async'
import { flattenByAsync as bind } from '@style/binding/middleware/flatten-by-async'
import '@test/matchers'

describe.each([
  testCall('flattenByAsync<T>(iterable: Iterable<unknown> | AsyncIterable<unknown>, fn: (element: unknown, level: number) => boolean | PromiseLike<boolean>): AsyncIterable<T>', call)
, testPipe('flattenByAsync<T>(fn: (element: unknown, level: number) => boolean | PromiseLike<boolean>): (iterable: Iterable<unknown> | AsyncIterable<unknown>) => AsyncIterable<T>', pipe)
, testBind('flattenByAsync<T>(this: Iterable<unknown> | AsyncIterable<unknown>, fn: (element: unknown, level: number) => boolean | PromiseLike<boolean>): AsyncIterable<T>', bind)
])('%s', (_, flattenByAsync) => {
  describe.each([
    testIterable('flattenByAsync<T>(iterable: Iterable<unknown>, fn: (element: unknown, level: number) => boolean | PromiseLike<boolean>): AsyncIterable<T>')
  , testAsyncIterable('flattenByAsync<T>(iterable: AsyncIterable<unknown>, fn: (element: unknown, level: number) => boolean | PromiseLike<boolean>): AsyncIterable<T>')
  ])('%s', (_, getIter) => {
    describe('fn is called', () => {
      it('called with [element,level]', async () => {
        const iter = getIter([0, [1]])
        const fn = jest.fn().mockReturnValue(true)

        const result = flattenByAsync(iter, fn)
        const calledTimesBeforeConsume = getCalledTimes(fn)
        await consumeAsync(result)
        const calledTimesAfterConsume = getCalledTimes(fn)

        expect(calledTimesBeforeConsume).toBe(0)
        expect(calledTimesAfterConsume).toBe(1)
        expect(fn).nthCalledWith(1, [1], 1)
      })
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promiselike')
    ])('%s', (_, getFn) => {
      describe('call', () => {
        it('lazy evaluation', async () => {
          const mark = new MarkIterable()
          const iter = getIter(mark)
          const fn = getFn(jest.fn())

          const result = flattenByAsync(iter, fn)
          const isEval1 = mark.isEvaluated()
          await toArrayAsync(result)
          const isEval2 = mark.isEvaluated()

          expect(isEval1).toBe(false)
          expect(isEval2).toBe(true)
        })

        it('return flat iterable', async () => {
          const iter = getIter([
            'one', ['two']
          , 0, [1]
          ])
          const exceptString = getFn((x: unknown) => !isString(x))

          const result = flattenByAsync(iter, exceptString)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([
            'one', 'two'
          , 0, 1
          ])
        })
      })

      describe('fn return false on level zero', () => {
        it('return iterable copy', async () => {
          const iter = getIter([0, [1]])
          const alwaysFalse = getFn(() => false)

          const result = flattenByAsync(iter, alwaysFalse)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(result).not.toBe(iter)
          expect(arrResult).toEqual([0, [1]])
        })
      })

      describe('iterable is empty', () => {
        it('return empty iterable', async () => {
          const iter = getIter([])
          const fn = getFn(() => true)

          const result = flattenByAsync(iter, fn)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([])
        })
      })

      describe('iterable is string', () => {
        it('return iterable<char>', async () => {
          const iter = '123'
          const fn = getFn(() => true)

          const result = flattenByAsync(iter, fn)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual(['1', '2', '3'])
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([[1]])
          const fn = getFn(() => { throw customError })

          const result = flattenByAsync(iter, fn)
          const err = await getErrorAsync(toArrayAsync(result))

          expect(result).toBeAsyncIterable()
          expect(err).toBe(customError)
        })
      })
    })
  })
})

function isString(val: unknown): val is string {
  return typeof val === 'string'
}
