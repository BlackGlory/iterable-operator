import { getError } from 'return-style'
import { consumeAsync, toArrayAsync, toAsyncIterable, MockAsyncIterable, takeAsync }
  from '@test/utils'
import { repeatAsync } from '@middleware/repeat-async'
import '@blackglory/jest-matchers'

describe(`
  repeatAsync<T>(
    iterable: AsyncIterable<T>
  , times: number
  ): AsyncIterable<T>
`, () => {
  it('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const times = 2

    const result = repeatAsync(iter, times)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('times > 0', () => {
    it('return repeated iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const times = 2

      const result = repeatAsync(iter, times)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([1, 2, 3, 1, 2, 3])
    })
  })

  describe('times = 0', () => {
    it('return empty iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const times = 0

      const result = repeatAsync(iter, times)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('times < 0', () => {
    it('throw Error', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const times = -1

      const err = getError(() => repeatAsync(iter, times))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('times')
    })
  })

  describe('times = Infinity', () => {
    describe('NODE_ENV = production', () => {
      it('show infinite loop warning', () => {
        const OLD_NODE_ENV = process.env.NODE_ENV
        process.env.NODE_ENV = 'production'
        const spy = jest.spyOn(console, 'warn').mockImplementation()
        const iter = toAsyncIterable([1, 2, 3])

        try {
          const result = repeatAsync(iter, Infinity)

          expect(result).toBeAsyncIterable()
          expect(console.warn).toHaveBeenCalledTimes(0)
        } finally {
          spy.mockRestore()
          process.env.NODE_ENV = OLD_NODE_ENV
        }
      })
    })

    describe('NODE_ENV != production', () => {
      it('show infinite loop warning', () => {
        const OLD_NODE_ENV = process.env.NODE_ENV
        process.env.NODE_ENV = 'development'
        const spy = jest.spyOn(console, 'warn').mockImplementation()
        const iter = toAsyncIterable([1, 2, 3])

        try {
          const result = repeatAsync(iter, Infinity)

          expect(result).toBeAsyncIterable()
          expect(console.warn).toHaveBeenCalledTimes(1)
        } finally {
          spy.mockRestore()
          process.env.NODE_ENV = OLD_NODE_ENV
        }
      })
    })
  })
})
