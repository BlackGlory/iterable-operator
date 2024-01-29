import { getErrorPromise } from 'return-style'
import { testFunction, testAsyncFunction, testIterable, testIterablePromises, testAsyncIterable } from '@test/test-fixtures.js'
import { everyAsync } from '@src/every-async.js'
import { jest } from '@jest/globals'

describe('everyAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testIterablePromises('IterablePromises')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('called fn with [element, index]', async () => {
      const iter = createIter([1, 2, 3])
      const fn = jest.fn().mockReturnValue(true)

      await everyAsync(iter, fn)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    describe('fn returns false on first element', () => {
      it('fn is called once', async () => {
        const iter = createIter([1, 2, 3])
        const fn = jest.fn().mockReturnValueOnce(false)

        await everyAsync(iter, fn)

        expect(fn).toBeCalledTimes(1)
      })
    })

    describe.each([
      testFunction('fn returns NonPromiseLike')
    , testAsyncFunction('fn returns PromiseLike')
    ])('%s', (_, createFn) => {
      describe('fn returns true every time', () => {
        it('returns true', async () => {
          const iter = createIter([1, 2, 3])
          const isNumber = createFn(() => true)

          const result = await everyAsync(iter, isNumber)

          expect(result).toBe(true)
        })
      })

      describe('fn returns true not every time', () => {
        it('returns false', async () => {
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => false)

          const result = await everyAsync(iter, fn)

          expect(result).toBe(false)
        })
      })

      describe('fn throws an error', () => {
        it('throws an error', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => { throw customError })

          const err = await getErrorPromise(everyAsync(iter, fn))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
