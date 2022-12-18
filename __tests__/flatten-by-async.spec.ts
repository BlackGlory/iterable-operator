import { isString } from '@blackglory/types'
import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils'
import { testIterable, testAsyncIterable, testFunction, testAsyncFunction } from '@test/test-fixtures'
import { getErrorPromise } from 'return-style'
import { flattenByAsync } from '@src/flatten-by-async'

describe('flattenByAsync', () => {
  describe.each([
    testIterable('Iterable')
  , testAsyncIterable('AsyncIterable')
  ])('%s', (_, createIter) => {
    test('called fn with [element, level]', async () => {
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

    test('lazy and partial evaluation', async () => {
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
      testFunction('fn returns NonPromiseLike')
    , testAsyncFunction('fn returns PromiseLike')
    ])('%s', (_, createFn) => {
      it('returns the flat iterable', async () => {
        const iter = createIter([
          'one', ['two']
        , 0, [1]
        ])
        const exceptString = createFn((x: unknown) => !isString(x))

        const result = flattenByAsync(iter, exceptString)
        const arrResult = await toArrayAsync(result)

        expect(arrResult).toEqual([
          'one', 'two'
        , 0, 1
        ])
      })

      describe('fn returns false on level zero', () => {
        it('returns the iterable copy', async () => {
          const iter = createIter([0, [1]])
          const alwaysFalse = createFn(() => false)

          const result = flattenByAsync(iter, alwaysFalse)
          const arrResult = await toArrayAsync(result)

          expect(result).not.toBe(iter)
          expect(arrResult).toEqual([0, [1]])
        })
      })

      describe('iterable is empty', () => {
        it('returns the empty iterable', async () => {
          const iter = createIter([])
          const fn = createFn(() => true)

          const result = flattenByAsync(iter, fn)
          const arrResult = await toArrayAsync(result)

          expect(arrResult).toEqual([])
        })
      })

      describe('iterable is string', () => {
        it('returns the iterable<char>', async () => {
          const iter = '123'
          const fn = createFn(() => true)

          const result = flattenByAsync(iter, fn)
          const arrResult = await toArrayAsync(result)

          expect(arrResult).toEqual(['1', '2', '3'])
        })
      })

      describe('fn throws an error', () => {
        it('throws an error when consuming iterable', async () => {
          const customError = new Error('CustomError')
          const iter = createIter([[1]])
          const fn = createFn(() => { throw customError })

          const result = flattenByAsync(iter, fn)
          const err = await getErrorPromise(toArrayAsync(result))

          expect(err).toBe(customError)
        })
      })
    })
  })
})
