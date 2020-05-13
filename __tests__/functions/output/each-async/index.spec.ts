import { getErrorAsync } from 'return-style'
import { testFunction, testAsyncFunction, testIterable, testAsyncIterable, testCall, testPipe, testBind } from '@test/test-fixtures'
import { eachAsync as call } from '@output/each-async'
import { eachAsync as pipe } from '@style/pipeline/output/each-async'
import { eachAsync as bind } from '@style/binding/output/each-async'
import '@test/matchers'

describe.each([
  testCall('eachAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<void>', call)
, testPipe('eachAsync<T>(fn: (element: T, index: number) => unknown | PromiseLike<unknown>): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<void>', pipe)
, testBind('eachAsync<T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<void>', bind)
])('%s', (_, eachAsync) => {
  describe(('eachAsync<T>(iterable: Iterable<PromiseLike<T>>, fn: (element: PromiseLike<T>, index: number => unknown | PromiseLike<unknown>): Promise<void>'), () => {
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
    testIterable('eachAsync<T>(iterable: Iterable<T>, fn: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<void>')
  , testAsyncIterable('eachAsync<T>(iterable: AsyncIterable<T>, fn: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<void>')
  ])('%s', (_, getIter) => {
    describe('fn is called', () => {
      it('called with [element,index]', async () => {
        const iter = getIter([1, 2, 3])
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
    ])('%s', (_, getFn) => {
      describe('call', () => {
        it('execute fn once for each iterable element', async () => {
          const iter = getIter([1, 2, 3])
          const sideResult: Array<[number, number]> = []
          const pushToSideResult = getFn((x: number, i: number) => sideResult.push([x, i]))

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
          const iter = getIter([1, 2, 3])
          const fn = getFn(() => { throw customError })

          const err = await getErrorAsync(eachAsync(iter, fn))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
