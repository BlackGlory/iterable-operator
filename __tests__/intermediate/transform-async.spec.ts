import { consumeAsync, toArrayAsync, MockIterable, MockAsyncIterable, toAsyncIterable } from '@test/utils'
import { transformAsync } from '@intermediate/transform-async'
import { getErrorPromise } from 'return-style'
import '@blackglory/jest-matchers'

describe('transformAsync', () => {
  describe('Iterable', () => {
    it('returns the iterable from transformer', async () => {
      const iter = [1, 2, 3]
      const double = async function* (iterable: Iterable<number>): AsyncIterable<number> {
        for await (const element of iterable) {
          yield element * 2
        }
      }

      const result = transformAsync(iter, double)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([2, 4, 6])
    })

    test('lazy evaluation', async () => {
      const iter = new MockIterable([1, 2, 3])
      const fn = async function* (iterable: Iterable<number>) {
        yield* iterable
      }

      const result = transformAsync(iter, fn)
      const isLazy = iter.nextIndex === 0
      await consumeAsync(result)

      expect(isLazy).toBe(true)
    })

    describe('transformer throws an error', () => {
      it('throws an error', async () => {
        const customError = new Error('CustomError')
        const iter = [1, 2, 3]
        const fn = async function* () { throw customError }

        const result = transformAsync(iter, fn)
        const err = await getErrorPromise(toArrayAsync(result))

        expect(result).toBeAsyncIterable()
        expect(err).toBe(customError)
      })
    })
  })

  describe('AsyncIterable', () => {
    it('returns the iterable from transformer', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const double = async function* (iterable: AsyncIterable<number>): AsyncIterable<number> {
        for await (const element of iterable) {
          yield element * 2
        }
      }

      const result = transformAsync(iter as any, double)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([2, 4, 6])
    })

    test('lazy evaluation', async () => {
      const iter = new MockAsyncIterable([1, 2, 3])
      const fn = async function* (iterable: AsyncIterable<number>) {
        yield* iterable
      }

      const result = transformAsync(iter, fn)
      const isLazy = iter.nextIndex === 0
      await consumeAsync(result)

      expect(isLazy).toBe(true)
    })

    describe('transformer throws an error', () => {
      it('throws an error', async () => {
        const customError = new Error('CustomError')
        const iter = toAsyncIterable([1, 2, 3])
        const fn = async function* () { throw customError }

        const result = transformAsync(iter as any, fn)
        const err = await getErrorPromise(toArrayAsync(result))

        expect(result).toBeAsyncIterable()
        expect(err).toBe(customError)
      })
    })
  })
})
