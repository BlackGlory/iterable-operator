import { testIterable, testAsyncIterable, testFunction, testAsyncFunction } from '@test/test-fixtures'
import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils'
import { getErrorPromise } from 'return-style'
import { uniqByAsync } from '@middleware/uniq-by-async'
import '@blackglory/jest-matchers'

describe(`
  uniqByAsync<T, U>(
    iterable: Iterable<T> | AsyncIterable<T>
  , fn: (element: T, index: number) => Awaitable<U>
  ): AsyncIterableIterator<T>
`, () => {
  describe('T is PromiseLike<unknown>', () => {
    it('called with [element(promise),index]', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn()

      const result = uniqByAsync(iter, fn)
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

        const result = uniqByAsync(iter, fn)
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

    it('lazy and partial evaluation', async () => {
      const mock = new MockIterable([1, 2, 3])
      const iter = createIter(mock)
      const fn = () => true

      const result = uniqByAsync(iter, fn)
      const isLazy = mock.nextIndex === 0
      await consumeAsync(takeAsync(result, 1))
      const isPartial = mock.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promise')
    ])('%s', (_, createFn) => {
      describe('call', () => {
        it('return iterable unique by fn', async () => {
          const iter = createIter([1, 2, 3])
          const modTwo = createFn((x: number) => x % 2)

          const result = uniqByAsync(iter, modTwo)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([1, 2])
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([1, 2, 3])
          const fn = createFn(() => { throw customError })

          const result = uniqByAsync(iter, fn)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(result).toBeAsyncIterable()
          expect(err).toBe(customError)
        })
      })
    })
  })
})
