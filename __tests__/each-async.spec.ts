import { describe, expect, it, test, vi } from 'vitest'
import { getErrorPromise } from 'return-style'
import { testFunction, testAsyncFunction, testIterable, testIterablePromises, testAsyncIterable } from '@test/test-fixtures.js'
import { eachAsync } from '@src/each-async.js'

describe('eachAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testIterablePromises('IterablePromises')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('called fn with [element, index]', async () => {
      const iter = createIter([1, 2, 3])
      const fn = vi.fn()

      await eachAsync(iter, fn)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    describe.each([
      testFunction('fn returns NonPromiseLike')
    , testAsyncFunction('fn returns PromiseLike')
    ])('%s', (_, createFn) => {
      it('calls fn once for each iterable element', async () => {
        const iter = createIter([1, 2, 3])
        const sideResult: Array<[number, number]> = []
        const pushToSideResult = createFn((x: number, i: number) => sideResult.push([x, i]))

        const result = await eachAsync(iter, pushToSideResult)

        expect(result).toBeUndefined()
        expect(sideResult).toEqual([[1, 0], [2, 1], [3, 2]])
      })

      describe('fn throws an error', () => {
        it('throws an error', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => { throw customError })

          const err = await getErrorPromise(eachAsync(iter, fn))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
