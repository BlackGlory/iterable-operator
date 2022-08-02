import { toArrayAsync, consumeAsync, getCalledTimes, MockIterable, takeAsync } from '@test/utils'
import { getErrorPromise } from 'return-style'
import { testFunction, testAsyncFunction, testIterable, testAsyncIterable } from '@test/test-fixtures'
import { tapAsync } from '@middleware/tap-async'
import '@blackglory/jest-matchers'

describe(`
  tapAsync<T>(
    iterable: Iterable<T> | AsyncIterable<T>
  , fn: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): AsyncIterable<T>
`, () => {
  describe('T is PromiseLike<T>', () => {
    it('called with [element(promise),index]', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn()

      const result = tapAsync(iter, fn)
      await consumeAsync(result)

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

        const result = tapAsync(iter, fn)
        const calledTimesBeforeConsume = getCalledTimes(fn)
        await consumeAsync(result)
        const calledTimesAfterConsume = getCalledTimes(fn)

        expect(calledTimesBeforeConsume).toBe(0)
        expect(calledTimesAfterConsume).toBe(3)
        expect(fn).nthCalledWith(1, 1, 0)
        expect(fn).nthCalledWith(2, 2, 1)
        expect(fn).nthCalledWith(3, 3, 2)
      })
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promise')
    ])('%s', (_, createFn) => {
      describe('call', () => {
        it('lazy and partial evaluation', async () => {
          const mock = new MockIterable([1, 2, 3])
          const iter = createIter(mock)
          const fn = createFn(jest.fn())

          const result = tapAsync(iter, fn)
          const isLazy = mock.nextIndex === 0
          await consumeAsync(takeAsync(result, 1))
          const isPartial = mock.nextIndex === 1

          expect(isLazy).toBe(true)
          expect(isPartial).toBe(true)
        })

        it('call fn and return iterable', async () => {
          const iter = createIter([1, 2, 3])
          const sideResult: Array<[number, number]> = []
          const pushToSideResult = createFn((x: number, i: number) => sideResult.push([x, i]))

          const result = tapAsync(iter, pushToSideResult)
          const isSideResultEmptyInStage1 = !sideResult.length
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(isSideResultEmptyInStage1).toBe(true)
          expect(arrResult).toEqual([1, 2, 3])
          expect(sideResult).toEqual([[1, 0], [2, 1], [3, 2]])
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3])
          const justThrow = () => { throw customError }

          const result = tapAsync(iter, justThrow)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(result).toBeAsyncIterable()
          expect(err).toBe(customError)
        })
      })
    })
  })
})
