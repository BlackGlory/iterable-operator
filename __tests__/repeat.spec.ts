import { consume, toArray, MockIterable, take } from '@test/utils.js'
import { getError } from 'return-style'
import { repeat } from '@src/repeat.js'
import { jest } from '@jest/globals'
import { pass } from '@blackglory/pass'

describe('repeat', () => {
  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const times = 2

    const result = repeat(iter, times)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('times > 0', () => {
    it('returns the repeated iterable', () => {
      const iter = [1, 2, 3]
      const times = 2

      const result = repeat(iter, times)
      const arrResult = toArray(result)

      expect(arrResult).toEqual([1, 2, 3, 1, 2, 3])
    })
  })

  describe('times = 0', () => {
    it('returns the empty iterable', () => {
      const iter = [1, 2, 3]
      const times = 0

      const result = repeat(iter, times)
      const arrResult = toArray(result)

      expect(arrResult).toEqual([])
    })
  })

  describe('times < 0', () => {
    it('throws InvalidArgumentError', () => {
      const iter = [1, 2, 3]
      const times = -1

      const err = getError(() => repeat(iter, times))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('times')
    })
  })

  describe('times = Infinity', () => {
    describe('NODE_ENV = production', () => {
      it('show infinite loop warning', () => {
        const OLD_NODE_ENV = process.env.NODE_ENV
        process.env.NODE_ENV = 'production'
        const spy = jest.spyOn(console, 'warn').mockImplementation(pass)
        const iter: number[] = [1, 2, 3]

        try {
          repeat(iter, Infinity)

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
        const spy = jest.spyOn(console, 'warn').mockImplementation(pass)
        const iter: number[] = [1, 2, 3]

        try {
          repeat(iter, Infinity)

          expect(console.warn).toHaveBeenCalledTimes(1)
        } finally {
          spy.mockRestore()
          process.env.NODE_ENV = OLD_NODE_ENV
        }
      })
    })
  })
})
