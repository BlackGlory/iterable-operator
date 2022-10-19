import { testIterable, testAsyncIterable, testFunction, testAsyncFunction } from '@test/test-fixtures'
import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils'
import { chunkByAsync } from '@intermediate/chunk-by-async'
import { getErrorPromise } from 'return-style'
import '@blackglory/jest-matchers'

describe('chunkByAsync(', () => {
  describe.each([
    testIterable('Iterable')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('called fn with [element, index]', async () => {
      const iter = createIter([1, 2, 3])
      const fn = jest.fn()

      const result = chunkByAsync(iter, fn)
      const calledTimesBeforeConsume = getCalledTimes(fn)
      await consumeAsync(result)
      const calledTimesAfterConsume = getCalledTimes(fn)

      expect(calledTimesBeforeConsume).toBe(0)
      expect(calledTimesAfterConsume).toBe(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    test('lazy and partial evaluation', async () => {
      const mock = new MockIterable([1, 2, 3])
      const iter = createIter(mock)
      const fn = () => true

      const result = chunkByAsync(iter, fn)
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
      describe('fn returns true', () => {
        describe('chunk at middle', () => {
          it('returns the chunked iterable', async () => {
            const iter = createIter([1, 2, 3])
            const atTwo = createFn((x: number) => x === 2)

            const result = chunkByAsync(iter, atTwo)
            const arrResult = await toArrayAsync(result)

            expect(result).toBeAsyncIterable()
            expect(arrResult).toEqual([[1, 2], [3]])
          })
        })

        describe('chunk at last', () => {
          it('returns the chunked iterable', async () => {
            const iter = createIter([1, 2, 3])
            const atThree = createFn((x: number) => x === 3)

            const result = chunkByAsync(iter, atThree)
            const arrResult = await toArrayAsync(result)

            expect(result).toBeAsyncIterable()
            expect(arrResult).toEqual([[1, 2, 3]])
          })
        })
      })

      describe('fn alwasy returns false', () => {
        it('returns the chunked iterable', async () => {
          const iter = createIter([1, 2, 3])
          const alwaysFalse = createFn(() => false)

          const result = chunkByAsync(iter, alwaysFalse)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([[1, 2, 3]])
        })
      })

      describe('fn throws an error', () => {
        it('throws an error when consuming iterable', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => { throw customError })

          const result = chunkByAsync(iter, fn)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(result).toBeAsyncIterable()
          expect(err).toBe(customError)
        })
      })
    })
  })
})
