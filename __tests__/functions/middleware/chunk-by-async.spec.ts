import { testIterable, testAsyncIterable, testFunction, testAsyncFunction } from '@test/test-fixtures'
import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils'
import { chunkByAsync } from '@middleware/chunk-by-async'
import { getErrorPromise } from 'return-style'
import '@blackglory/jest-matchers'

describe('chunkByAsync<T>(iterable: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean): AsyncIterable<T[]>', () => {
  describe('T is PromiseLike<unknown>', () => {
    it('called with [element(promise),index]', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn().mockReturnValue(true)

      const result = chunkByAsync(iter, fn)
      await consumeAsync(result)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, iter[0], 0)
      expect(fn).nthCalledWith(2, iter[1], 1)
      expect(fn).nthCalledWith(3, iter[2], 2)
    })

    it('return AsyncIterable<Array<PromiseLike<T>>>', async () => {
      const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
      const fn = jest.fn().mockReturnValue(false)

      const result = chunkByAsync(iter, fn)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toEqual([iter])
    })
  })

  describe.each([
    testIterable('Iterable<T>')
  , testAsyncIterable('AsyncIterable<T>')
  ])('%s', (_, getIter) => {
    describe('fn is called', () => {
      it('called with [element,index]', async () => {
        const iter = getIter([1, 2, 3])
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
    })

    it('lazy and partial evaluation', async () => {
      const mock = new MockIterable([1, 2, 3])
      const iter = getIter(mock)
      const fn = () => true

      const result = chunkByAsync(iter, fn)
      const isLazy = mock.nextIndex === 0
      await consumeAsync(takeAsync(result, 1))
      const isPartial = mock.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promiselike')
    ])('%s', (_, getFn) => {
      describe('fn return true', () => {
        describe('chunk at middle', () => {
          it('return chunked iterable', async () => {
            const iter = getIter([1, 2, 3])
            const atTwo = getFn((x: number) => x === 2)

            const result = chunkByAsync(iter, atTwo)
            const arrResult = await toArrayAsync(result)

            expect(result).toBeAsyncIterable()
            expect(arrResult).toEqual([[1, 2], [3]])
          })
        })

        describe('chunk at last', () => {
          it('return chunked iterable', async () => {
            const iter = getIter([1, 2, 3])
            const atThree = getFn((x: number) => x === 3)

            const result = chunkByAsync(iter, atThree)
            const arrResult = await toArrayAsync(result)

            expect(result).toBeAsyncIterable()
            expect(arrResult).toEqual([[1, 2, 3]])
          })
        })
      })

      describe('fn always return false', () => {
        it('return chunked iterable', async () => {
          const iter = getIter([1, 2, 3])
          const alwaysFalse = getFn(() => false)

          const result = chunkByAsync(iter, alwaysFalse)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([[1, 2, 3]])
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([1, 2, 3])
          const fn = getFn(() => { throw customError })

          const result = chunkByAsync(iter, fn)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(result).toBeAsyncIterable()
          expect(err).toBe(customError)
        })
      })
    })
  })
})
