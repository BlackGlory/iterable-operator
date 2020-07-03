import { getCalledTimes, consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils'
import { testIterable, testAsyncIterable, testFunction, testAsyncFunction } from '@test/test-fixtures'
import { getErrorAsync } from 'return-style'
import { flattenByAsync } from '@middleware/flatten-by-async'
import '@test/matchers'

describe('flattenByAsync<T>(iterable: Iterable<unknown> | AsyncIterable<unknown>, fn: (element: unknown, level: number) => boolean | PromiseLike<boolean>): AsyncIterable<T>', () => {
  describe.each([
    testIterable('Iterable<unknown>')
  , testAsyncIterable('AsyncIterable<unknown>')
  ])('%s', (_, getIter) => {
    describe('fn is called', () => {
      it('called with [element,level]', async () => {
        const iter = getIter([0, [1]])
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
      const iter = getIter(mock)
      const fn = () => false

      const result = flattenByAsync(iter, fn)
      const isLazy = mock.nextIndex === 0
      await toArrayAsync(takeAsync(result, 1))
      const isPartial = mock.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })

    describe.each([
      testFunction('fn return non-promise')
    , testAsyncFunction('fn return promiselike')
    ])('%s', (_, getFn) => {
      describe('call', () => {
        it('return flat iterable', async () => {
          const iter = getIter([
            'one', ['two']
          , 0, [1]
          ])
          const exceptString = getFn((x: unknown) => !isString(x))

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
          const iter = getIter([0, [1]])
          const alwaysFalse = getFn(() => false)

          const result = flattenByAsync(iter, alwaysFalse)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(result).not.toBe(iter)
          expect(arrResult).toEqual([0, [1]])
        })
      })

      describe('iterable is empty', () => {
        it('return empty iterable', async () => {
          const iter = getIter([])
          const fn = getFn(() => true)

          const result = flattenByAsync(iter, fn)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([])
        })
      })

      describe('iterable is string', () => {
        it('return iterable<char>', async () => {
          const iter = '123'
          const fn = getFn(() => true)

          const result = flattenByAsync(iter, fn)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual(['1', '2', '3'])
        })
      })

      describe('fn throw error', () => {
        it('throw error when consume', async () => {
          const customError = new Error('CustomError')
          const iter = getIter([[1]])
          const fn = getFn(() => { throw customError })

          const result = flattenByAsync(iter, fn)
          const err = await getErrorAsync(toArrayAsync(result))

          expect(result).toBeAsyncIterable()
          expect(err).toBe(customError)
        })
      })
    })
  })
})

function isString(val: unknown): val is string {
  return typeof val === 'string'
}
