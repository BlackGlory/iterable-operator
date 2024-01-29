import { getErrorPromise } from 'return-style'
import { testFunction, testAsyncFunction, testIterable, testIterablePromises, testAsyncIterable } from '@test/test-fixtures.js'
import { toArray } from '@test/utils.js'
import { groupByAsync } from '@src/group-by-async.js'
import { jest } from '@jest/globals'

describe('groupByAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testIterablePromises('IterablePromises')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('called fn with [element, index]', async () => {
      const iter = createIter([1, 2, 3])
      const fn = jest.fn()

      await groupByAsync(iter, fn)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    describe.each([
      testFunction('fn returns NonPromiseLike')
    , testAsyncFunction('fn returns PromiseLike')
    ])('%s', (_, createFn) => {
      it('called fn once for each iterable element', async () => {
        const iter = createIter([1, 2, 3])
        const fn = (x: number) => x % 2

        const result = await groupByAsync(iter, fn)
        const arrResult = toArray(result)

        expect(result).toBeInstanceOf(Map)
        expect(arrResult).toEqual([
          [1, [1, 3]]
        , [0, [2]]
        ])
      })

      describe('fn throws an error', () => {
        it('throws an error', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => { throw customError })

          const err = await getErrorPromise(groupByAsync(iter, fn))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
