import { getErrorPromise } from 'return-style'
import { testFunction, testAsyncFunction, testIterable, testAsyncIterable } from '@test/test-fixtures'
import { someAsync } from '@src/some-async'

describe('someAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('called fn with [element, index]', async () => {
      const iter = createIter([1, 2, 3])
      const fn = jest.fn().mockReturnValue(false)

      await someAsync(iter, fn)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    describe('fn returns true on first element', () => {
      it('called fn only once', async () => {
        const iter = createIter([1, 2, 3])
        const fn = jest.fn().mockReturnValueOnce(true)

        await someAsync(iter, fn)

        expect(fn).toBeCalledTimes(1)
      })
    })

    describe.each([
      testFunction('fn returns NonPromiseLike')
    , testAsyncFunction('fn returns PromiseLike')
    ])('%s', (_, createFn) => {
      describe('fn returns true', () => {
        it('returns true', async () => {
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => true)

          const result = await someAsync(iter, fn)

          expect(result).toBe(true)
        })
      })

      describe('fn returns false every time', () => {
        it('returns false', async () => {
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => false)

          const result = await someAsync(iter, fn)

          expect(result).toBe(false)
        })
      })

      describe('fn throws an error', () => {
        it('throws an error', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => { throw customError })

          const err = await getErrorPromise(someAsync(iter, fn))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
