import { consumeAsync, toArrayAsync, MockIterable, MockAsyncIterable, toAsyncIterable } from '@test/utils'
import { transformAsync } from '@middleware/transform-async'
import { getErrorAsync } from 'return-style'
import '@test/matchers'

describe('transformAsync<T, U>(iterable: Iterable<T>, transformer: (iterable: Iterable<T>) => AsyncIterable<U>): AsyncIterable<U>', () => {
  describe('call', () => {
    it('return result from transformer', async () => {
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

    it('lazy evaluation', async () => {
      const iter = new MockIterable([1, 2, 3])
      const fn = async function* (iterable: Iterable<number>) {
        yield* iterable
      }

      const result = transformAsync(iter, fn)
      const isLazy = iter.nextIndex === 0
      await consumeAsync(result)

      expect(isLazy).toBe(true)
    })
  })

  describe('transformer throw error', () => {
    it('throw error', async () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = async function* () { throw customError }

      const result = transformAsync(iter, fn)
      const err = await getErrorAsync(toArrayAsync(result))

      expect(result).toBeAsyncIterable()
      expect(err).toBe(customError)
    })
  })
})

describe('transformAsync<T, U>(iterable: AsyncIterable<T>, transformer: (iterable: AsyncIterable<T>) => AsyncIterable<T>): AsyncIterable<U>', () => {
  describe('call', () => {
    it('return result from transformer', async () => {
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

    it('lazy evaluation', async () => {
      const iter = new MockAsyncIterable([1, 2, 3])
      const fn = async function* (iterable: AsyncIterable<number>) {
        yield* iterable
      }

      const result = transformAsync(iter, fn)
      const isLazy = iter.nextIndex === 0
      await consumeAsync(result)

      expect(isLazy).toBe(true)
    })
  })

  describe('transformer throw error', () => {
    it('throw error', async () => {
      const customError = new Error('CustomError')
      const iter = toAsyncIterable([1, 2, 3])
      const fn = async function* () { throw customError }

      const result = transformAsync(iter as any, fn)
      const err = await getErrorAsync(toArrayAsync(result))

      expect(result).toBeAsyncIterable()
      expect(err).toBe(customError)
    })
  })
})
