import { describe, it, expect, test, vi } from 'vitest'
import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils.js'
import { testIterable, testIterablePromises, testAsyncIterable, testAsyncFunction, testFunction } from '@test/test-fixtures.js'
import { getErrorPromise } from 'return-style'
import { splitByAsync } from '@src/split-by-async.js'

describe('splitByAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testIterablePromises('IterablePromises')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    describe.each([
      testFunction('predicate returns NonPromiseLike')
    , testAsyncFunction('predicate returns PromiseLike')
    ])('%s', (_, createPredicate) => {
      test('called predicate with [element, index]', async () => {
        const iter = createIter([1, 2, 3])
        const predicate = vi.fn()

        const result = splitByAsync(iter, predicate)
        const calledTimesBeforeConsume = getCalledTimes(predicate)
        await consumeAsync(result)
        const calledTimesAfterConsume = getCalledTimes(predicate)

        expect(calledTimesBeforeConsume).toBe(0)
        expect(calledTimesAfterConsume).toBe(3)
        expect(predicate).nthCalledWith(1, 1, 0)
        expect(predicate).nthCalledWith(2, 2, 1)
        expect(predicate).nthCalledWith(3, 3, 2)
      })

      describe('predicate returns true', () => {
        describe('separator is first', () => {
          it('returns the splited iterable', async () => {
            const iter = createIter([1, 2, 3, 4, 5])
            const predicate = createPredicate((x: number) =>  x === 1)

            const result = splitByAsync(iter, predicate)
            const arrResult = await toArrayAsync(result)

            expect(arrResult).toEqual([[], [2, 3, 4, 5]])
          })
        })

        describe('separator is middle', () => {
          it('returns the splited iterable', async () => {
            const iter = createIter([1, 2, 3, 4, 5])
            const predicate = createPredicate((x: number) =>  x === 3)

            const result = splitByAsync(iter, predicate)
            const arrResult = await toArrayAsync(result)

            expect(arrResult).toEqual([[1, 2], [4, 5]])
          })
        })

        describe('separator is last', () => {
          it('returns the splited iterable', async () => {
            const iter = createIter([1, 2, 3, 4, 5])
            const predicate = createPredicate((x: number) =>  x === 5)

            const result = splitByAsync(iter, predicate)
            const arrResult = await toArrayAsync(result)

            expect(arrResult).toEqual([[1, 2, 3, 4], []])
          })
        })
      })

      describe('predicate alwasy returns false', () => {
        it('returns the splited iterable', async () => {
          const iter = createIter([1, 2, 3, 4, 5])
          const predicate = createPredicate(() => false)

          const result = splitByAsync(iter, predicate)
          const arrResult = await toArrayAsync(result)

          expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
        })
      })

      it('lazy and partial evaluation', async () => {
        const mock = new MockIterable([1, 2, 3])
        const iter = createIter(mock)
        const predicate = createPredicate(() => true)

        const result = splitByAsync(iter, predicate)
        const isLazy = mock.nextIndex === 0
        await consumeAsync(takeAsync(result, 1))
        const isPartial = mock.nextIndex === 1

        expect(isLazy).toBe(true)
        expect(isPartial).toBe(true)
      })

      describe('predicate throws an error', () => {
        it('throws an error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3, 4, 5])
          const predicate = () => { throw customError }

          const result = splitByAsync(iter, predicate)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(err).toBe(customError)
        })
      })

      test('edge: empty iterable', async () => {
        const iter = createIter([])
        const predicate = () => true

        const result = splitByAsync(iter, predicate)
        const arrResult = await toArrayAsync(result)

        expect(arrResult).toStrictEqual([[]])
      })
    })
  })
})
