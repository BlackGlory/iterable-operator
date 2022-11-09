import { toArrayAsync, consumeAsync, getCalledTimes, MockIterable, takeAsync } from '@test/utils'
import { getErrorPromise } from 'return-style'
import { testFunction, testAsyncFunction, testIterable, testAsyncIterable } from '@test/test-fixtures'
import { tapAsync } from '@src/tap-async'
import '@blackglory/jest-matchers'

describe('tapAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('called fn with [element, index]', async () => {
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

    describe.each([
      testFunction('fn returns NonPromiseLike')
    , testAsyncFunction('fn returns PromiseLike')
    ])('%s', (_, createFn) => {
      test('lazy and partial evaluation', async () => {
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

      test('returns the iterable', async () => {
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

      describe('fn throws an error', () => {
        it('throws an error when consuming iterable', async () => {
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
