import { getErrorPromise } from 'return-style'
import { testFunction, testAsyncFunction, testIterable, testAsyncIterable } from '@test/test-fixtures'
import { everyAsync } from '@output/every-async'
import '@blackglory/jest-matchers'

describe(`
  everyAsync<T>(
    iterable: Iterable<T> | AsyncIterable<T>
  , predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): Promise<boolean>
`, () => {
  describe('T is PromiseLike<T>', () => {
    describe('fn is called', () => {
      it('called with [element(promise),index]', async () => {
        const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
        const fn = jest.fn().mockReturnValue(true)

        await everyAsync(iter, fn)

        expect(fn).toBeCalledTimes(3)
        expect(fn).nthCalledWith(1, iter[0], 0)
        expect(fn).nthCalledWith(2, iter[1], 1)
        expect(fn).nthCalledWith(3, iter[2], 2)
      })
    })
  })

  describe.each([
    testIterable('Iterable<T>')
  , testAsyncIterable('AsyncIterable<T>')
  ])('%s', (_, getIter) => {
    describe('fn is called', () => {
      it('called with [element,index]', async () => {
        const iter = getIter([1, 2, 3])
        const fn = jest.fn().mockReturnValue(true)

        await everyAsync(iter, fn)

        expect(fn).toBeCalledTimes(3)
        expect(fn).nthCalledWith(1, 1, 0)
        expect(fn).nthCalledWith(2, 2, 1)
        expect(fn).nthCalledWith(3, 3, 2)
      })

      describe('fn return false on first element', () => {
        it('fn is called once', async () => {
          const iter = getIter([1, 2, 3])
          const fn = jest.fn().mockReturnValueOnce(false)

          await everyAsync(iter, fn)

          expect(fn).toBeCalledTimes(1)
        })
      })
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promiselike')
    ])('%s', (_, getFn) => {
      describe('fn return true every time', () => {
        it('return true', async () => {
          const iter = getIter([1, 2, 3])
          const isNumber = getFn(() => true)

          const result = everyAsync(iter, isNumber)
          const proResult = await result

          expect(result).toBePromise()
          expect(proResult).toBe(true)
        })
      })

      describe('fn return true not every time', () => {
        it('return false', async () => {
          const iter = getIter([1, 2, 3])
          const fn = getFn(() => false)

          const result = everyAsync(iter, fn)
          const proResult = await result

          expect(result).toBePromise()
          expect(proResult).toBe(false)
        })
      })

      describe('fn throw error', () => {
        it('throw error', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3])
          const fn = getFn(() => { throw customError })

          const err = await getErrorPromise(everyAsync(iter, fn))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
