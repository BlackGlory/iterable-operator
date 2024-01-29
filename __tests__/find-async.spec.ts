import { getErrorPromise } from 'return-style'
import { testFunction, testAsyncFunction, testIterable, testIterablePromises, testAsyncIterable }
  from '@test/test-fixtures.js'
import { findAsync } from '@src/find-async.js'
import { jest } from '@jest/globals'

describe('findAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testIterablePromises('IterablePromises')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    it('called fn with [element, index]', async () => {
      const iter = createIter([1, 2, 3])
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

    describe('fn returns true on first element', () => {
      it('called fn only once', async () => {
        const iter = createIter([1, 2, 3])
        const fn = jest.fn().mockReturnValueOnce(true)

        await findAsync(iter, fn)

        expect(fn).toBeCalledTimes(1)
      })
    })

    describe.each([
      testFunction('fn returns NonPromiseLike')
    , testAsyncFunction('fn returns PromiseLike')
    ])('%s', (_, createFn) => {
      describe('fn returns true', () => {
        it('returns first element in the iterable that fn returns true', async () => {
          const iter = createIter([1, 2, 3])
          const isTwo = createFn((x: number) => x === 2)

          const result = await findAsync(iter, isTwo)

          expect(result).toBe(2)
        })
      })

      describe('fn returns false every time', () => {
        it('returns undefined', async () => {
          const iter = createIter([1, 2, 3])
          const isFour = createFn((x: number) => x === 4)

          const result = await findAsync(iter, isFour)

          expect(result).toBeUndefined()
        })
      })

      describe('fn throws an error', () => {
        it('throws an error', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => { throw customError })

          const err = await getErrorPromise(findAsync(iter, fn))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
