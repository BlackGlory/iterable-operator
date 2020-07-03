import { toAsyncIterable, toArrayAsync, MockAsyncIterable, takeAsync } from '@test/utils'
import { getError } from 'return-style'
import { InvalidArgumentError } from '@src/error'
import { dropAsync } from '@middleware/drop-async'
import '@test/matchers'

describe('dropAsync<T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T>', () => {
  it('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const count = 1

    const result = dropAsync(iter, count)
    const isLazy = iter.nextIndex === 0
    await toArrayAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 2

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('count > 0', () => {
    describe('count > size(iterable)', () => {
      it('return empty iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 5

        const result = dropAsync(iter, count)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('count = size(iterable)', () => {
      it('return empty iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 3

        const result = dropAsync(iter, count)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('count < size(iterable)', () => {
      it('return iterable that dropped the first count elements', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 2

        const result = dropAsync(iter, count)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([3])
      })
    })
  })

  describe('count = 0', () => {
    it('return iterable copy', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 0

      const result = dropAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('count < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = -1

      const err = getError<InvalidArgumentError>(() => dropAsync(iter, count))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('count')
    })
  })
})
