import { testIterable, testAsyncIterable, testFunction, testAsyncFunction } from '@test/test-fixtures'
import { toArrayAsync, getCalledTimes, consumeAsync, MockIterable, MockAsyncIterable, takeAsync } from '@test/utils'
import { dropUntilAsync } from '@intermediate/drop-until-async'
import { getErrorPromise } from 'return-style'
import '@blackglory/jest-matchers'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe('dropUntilAsync', () => {
  describe('close the unexhausted iterator', () => {
    test('Iterable', async () => {
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

    test('AsyncIterable', async () => {
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

  describe.each([
    testIterable('Iterable')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('called fn with [element, index]', async () => {
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

    describe('fn returns true on first element', () => {
      it('called fn only once', async () => {
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

    test('lazy and partial evaluation', async () => {
      const mock = new MockIterable([1, 2, 3])
      const iter = createIter(mock)
      const fn = (x: number) => x === 2

      const result = dropUntilAsync(iter, fn)
      const isLazy = mock.nextIndex === 0
      await consumeAsync(takeAsync(result, 1))
      const isPartial = mock.nextIndex === 2

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })

    describe.each([
      testFunction('fn returns NonPromiseLike')
    , testAsyncFunction('fn returns PromiseLike')
    ])('%s', (_, createFn) => {
      test('returns the itreable that drop elements until fn returns true', async () => {
        const iter = createIter([1, 2, 3])
        const atTwo = createFn((x: number) => x === 2)

        const result = dropUntilAsync(iter, atTwo)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([2, 3])
      })

      describe('fn throws an error', () => {
        it('throws an error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3])
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
