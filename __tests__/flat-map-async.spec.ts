import { getErrorPromise } from 'return-style'
import { testIterable, testAsyncIterable } from '@test/test-fixtures'
import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils'
import { flatMapAsync } from '@src/flat-map-async'

describe('mapAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('called fn with element, index', async () => {
      const iter = createIter([1, 2, 3])
      const fn = jest.fn(x => [x])

      const result = flatMapAsync(iter, fn)
      const calledTimesBeforeConsume = getCalledTimes(fn)
      await consumeAsync(result)
      const calledTimesAfterConsume = getCalledTimes(fn)

      expect(calledTimesBeforeConsume).toBe(0)
      expect(calledTimesAfterConsume).toBe(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    describe('call', () => {
      it('lazy and partial evaluation', async () => {
        const mock = new MockIterable([1, 2, 3])
        const iter = createIter(mock)
        const fn = jest.fn((x: number) => createIter([x]))

        const result = flatMapAsync(iter, fn)
        const isLazy = mock.nextIndex === 0
        await consumeAsync(takeAsync(result, 1))
        const isPartial = mock.nextIndex === 1

        expect(isLazy).toBe(true)
        expect(isPartial).toBe(true)
      })

      it('returns the flatten mapped iterable', async () => {
        const iter = createIter([1, 2, 3])
        const double = jest.fn((x: number) => createIter([x, x * 2]))

        const result = flatMapAsync(iter, double)
        const arrResult = await toArrayAsync(result)

        expect(arrResult).toEqual([1, 2, 2, 4, 3, 6])
      })
    })

    describe('fn throws an error', () => {
      it('throws an error when consuming iterable', async () => {
        const customError = new Error('CustomError')
        const iter = createIter([1, 2, 3])
        const fn = () => { throw customError }

        const result = flatMapAsync(iter, fn)
        const err = await getErrorPromise(toArrayAsync(result))

        expect(err).toBe(customError)
      })
    })
  })
})
