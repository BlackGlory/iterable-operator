import { consumeAsync, toArrayAsync, toAsyncIterable, MockAsyncIterable, takeAsync as testTakeAsync } from '@test/utils'
import { getError } from 'return-style'
import { InvalidArgumentError } from '@src/error'
import { takeAsync } from '@middleware/take-async'
import '@test/matchers'

describe('takeAsync<T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T>', () => {
  it('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const count = 2

    const result = takeAsync(iter, count)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(testTakeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('count > size(iterable)', () => {
    it('return iterable copy', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 5

      const result = takeAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('0 < count < size(iterable)', () => {
    it('return iterable that taken the first count elements', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 2

      const result = takeAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([1, 2])
    })
  })

  describe('count = 0', () => {
    it('return empty iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 0

      const result = takeAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('count < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = toAsyncIterable([])
      const count = -1

      const err = getError<InvalidArgumentError>(() => takeAsync(iter, count))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('count')
    })
  })
})
