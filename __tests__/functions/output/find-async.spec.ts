import { getErrorPromise } from 'return-style'
import { testFunction, testAsyncFunction, testIterable, testAsyncIterable }
  from '@test/test-fixtures'
import { findAsync } from '@output/find-async'
import '@blackglory/jest-matchers'

describe(`
  findAsync<T>(
    iterable: Iterable<T> | AsyncIterable<T>
  , predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): Promise<T | undefined>
`, () => {
  describe('T is PromiseLike<T>', () => {
    it('called with [element(promise),index]', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn()
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)

      await findAsync(iter, fn)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, iter[0], 0)
      expect(fn).nthCalledWith(2, iter[1], 1)
      expect(fn).nthCalledWith(3, iter[2], 2)
    })
  })

  describe.each([
    testIterable('Iterable<T>')
  , testAsyncIterable('AsyncIterable<T>')
  ])('%s', (_, createIter) => {
    describe('fn is called', () => {
      it('called with [element,index]', async () => {
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

      describe('fn return true on first element', () => {
        it('fn is called once', async () => {
          const iter = createIter([1, 2, 3])
          const fn = jest.fn().mockReturnValueOnce(true)

          await findAsync(iter, fn)

          expect(fn).toBeCalledTimes(1)
        })
      })
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return PromiseLike')
    ])('%s', (_, createFn) => {
      describe('fn return true', () => {
        it('return first element in the iterable that fn return true', async () => {
          const iter = createIter([1, 2, 3])
          const isTwo = createFn((x: number) => x === 2)

          const result = findAsync(iter, isTwo)
          const proResult = await result

          expect(result).toBePromise()
          expect(proResult).toBe(2)
        })
      })

      describe('fn return false every time', () => {
        it('return undefined', async () => {
          const iter = createIter([1, 2, 3])
          const isFour = createFn((x: number) => x === 4)

          const result = await findAsync(iter, isFour)

          expect(result).toBeUndefined()
        })
      })

      describe('throw error', () => {
        it('throw error', async () => {
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
