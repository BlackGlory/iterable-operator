import { getError } from 'return-style'
import { InvalidArgumentError } from '@src/error'
import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable, takeAsync } from '@test/utils'
import { sliceAsync } from '@middleware/slice-async'
import '@test/matchers'

describe('sliceAsync<T>(iterable: AsyncIterable<T>, start: number, end: number): AsyncIterable<T>', () => {
  it('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const start = 0
    const end = 10

    const result = sliceAsync(iter, start, end)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('start < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const start = -1
      const end = 1

      const err = getError<InvalidArgumentError>(() => sliceAsync(iter, start, end))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('start')
    })
  })

  describe('start >= 0', () => {
    describe('start >= size(iterable', () => {
      it('return empty iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const start = 3
        const end = 5

        const result = sliceAsync(iter, start, end)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('start < size(iterable)', () => {
      describe('start < end', () => {
        it('return iterable[start:end-1]', async () => {
          const iter = toAsyncIterable([1, 2, 3])
          const start = 1
          const end = 2

          const result = sliceAsync(iter, start, end)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([2])
        })
      })

      describe('start = end', () => {
        it('return empty iterable', async () => {
          const iter = toAsyncIterable([1, 2, 3])
          const start = 1
          const end = 1

          const result = sliceAsync(iter, start, end)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
          expect(arrResult).toEqual([])
        })
      })

      describe('start > end', () => {
        it('throw InvalidArgumentError', async () => {
          const iter = toAsyncIterable([1, 2, 3])
          const start = 2
          const end = 1

          const err = getError<InvalidArgumentError>(() => sliceAsync(iter, start, end))

          expect(err).toBeInstanceOf(InvalidArgumentError)
          expect(err!.message).toMatch('end')
        })
      })
    })
  })
})
