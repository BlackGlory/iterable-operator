import { getErrorPromise } from 'return-style'
import { testFunction, testAsyncFunction, testIterable, testAsyncIterable } from '@test/test-fixtures'
import { toArray } from '@test/utils'
import { groupByAsync } from '@output/group-by-async'
import '@blackglory/jest-matchers'

describe(`
  groupByAsync<T, U>(
    iterable: Iterable<T> | AsyncIterable<T>
  , fn: (element: T, index: number) => Awaitable<U>
  ): Map<U, T[]>
`, () => {
  describe(('T is PromiseLike<T>'), () => {
    describe('fn is called', () => {
      it('called with [element(promise),index]', async () => {
        const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
        const fn = jest.fn()

        await groupByAsync(iter, fn)

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
  ])('%s', (_, createIter) => {
    describe('fn is called', () => {
      it('called with [element,index]', async () => {
        const iter = createIter([1, 2, 3])
        const fn = jest.fn()

        await groupByAsync(iter, fn)

        expect(fn).toBeCalledTimes(3)
        expect(fn).nthCalledWith(1, 1, 0)
        expect(fn).nthCalledWith(2, 2, 1)
        expect(fn).nthCalledWith(3, 3, 2)
      })
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promiselike')
    ])('%s', (_, createFn) => {
      describe('call', () => {
        it('execute fn once for each iterable element', async () => {
          const iter = createIter([1, 2, 3])
          const fn = (x: number) => x % 2

          const result = groupByAsync(iter, fn)
          const proResult = await result

          expect(result).toBePromise()
          expect(proResult).toBeInstanceOf(Map)
          expect(toArray(proResult)).toEqual([
            [1, [1, 3]]
          , [0, [2]]
          ])
        })
      })

      describe('fn throw error', () => {
        it('throw error', async () => {
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
