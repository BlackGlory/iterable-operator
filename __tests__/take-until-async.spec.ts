import { describe, it, expect, vi } from 'vitest'
import { testIterable, testIterablePromises, testAsyncIterable, testAsyncFunction, testFunction } from '@test/test-fixtures.js'
import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils.js'
import { getErrorPromise } from 'return-style'
import { takeUntilAsync } from '@src/take-until-async.js'

describe('takeUntilAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testIterablePromises('IterablePromises')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    it('called fn with [element, index]', async () => {
      const iter = createIter([1, 2, 3])
      const fn = vi.fn().mockReturnValue(false)

      const result = takeUntilAsync(iter, fn)
      const calledTimesBeforeConsume = getCalledTimes(fn)
      await consumeAsync(result)
      const calledTimesAfterConsume = getCalledTimes(fn)

      expect(calledTimesBeforeConsume).toBe(0)
      expect(calledTimesAfterConsume).toBe(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    describe('returns true on first element', () => {
      it('called fn only once', async () => {
        const iter = createIter([1, 2, 3])
        const fn = vi.fn().mockReturnValueOnce(true)

        const result = takeUntilAsync(iter, fn)
        const calledTimesBeforeConsume = getCalledTimes(fn)
        await consumeAsync(result)
        const calledTimesAfterConsume = getCalledTimes(fn)

        expect(calledTimesBeforeConsume).toBe(0)
        expect(calledTimesAfterConsume).toBe(1)
      })
    })

    it('lazy and partial evaluation', async () => {
      const mock = new MockIterable([1, 2, 3])
      const iter = createIter(mock)
      const fn = () => false

      const result = takeUntilAsync(iter, fn)
      const isLazy = mock.nextIndex === 0
      await consumeAsync(takeAsync(result, 1))
      const isPartial = mock.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })

    describe.each([
      testFunction('fn returns NonPromiseLike')
    , testAsyncFunction('fn returns PromiseLike')
    ])('%s', (_, createFn) => {
      describe('call', () => {
        it('returns itreable take elements until fn returns true', async () => {
          const iter = createIter([1, 2, 3])
          const atTwo = createFn((x: number) => x === 2)

          const result = takeUntilAsync(iter, atTwo)
          const arrResult = await toArrayAsync(result)

          expect(arrResult).toEqual([1])
        })
      })

      describe('fn throws an error', () => {
        it('throws an error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => { throw customError })

          const result = takeUntilAsync(iter, fn)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
