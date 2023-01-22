import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils.js'
import { testIterable, testAsyncIterable, testAsyncFunction, testFunction } from '@test/test-fixtures.js'
import { getErrorPromise } from 'return-style'
import { splitByAsync } from '@src/split-by-async.js'
import { jest } from '@jest/globals'

describe('splitByAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    describe.each([
      testFunction('fn returns NonPromiseLike')
    , testAsyncFunction('fn returns PromiseLike')
    ])('%s', (_, createFn) => {
      test('called fn with [element, index]', async () => {
        const iter = createIter([1, 2, 3])
        const fn = jest.fn()

        const result = splitByAsync(iter, fn)
        const calledTimesBeforeConsume = getCalledTimes(fn)
        await consumeAsync(result)
        const calledTimesAfterConsume = getCalledTimes(fn)

        expect(calledTimesBeforeConsume).toBe(0)
        expect(calledTimesAfterConsume).toBe(3)
        expect(fn).nthCalledWith(1, 1, 0)
        expect(fn).nthCalledWith(2, 2, 1)
        expect(fn).nthCalledWith(3, 3, 2)
      })

      describe('fn returns true', () => {
        describe('separator is first', () => {
          it('returns the splited iterable', async () => {
            const iter = createIter([1, 2, 3, 4, 5])
            const atThree = createFn((x: number) =>  x === 1)

            const result = splitByAsync(iter, atThree)
            const arrResult = await toArrayAsync(result)

            expect(arrResult).toEqual([[], [2, 3, 4, 5]])
          })
        })

        describe('separator is middle', () => {
          it('returns the splited iterable', async () => {
            const iter = createIter([1, 2, 3, 4, 5])
            const atThree = createFn((x: number) =>  x === 3)

            const result = splitByAsync(iter, atThree)
            const arrResult = await toArrayAsync(result)

            expect(arrResult).toEqual([[1, 2], [4, 5]])
          })
        })

        describe('separator is last', () => {
          it('returns the splited iterable', async () => {
            const iter = createIter([1, 2, 3, 4, 5])
            const atThree = createFn((x: number) =>  x === 5)

            const result = splitByAsync(iter, atThree)
            const arrResult = await toArrayAsync(result)

            expect(arrResult).toEqual([[1, 2, 3, 4], []])
          })
        })
      })

      describe('fn alwasy returns false', () => {
        it('returns the splited iterable', async () => {
          const iter = createIter([1, 2, 3, 4, 5])
          const alwaysFalse = createFn(() => false)

          const result = splitByAsync(iter, alwaysFalse)
          const arrResult = await toArrayAsync(result)

          expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
        })
      })

      it('lazy and partial evaluation', async () => {
        const mock = new MockIterable([1, 2, 3])
        const iter = createIter(mock)
        const fn = createFn(() => true)

        const result = splitByAsync(iter, fn)
        const isLazy = mock.nextIndex === 0
        await consumeAsync(takeAsync(result, 1))
        const isPartial = mock.nextIndex === 1

        expect(isLazy).toBe(true)
        expect(isPartial).toBe(true)
      })

      describe('fn throws an error', () => {
        it('throws an error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3, 4, 5])
          const fn = () => { throw customError }

          const result = splitByAsync(iter, fn)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
