import { getErrorPromise } from 'return-style'
import { testFunction, testAsyncFunction, testIterable, testAsyncIterable } from '@test/test-fixtures'
import { eachAsync } from '@terminal/each-async'
import '@blackglory/jest-matchers'

describe(`
  eachAsync<T>(
    iterable: Iterable<T> | AsyncIterable<T>
  , fn: (element: T, index: number) => Awaitable<unknown>
  ): Promise<void>
`, () => {
  describe(('T is PromiseLike<T>'), () => {
    describe('fn is called', () => {
      it('called with [element(promise),index]', async () => {
        const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
        const fn = jest.fn()

        await eachAsync(iter, fn)

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

        await eachAsync(iter, fn)

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
          const sideResult: Array<[number, number]> = []
          const pushToSideResult = createFn((x: number, i: number) => sideResult.push([x, i]))

          const result = eachAsync(iter, pushToSideResult)
          const proResult = await result

          expect(result).toBePromise()
          expect(proResult).toBeUndefined()
          expect(sideResult).toEqual([[1, 0], [2, 1], [3, 2]])
        })
      })

      describe('fn throw error', () => {
        it('throw error', async () => {
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
