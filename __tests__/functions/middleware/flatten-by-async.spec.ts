import { isString } from '@blackglory/types'
import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils'
import { testIterable, testAsyncIterable, testFunction, testAsyncFunction } from '@test/test-fixtures'
import { getErrorPromise } from 'return-style'
import { flattenByAsync } from '@middleware/flatten-by-async'
import '@blackglory/jest-matchers'

describe(`
  flattenByAsync<T>(
    iterable: Iterable<unknown> | AsyncIterable<unknown>
  , predicate: (element: unknown, level: number) => Awaitable<unknown>
  ): AsyncIterable<T>
`, () => {
  describe.each([
    testIterable('Iterable<unknown>')
  , testAsyncIterable('AsyncIterable<unknown>')
  ])('%s', (_, createIter) => {
    describe('fn is called', () => {
      it('called with [element,level]', async () => {
        const iter = createIter([0, [1]])
        const fn = jest.fn().mockReturnValue(true)

        const result = flattenByAsync(iter, fn)
        const calledTimesBeforeConsume = getCalledTimes(fn)
        await consumeAsync(result)
        const calledTimesAfterConsume = getCalledTimes(fn)

        expect(calledTimesBeforeConsume).toBe(0)
        expect(calledTimesAfterConsume).toBe(1)
        expect(fn).nthCalledWith(1, [1], 1)
      })
    })

    it('lazy and partial evaluation', async () => {
      const mock = new MockIterable([1, 2, 3])
      const iter = createIter(mock)
      const fn = () => false

      const result = flattenByAsync(iter, fn)
      const isLazy = mock.nextIndex === 0
      await consumeAsync(takeAsync(result, 1))
      const isPartial = mock.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promiselike')
    ])('%s', (_, createFn) => {
      describe('call', () => {
        it('return flat iterable', async () => {
          const iter = createIter([
            'one', ['two']
          , 0, [1]
          ])
          const exceptString = createFn((x: unknown) => !isString(x))

          const result = flattenByAsync(iter, exceptString)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([
            'one', 'two'
          , 0, 1
          ])
        })
      })

      describe('fn return false on level zero', () => {
        it('return iterable copy', async () => {
          const iter = createIter([0, [1]])
          const alwaysFalse = createFn(() => false)

          const result = flattenByAsync(iter, alwaysFalse)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(result).not.toBe(iter)
          expect(arrResult).toEqual([0, [1]])
        })
      })

      describe('iterable is empty', () => {
        it('return empty iterable', async () => {
          const iter = createIter([])
          const fn = createFn(() => true)

          const result = flattenByAsync(iter, fn)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([])
        })
      })

      describe('iterable is string', () => {
        it('return iterable<char>', async () => {
          const iter = '123'
          const fn = createFn(() => true)

          const result = flattenByAsync(iter, fn)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual(['1', '2', '3'])
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([[1]])
          const fn = createFn(() => { throw customError })

          const result = flattenByAsync(iter, fn)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(result).toBeAsyncIterable()
          expect(err).toBe(customError)
        })
      })
    })
  })
})
