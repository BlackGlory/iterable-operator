import { testIterable, testAsyncIterable, testFunction, testAsyncFunction } from '@test/test-fixtures'
import { toArrayAsync, getCalledTimes, consumeAsync, MockIterable, MockAsyncIterable, takeAsync } from '@test/utils'
import { dropUntilAsync } from '@middleware/drop-until-async'
import { getErrorPromise } from 'return-style'
import '@blackglory/jest-matchers'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe(`
  dropUntilAsync<T>(
    iterable: Iterable<T> | AsyncIterable<T>
  , predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): AsyncIterable<T>
`, () => {
  describe('close unexhausted iterator', () => {
    test('iterable', async () => {
      const iter = new MockIterable(go(function* () {
        throw new Error()
      }))

      try {
        await consumeAsync(dropUntilAsync(iter, () => true))
      } catch {
        pass()
      }

      expect(iter.returnCalled).toBeTruthy()
      expect(iter.done).toBeTruthy()
    })

    test('async iterable', async () => {
      const iter = new MockAsyncIterable(go(function* () {
        throw new Error()
      }))

      try {
        await consumeAsync(dropUntilAsync(iter, () => true))
      } catch {
        pass()
      }

      expect(iter.returnCalled).toBeTruthy()
      expect(iter.done).toBeTruthy()
    })
  })

  describe('T is PromiseLike<unknown>', () => {
    it('called with [element(promise),index]', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn().mockReturnValue(false)

      const result = dropUntilAsync(iter, fn)
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
  ])('%s', (_, getIter) => {
    describe('fn is called', () => {
      it('called with [element,index]', async () => {
        const iter = [1, 2, 3]
        const fn = jest.fn().mockReturnValue(false)

        const result = dropUntilAsync(iter, fn)
        const calledTimesBeforeConsume = getCalledTimes(fn)
        await consumeAsync(result)
        const calledTimesAfterConsume = getCalledTimes(fn)

        expect(calledTimesBeforeConsume).toBe(0)
        expect(calledTimesAfterConsume).toBe(3)
        expect(fn).nthCalledWith(1, 1, 0)
        expect(fn).nthCalledWith(2, 2, 1)
        expect(fn).nthCalledWith(3, 3, 2)
      })

      describe('return true on first element', () => {
        it('called once', async () => {
          const iter = [1, 2, 3]
          const fn = jest.fn().mockReturnValueOnce(true)

          const result = dropUntilAsync(iter, fn)
          const calledTimesBeforeConsume = getCalledTimes(fn)
          await consumeAsync(result)
          const calledTimesAfterConsume = getCalledTimes(fn)

          expect(calledTimesBeforeConsume).toBe(0)
          expect(calledTimesAfterConsume).toBe(1)
        })
      })
    })

    it('lazy and partial evaluation', async () => {
      const mock = new MockIterable([1, 2, 3])
      const iter = getIter(mock)
      const fn = (x: number) => x === 2

      const result = dropUntilAsync(iter, fn)
      const isLazy = mock.nextIndex === 0
      await consumeAsync(takeAsync(result, 1))
      const isPartial = mock.nextIndex === 2

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promise')
    ])('%s', (_, getFn) => {
      describe('call', () => {
        it('return itreable that drop elements until fn return true', async () => {
          const iter = getIter([1, 2, 3])
          const atTwo = getFn((x: number) => x === 2)

          const result = dropUntilAsync(iter, atTwo)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([2, 3])
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3])
          const fn = () => { throw customError }

          const result = dropUntilAsync(iter, fn)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(result).toBeAsyncIterable()
          expect(err).toBe(customError)
        })
      })
    })
  })
})
