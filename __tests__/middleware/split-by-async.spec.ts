import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils'
import { testIterable, testAsyncIterable, testAsyncFunction, testFunction } from '@test/test-fixtures'
import { getErrorPromise } from 'return-style'
import { splitByAsync } from '@middleware/split-by-async'
import '@blackglory/jest-matchers'

describe(`
  splitByAsync<T>(
    iterable: Iterable<T> | AsyncIterable<T>
  , predicate: (element: T, index: number) => Awaitable<unknown>
  ): AsyncIterableIterator<T[]>
`, () => {
  describe('T is PromiseLike<T>', () => {
    it('called with [element(promise),index]', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn()

      const result = splitByAsync(iter, fn)
      await consumeAsync(result)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, iter[0], 0)
      expect(fn).nthCalledWith(2, iter[1], 1)
      expect(fn).nthCalledWith(3, iter[2], 2)
    })

    it('return AsyncIterable<Array<PromiseLike<T>>>', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn().mockReturnValue(false)

      const result = splitByAsync(iter, fn)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toEqual([iter])
    })
  })

  describe.each([
    testIterable('Iterable<T>')
  , testAsyncIterable('AsyncIterable<T>')
  ])('%s', (_, createIter) => {
    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promise')
    ])('%s', (_, createFn) => {
      describe('fn is called', () => {
        it('called with [element,index]', async () => {
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
      })

      describe('fn return true', () => {
        describe('separator is first', () => {
          it('return splited iterable', async () => {
            const iter = createIter([1, 2, 3, 4, 5])
            const atThree = createFn((x: number) =>  x === 1)

            const result = splitByAsync(iter, atThree)
            const arrResult = await toArrayAsync(result)

            expect(result).toBeAsyncIterable()
            expect(arrResult).toEqual([[], [2, 3, 4, 5]])
          })
        })

        describe('separator is middle', () => {
          it('return splited iterable', async () => {
            const iter = createIter([1, 2, 3, 4, 5])
            const atThree = createFn((x: number) =>  x === 3)

            const result = splitByAsync(iter, atThree)
            const arrResult = await toArrayAsync(result)

            expect(result).toBeAsyncIterable()
            expect(arrResult).toEqual([[1, 2], [4, 5]])
          })
        })

        describe('separator is last', () => {
          it('return splited iterable', async () => {
            const iter = createIter([1, 2, 3, 4, 5])
            const atThree = createFn((x: number) =>  x === 5)

            const result = splitByAsync(iter, atThree)
            const arrResult = await toArrayAsync(result)

            expect(result).toBeAsyncIterable()
            expect(arrResult).toEqual([[1, 2, 3, 4], []])
          })
        })
      })

      describe('fn always return false', () => {
        it('return splited iterable', async () => {
          const iter = createIter([1, 2, 3, 4, 5])
          const alwaysFalse = createFn(() => false)

          const result = splitByAsync(iter, alwaysFalse)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
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

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3, 4, 5])
          const fn = () => { throw customError }

          const result = splitByAsync(iter, fn)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(result).toBeAsyncIterable()
          expect(err).toBe(customError)
        })
      })
    })
  })
})
